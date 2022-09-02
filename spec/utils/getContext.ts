import type { DataFunctionArgs } from '@remix-run/node';

type Parameters = {
  request?: any;
  params?: any;
};

export default function getContext({ request, params }: Parameters) {
  return { request, params } as DataFunctionArgs;
}
