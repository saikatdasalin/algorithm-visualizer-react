function AboutPage() {
  return (
    <div className="space-y-4 pb-6">
      <section className="panel-glass rounded-2xl p-6">
        <h1 className="font-display text-3xl font-bold">About AlgoScope</h1>
        <p className="mt-3 max-w-3xl text-sm text-base-content/80 md:text-base">
          AlgoScope is a portfolio-grade educational platform for understanding algorithm behavior through visual,
          interactive simulations. It combines modern UI patterns with real-time execution feedback.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel-glass rounded-2xl p-5">
          <h2 className="font-display text-xl font-semibold">Tech Stack</h2>
          <ul className="mt-3 space-y-2 text-sm text-base-content/80">
            <li>React + Vite</li>
            <li>Tailwind CSS + shadcn-style component system</li>
            <li>Zustand for state management</li>
            <li>Framer Motion animations</li>
            <li>Recharts analytics</li>
          </ul>
        </article>

        <article className="panel-glass rounded-2xl p-5">
          <h2 className="font-display text-xl font-semibold">Accessibility Notes</h2>
          <ul className="mt-3 space-y-2 text-sm text-base-content/80">
            <li>Semantic headings and landmarks</li>
            <li>Keyboard shortcuts for navigation</li>
            <li>High contrast themes for readability</li>
            <li>Responsive layouts for desktop and mobile</li>
          </ul>
        </article>
      </section>
    </div>
  );
}

export default AboutPage;
