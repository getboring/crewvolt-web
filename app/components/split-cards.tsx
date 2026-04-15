export function SplitCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border border-cv-border bg-white p-6 shadow-sm">
        <p className="mb-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-copper">
          For clients
        </p>
        <p className="text-base leading-7 text-cv-charcoal">
          You need experienced inspectors, superintendents, and project managers on your jobsite.
          Not in six weeks. Now. We know who is good, we know who is available, and we handle
          the employment so you do not have to.
        </p>
      </article>

      <article className="rounded-xl border border-cv-border bg-white p-6 shadow-sm">
        <p className="mb-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-field-green">
          For workers
        </p>
        <p className="text-base leading-7 text-cv-charcoal">
          You have 10 or 20 years on energy projects and you want consistent work with fair pay.
          No 1099 headaches. No getting ghosted after a placement. No wondering where the next
          gig is. CrewVolt keeps you working on good projects and treats you like the professional
          you are.
        </p>
      </article>
    </div>
  );
}
