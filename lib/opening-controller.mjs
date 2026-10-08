// External runtime import keeps the CLI entry guard out of the MCP bundle.
export async function controlOpening(action, ticket) {
  try {
    const { runOpeningCommand } = await import('../scripts/wait-detector.mjs');
    return await runOpeningCommand({ action, ticket });
  } catch {
    return { proceed: false, reason: 'state-unavailable', notified: false };
  }
}
