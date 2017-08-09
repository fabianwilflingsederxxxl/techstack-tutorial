export const homePage = () => null;

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
});

export const tutorialsPage = num => ({
  serverMessage: `Hello from the server! (received ${num})`,
});

export const articlePage = (docname) => {
  // don't allow these characters: . : / \
  if (/[~.:/\\]/.test(docname)) {
    throw new Error('Illegal filename');
  }

  return {};
};
