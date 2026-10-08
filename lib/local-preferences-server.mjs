// Capability-scoped loopback bridge for browser and Claude file previews.
// The token grants access only to Sidequest preferences, never files or commands.
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { getPreferences, setPreferences } from './preferences.mjs';
export async function startPreferencesServer({ directory, render }) {
  const token = randomBytes(32).toString('hex');
  const server = createServer(async (request, response) => {
    const finish = (status, value, type = 'application/json') => {
      response.writeHead(status, {
        'Content-Type': type,
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(type === 'application/json' ? JSON.stringify(value) : value);
    };
    if (request.headers.host !== new URL(origin).host)
      return finish(403, { error: 'Invalid host' });
    const pathname = new URL(request.url, origin).pathname;
    if (
      !['/' + token + '/preferences', '/' + token + '/puzzle'].includes(
        pathname,
      )
    )
      return finish(404, { error: 'Not found' });
    const source = request.headers.origin;
    // Claude's rendered-file iframe may retain its dedicated content origin
    // or be opaque. Both still require the unguessable per-process URL.
    if (
      source &&
      !['null', origin, 'https://claudeusercontent.com'].includes(source)
    )
      return finish(403, { error: 'Origin not allowed' });
    if (source) {
      response.setHeader('Access-Control-Allow-Origin', source);
      response.setHeader('Vary', 'Origin');
    }
    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return finish(204, {});
    }
    try {
      if (pathname.endsWith('/puzzle') && request.method === 'GET')
        return finish(
          200,
          render(origin + '/' + token + '/preferences'),
          'text/html; charset=utf-8',
        );
      if (!pathname.endsWith('/preferences'))
        return finish(405, { error: 'Method not allowed' });
      if (request.method === 'GET')
        return finish(200, { preferences: getPreferences(directory) });
      if (
        request.method !== 'POST' ||
        request.headers['content-type'] !== 'application/json'
      )
        return finish(405, { error: 'JSON POST required' });
      let body = '';
      for await (const chunk of request) {
        body += chunk;
        if (body.length > 1024)
          return finish(413, { error: 'Request too large' });
      }
      return finish(200, {
        preferences: setPreferences(JSON.parse(body), directory),
      });
    } catch {
      return finish(400, { error: 'Unable to read or save these preferences' });
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  server.unref();
  const origin = 'http://127.0.0.1:' + server.address().port;
  return {
    url: origin + '/' + token + '/puzzle',
    endpoint: origin + '/' + token + '/preferences',
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
