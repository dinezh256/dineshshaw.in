import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDefinitionList from "remark-definition-list";

import CodeBlock from "./codeblock";

const MarkdownRenderer = ({ content }) => {
  const renderInlineCode = ({ children }) => (
    <span className="highlighted-code">{children}</span>
  );

  const renderPre = ({ children }) => {
    const code = children?.props;
    const language = (code?.className || "").replace("language-", "");
    return (
      <CodeBlock
        language={language || "text"}
        value={String(code?.children || "").replace(/\n$/, "")}
      />
    );
  };

  return (
    <ReactMarkdown
      components={{ code: renderInlineCode, pre: renderPre }}
      remarkPlugins={[remarkGfm, remarkDefinitionList]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
