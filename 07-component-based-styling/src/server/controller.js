export const homePage = () => null;

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
});

export const tutorialsPage = num => ({
  serverMessage: `Hello from the server! (received ${num})`,
});
