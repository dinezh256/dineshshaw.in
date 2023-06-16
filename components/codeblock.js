import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import blockStyle from "react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={blockStyle}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
