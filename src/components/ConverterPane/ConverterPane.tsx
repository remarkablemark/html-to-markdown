import { type ChangeEvent } from 'react';

interface ConverterPaneProps {
  headerLabel: string;
  id: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
  readOnly?: boolean;
  value: string;
}

export function ConverterPane({
  headerLabel,
  id,
  name,
  onChange,
  className,
  readOnly = false,
  value,
}: ConverterPaneProps) {
  return (
    <label className={`min-h-0 flex-col md:flex ${className}`} htmlFor={id}>
      <span className="block border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
        {headerLabel}
      </span>
      <textarea
        className={`min-h-0 w-full flex-1 resize-none border-0 bg-white p-3 font-mono text-sm leading-7 text-slate-900 outline-none dark:bg-slate-900 dark:text-slate-100 ${headerLabel === 'Markdown' ? 'dark:md:bg-slate-800' : ''}`}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        value={value}
      />
    </label>
  );
}
