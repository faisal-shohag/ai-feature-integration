"use client"
import React from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CustomRenderer = ({ content }) => {
  // Render LaTeX
  const renderLatex = (text) => {
    if (typeof text !== "string") {
      return React.Children.map(text, (child) =>
        typeof child === "string" ? processLatex(child) : child
      );
    }
    return processLatex(text);
  };

  const processLatex = (text) => {
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return (
          <Latex key={index} displayMode={true}>
            {part}
          </Latex>
        );
      } else if (part.startsWith("$") && part.endsWith("$")) {
        return <Latex key={index}>{part}</Latex>;
      } else {
        return part;
      }
    });
  };

  // Custom components for markdown rendering
  const customComponents = {
    p: ({ children }) => <p className="py-2">{renderLatex(children)}</p>,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4">{renderLatex(children)}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-3">{renderLatex(children)}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mb-2">{renderLatex(children)}</h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1">{renderLatex(children)}</li>,
    strong: ({ children }) => (
      <strong className="font-bold">{renderLatex(children)}</strong>
    ),
    em: ({ children }) => <em className="italic">{renderLatex(children)}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1] || "javascript"}
          PreTag="div"
          className="mb-4 rounded"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-green-300 text-green-800 text-sm rounded px-1 py-0.5">
          {children}
        </code>
      );
    },
  };

  return (
    <div>
      <ReactMarkdown components={customComponents} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default CustomRenderer;