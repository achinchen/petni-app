jest.mock('@remix-run/react', () => {
  const Module = jest.requireActual('@remix-run/react');
  return {
    ...Module,
    __esModule: true,
    useLoaderData: jest.fn()
  };
});

export {};
