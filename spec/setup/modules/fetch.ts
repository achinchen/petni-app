import fetch, { Response, Headers, Request } from 'node-fetch';

if (!('fetch' in globalThis)) {
  Object.assign(globalThis, { fetch, Headers, Request, Response });
}

export {};
