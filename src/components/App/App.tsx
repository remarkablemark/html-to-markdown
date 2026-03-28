import { Converter } from '../Converter';

export function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        HTML to Markdown
      </h1>
      <Converter />
    </main>
  );
}
