import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// A simple but beautiful syntax highlighter for Java code blocks
const highlightJava = (code) => {
  if (!code) return '';

  // Escape HTML entities to prevent rendering bugs or security issues
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Placeholders to preserve comments and strings during parsing
  const stringBlocks = [];
  const commentBlocks = [];

  // 1. Temporarily extract and mask string literals: "..."
  html = html.replace(/"(\\.|[^"\\])*"/g, (match) => {
    const id = `__STR_${stringBlocks.length}__`;
    stringBlocks.push(match);
    return id;
  });

  // 2. Temporarily extract and mask single-line comments: // ...
  html = html.replace(/\/\/.*$/gm, (match) => {
    const id = `__SCOMM_${commentBlocks.length}__`;
    commentBlocks.push(match);
    return id;
  });

  // 3. Temporarily extract and mask multi-line comments: /* ... */
  html = html.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const id = `__MCOMM_${commentBlocks.length}__`;
    commentBlocks.push(match);
    return id;
  });

  // 4. Highlight keywords
  const keywords = [
    'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
    'new', 'return', 'this', 'super', 'import', 'package', 'throws', 'throw',
    'try', 'catch', 'finally', 'if', 'else', 'for', 'while', 'do', 'switch',
    'case', 'break', 'continue', 'default', 'static', 'final', 'abstract',
    'synchronized', 'volatile', 'transient', 'void', 'int', 'double', 'float',
    'long', 'short', 'byte', 'boolean', 'char', 'instanceof', 'new'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(keywordRegex, '<span class="text-pink-500 font-semibold">$1</span>');

  // 5. Highlight annotations
  html = html.replace(/(@\w+)/g, '<span class="text-yellow-500/90">$1</span>');

  // 6. Highlight common classes and built-in components (PascalCase starting)
  // We match things like System, String, Scanner, Array, Object, Exception, Thread, etc.
  html = html.replace(/\b([A-Z]\w+)\b/g, '<span class="text-cyan-400">$1</span>');

  // 7. Highlight methods
  html = html.replace(/\b(\w+)(?=\s*\()/g, '<span class="text-blue-400">$1</span>');

  // 8. Restore strings and wrap in spans
  stringBlocks.forEach((str, i) => {
    html = html.replace(`__STR_${i}__`, `<span class="text-emerald-400">${str}</span>`);
  });

  // 9. Restore comments and wrap in spans
  commentBlocks.forEach((comm, i) => {
    const escapedComm = comm.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const highlightedComm = `<span class="text-slate-400/80 italic">${escapedComm}</span>`;
    
    // We try to match both single and multi-line comments placeholder
    html = html.replace(new RegExp(`__(SCOMM|MCOMM)_${i}__`, 'g'), highlightedComm);
  });

  return html;
};

export const CodeBlock = ({ 
  code, 
  fileName = 'JavaCode.java', 
  showLineNumbers = true 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const highlighted = highlightJava(code);
  const lines = code.trim().split('\n');

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl text-slate-200 my-4">
      {/* Editor Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 select-none">
        {/* Mac-style Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          {fileName && (
            <span className="ml-3 text-xs text-slate-400 font-mono tracking-wide">{fileName}</span>
          )}
        </div>
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700/80 transition-all duration-200 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => {
              const highlightedLine = highlightJava(line);
              return (
                <tr key={idx} className="hover:bg-slate-800/20 group">
                  {showLineNumbers && (
                    <td className="w-8 pr-4 text-right text-slate-600 select-none border-r border-slate-800/30 text-xs align-top pt-[2px]">
                      {idx + 1}
                    </td>
                  )}
                  <td className={`pl-4 align-top whitespace-pre`}>
                    <code dangerouslySetInnerHTML={{ __html: highlightedLine || ' ' }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeBlock;
