import marked from 'marked';

// eslint-disable-next-line import/prefer-default-export
export function readDocument(docname) {
  return fetch(docname, { method: 'GET' }).then((response) => {
    if (response.ok) {
      return response.text().then(result => ({ text: result, filename: `${docname}.md` }));
    }
    return { text: '', filename: `${docname}.md` };
  });
}

/* Find first heading of lowest depth */
function findHeading(tokens) {
  const headings = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.type === 'heading') {
      if (token.depth === 1) {
        return token.text;
      }
      if (!headings[token.depth]) {
        headings[token.depth] = token.text;
      }
    }
  }

  return headings.reverse().pop();
}

export function markupDocument(doc) {
  const tokens = marked.lexer(doc.text);

  const headingText = findHeading(tokens);
  const markup = marked.parser(tokens);
  const data = {
    title: headingText,
    html: markup,
    text: doc.text,
    filename: doc.filename,
  };

  return data;
}
