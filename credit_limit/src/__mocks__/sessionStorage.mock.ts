const sessionStorageMock: Storage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: jest.fn(),
    length: 0,
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});
