import { useContext } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { GlobalContext } from "../contexts";

const CodeBlock = ({ language, value }) => {
  const { viewMode } = useContext(GlobalContext);
  const isLight = viewMode === "minimal-light";
  return (
    <SyntaxHighlighter language={language} style={isLight ? vs : vscDarkPlus}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
