// eslint-disable-next-line import/prefer-default-export
export const tutorialsPage = (docname) => {
  // don't allow these characters: . : / \
  if (/[~.:/\\]/.test(docname)) {
    throw new Error('Illegal filename');
  }

  return {};
};
