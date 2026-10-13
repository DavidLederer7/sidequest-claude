import { newGame, current, act } from './game.mjs';
import { boardLayout, drawBoard, blockLabel } from './board.mjs';
import { PALETTE, readableElements } from './palette.mjs';

const PANE = 'sidequest-terminal';
function redraw($) { try { $.ui.invalidate('ui.render'); } catch {} }
async function safe($, fn) { try { return await fn(); } catch { redraw($); } }
// Conservative opt-out; never retain user text. Missing an optional break is safer.
function suppress(text) {
  return typeof text === 'string' && /\b(?:no|without|skip|disable)\b[^.!?\n]{0,60}\b(?:breaks?|sidequest|ui changes)\b|\b(?:do not|don't|never)\s+(?:open|show|launch|start|offer)\b[^.!?\n]{0,60}\b(?:sidequest|breaks?)\b/i.test(text.replaceAll('’', "'"));
}
async function open($, ui, manual = false) {
  if (!ui.interactive || ui.pane) return;
  const openingEpoch = ui.epoch;
  const result = await $.ui.open({ id: PANE, title: 'Sidequest', columns: 82, rows: 24, closeOnEscape: true, ...(manual ? { focus: true } : {}) });
  if (!manual && openingEpoch !== ui.epoch) { await $.ui.close({ id: PANE }); return; }
  ui.pane = result?.isPlaced === true;
  if (manual && ui.pane) ui.compact = false;
  redraw($);
}
async function close($, ui) {
  ui.epoch++; ui.timer?.cancel(); ui.timer = null;
  ui.compact = true; ui.pane = false;
  await safe($, () => $.ui.close({ id: PANE })); redraw($);
}
export const register = (on) => {
  const game = newGame();
  const ui = { interactive: false, pane: false, compact: false, epoch: 0, timer: null, settings: false, share: false, modes: false, help: false };
  let enabled = false, pausedUntil = 0, turn = null, delay = 15;
  const cancel = () => { ui.epoch++; ui.timer?.cancel(); ui.timer = null; };
  on('session.start', async ($, e, next) => {
    await safe($, async () => {
      let surfaces = [];
      try { surfaces = await $.session.surfaces(); } catch {}
      ui.interactive = e.isInteractive !== false && (e.surface === 'terminal' || (!e.surface && surfaces.length === 1 && surfaces[0] === 'terminal'));
      if (!ui.interactive) return;
      await $.command.register({ name: 'sidequest-terminal', immediate: true, description: 'Play Sidequest in the terminal pane' });
      enabled = (await $.store.get('terminal-auto')) === true;
      ui.compact = (await $.store.get('terminal-compact')) === true;
      const savedDelay = await $.store.get('terminal-delay');
      if ([15, 30, 60].includes(savedDelay)) delay = savedDelay;
      const savedPause = await $.store.get('terminal-pause');
      if (Number.isFinite(savedPause)) pausedUntil = savedPause;
      // Session-local ownership flag: classic Sidequest hooks must not also open.
      // No credentials are read, and no other plugin's hooks are suppressed.
      await $.env.set('SIDEQUEST_NATIVE_TERMINAL', '1');
    });
    return next(e);
  });
  on('command.run', { command: 'sidequest-terminal' }, async ($) => {
    await safe($, async () => {
      await open($, ui, true);
      if (ui.pane) await $.store.set('terminal-compact', false);
    });
    return {};
  });
  on('turn.start', async ($, e, next) => {
    if (e.agentId) return next(e);
    cancel(); turn = e.turnId;
    await safe($, async () => {
      if (!ui.interactive || !enabled || ui.compact || ui.pane || suppress(e.text) || await $.clock.now() < pausedUntil) return;
      const scheduledEpoch = ui.epoch;
      ui.timer = $.clock.after(delay * 1000, async () => {
        if (scheduledEpoch !== ui.epoch || !turn || !enabled || ui.compact || ui.pane) return;
        await safe($, () => open($, ui));
      });
    });
    return next(e);
  });
  on('turn.complete', async ($, e, next) => {
    if (!e.agentId && e.turnId === turn) { cancel(); turn = null; }
    return next(e);
  });
  on('session.end', async ($, e, next) => {
    cancel(); turn = null;
    if (ui.interactive) await safe($, () => $.env.set('SIDEQUEST_NATIVE_TERMINAL', undefined));
    return next(e);
  });
  on('ui.close', async ($, e, next) => {
    if (e.id === PANE) {
      cancel(); ui.pane = false; ui.compact = true;
      await safe($, () => $.store.set('terminal-compact', true)); redraw($);
    }
    return next(e);
  });
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const original = await next(e);
    if (!ui.interactive) return original;
    const { Box, Button, Text } = $.ui.resolve(e);
    return Box({ flexDirection: 'column', children: [original, Box({ flexDirection: 'row', gap: 1, children: [
      Text({ dimColor: true, children: ['Sidequest'] }),
      Button({ key: 'sidequest-open', label: 'Play', onPress: () => safe($, async () => { await open($, ui, true); if (ui.pane) await $.store.set('terminal-compact', false); }) }),
    ] })] });
  });
  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (!ui.interactive || e.requestId !== PANE) return next(e);
    const { Box, Text, Button } = readableElements($.ui.resolve(e));
    const panel = (children) => Box({ key:'readable-panel', width:'100%', backgroundColor:PALETTE.surface, flexDirection:'column', children });
    const paused = pausedUntil > await $.clock.now();
    const { challenge, state } = current(game);
    const perform = (action, value) => { act(game, action, value); redraw($); };
    const button = (key, label, action, value, hotkey) => Button({ key, label, ...(hotkey ? { hotkey } : {}), onPress: () => { if (action === 'share') ui.share = true; perform(action, value); } });
    const row = (children) => Box({ flexDirection: 'row', gap: 1, children });
    const width = Math.min(88, e.props.bodyColumns || 80);
    const bodyRows = e.props.scroll?.bodyRows;
    // Some inline hosts report the current content height as bodyRows. Never
    // gate rendering on it: a short resize message would keep itself short.
    if (width < 41 || (e.viewport?.rows && e.viewport.rows < 30)) return panel([
      Text({ bold:true,children:['A little more room to play'] }),
      Text({ children:[width < 41 ? 'Widen this pane to at least 41 columns.' : 'Make your Terminal window taller (at least 30 rows), so the whole board and controls fit.'] }),
      Button({ key:'minimize',label:'Minimize',onPress:() => safe($,async () => { await close($,ui); await $.store.set('terminal-compact',true); }) }),
    ]);
    const wide = width >= 72;
    const layout = boardLayout(challenge, state.positions, wide ? width - 30 : width,
      bodyRows ? bodyRows < (wide ? 22 : 38) : (e.viewport?.rows || 24) < 34);
    const selected = challenge.blocks[game.selected];
    const controls = Box({ width: wide ? 28 : width, flexDirection: 'column', children: [
      Text({ children: ["1. Click a block's label."] }),
      Text({ children: ['2. Click a direction below.'] }),
      Text({ bold: true, children: [`Moving: block ${blockLabel(game.selected)} (yellow)`] }),
      row(selected.axis === 'h'
        ? [button('left','Left','move','left','a'),button('right','Right','move','right','d')]
        : [button('up','Up','move','up','w'),button('down','Down','move','down','s')]),
      Text({ children: ['Each click moves one space.'] }),
      ...(game.notice ? [Text({ bold: true, children: [game.notice] })] : []),
      row([button('hint','Hint','hint',null,'n'),button('undo','Undo','undo',null,'u')]),
      Text({ children: [`Moves ${state.moves} · Hints ${state.hints}`] }),
      Button({ key:'level',label:`Mode: ${game.level}`,onPress:() => { ui.modes = true; redraw($); } }),
      row([button('reset','Reset','reset',null,'r'),button('share','Share','share')]),
      Button({ key:'help',label:'Keyboard help',onPress:() => { ui.help = true; redraw($); } }),
      ...(state.won && challenge.practiceBank ? [button('next','Next puzzle →','round',1)] : [Text({ dimColor:true,children:[challenge.practiceBank ? 'Solve to play the next puzzle.' : 'One Impossible puzzle per day.'] })]),
      ...((challenge.round || 0) > 0 ? [button('previous','← Previous','round',-1)] : []),
      row([
        Button({ key:'settings',label:ui.settings ? 'Close settings' : 'Settings',onPress:() => { ui.settings = !ui.settings; redraw($); } }),
        Button({ key:'minimize',label:'Minimize',onPress:() => safe($,async () => { await close($,ui); await $.store.set('terminal-compact',true); }) }),
      ]),
    ] });
    if (ui.help) return panel([
      Text({bold:true,children:['Keyboard shortcuts']}),
      Text({children:['First, click inside the game.']}),
      Text({children:['Choose a block: type its number or letter.']}),
      Text({children:['Move sideways: A = left, D = right.']}),
      Text({children:['Move vertically: W = up, S = down.']}),
      Text({children:['Each press moves one space. Blocks cannot overlap.']}),
      Text({children:['N = hint · U = undo · R = reset']}),
      Text({children:['Ctrl+X, then Tab switches focus between Claude and the game.']}),
      Button({key:'help-back',label:'Back to game',onPress:() => {ui.help = false;redraw($);}}),
    ]);
    if (ui.modes) return panel([
      Text({bold:true,children:['Choose difficulty']}),
      ...['easy','medium','hard','impossible'].map(value => Button({key:`level-${value}`,label:`${value === game.level ? '✓ ' : ''}${value}`,onPress:() => {ui.modes = false;perform('level',value);}})),
      Button({key:'mode-back',label:'Back to game',onPress:() => {ui.modes = false;redraw($);}}),
    ]);
    const settings = ui.settings ? panel([
      Text({bold:true,children:['Sidequest settings']}),
      Text({children:[`Automatic breaks: ${enabled ? `after ${delay}s` : 'off'}`]}),
      ...['off','15','30','60'].map(v => Button({key:`automatic-${v}`,label:v === 'off' ? 'Off' : `After ${v}s`,onPress:() => safe($, async () => {
        if (!['off','15','30','60'].includes(v)) return;
        cancel(); enabled = v !== 'off'; if (enabled) delay = Number(v);
        await $.store.set('terminal-auto',enabled); await $.store.set('terminal-delay',delay);
        game.notice = 'Saved. Applies to the next task.'; redraw($);
      }) })),
        Button({ key:'pause', label: paused ? 'Resume breaks' : 'Pause 30m', onPress: () => safe($, async () => {
          cancel(); const now = await $.clock.now(); pausedUntil = pausedUntil > now ? 0 : now + 30 * 60 * 1000;
          await $.store.set('terminal-pause',pausedUntil); game.notice = pausedUntil ? 'Breaks paused for 30 minutes.' : 'Breaks resume next task.'; redraw($);
        }) }),
      Text({ dimColor:true, children:['Terminal settings are separate. Progress lasts this session.'] }),
      Button({key:'settings',label:'← Back to game',onPress:() => {ui.settings = false; redraw($);}}),
    ]) : null;
    if (settings) return settings;
    if (ui.share) return panel([
      Text({bold:true,children:['Share your puzzle']}),
      Text({children:[game.notice]}),
      Text({children:['Select and copy this text. No solution is included.']}),
      Button({key:'share-back',label:'← Back to game',onPress:() => {ui.share = false;game.notice = '';redraw($);}}),
    ]);
    return panel([Box({ width,alignSelf:'center',flexDirection:'column',children:[
      Text({ bold:true,children:[`Sidequest #${challenge.puzzleNumber} · Round ${(challenge.round || 0) + 1}`] }),
      Text({ children:[state.won ? '✓ Escaped! Puzzle solved.' : e.props.isFocused ? 'Goal: slide block 1 out to the right.' : 'Click the game to play. Slide block 1 out to the right.'] }),
      Box({ flexDirection:wide ? 'row' : 'column',gap:wide ? 2 : 1,children:[
        drawBoard({Box,Text,Button},challenge,state,game.selected,layout,index => perform('select',index)),controls,
      ] }),
    ] })]);
  });
};
