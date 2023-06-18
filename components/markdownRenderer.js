import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDefinitionList from "remark-definition-list";

import CodeBlock from "./codeblock";

const MarkdownRenderer = ({ content }) => {
  const renderCodeBlock = (props) => {
    const { className, children, inline } = props;
    if (inline) {
      return <span className="highlighted-code">{children}</span>;
    }
    return (
      <CodeBlock
        language={className && className.replace("language-", "")}
        value={children}
      />
    );
  };

  return (
    <ReactMarkdown
      components={{ code: renderCodeBlock }}
      remarkPlugins={[remarkGfm, remarkDefinitionList]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
