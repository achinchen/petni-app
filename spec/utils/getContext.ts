import type { DataFunctionArgs } from '@remix-run/node';

type Parameters = {
  request: any;
};

export default function getContext({ request }: Parameters) {
  return { request } as DataFunctionArgs;
}
