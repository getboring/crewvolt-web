import { Link } from "react-router";

import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-cv-navy-dark via-cv-navy to-cv-navy-light py-20 md:py-24">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-linear-to-r from-transparent to-[#b8733310]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <p className="mb-4 text-[11px] font-semibold tracking-[2px] uppercase cv-dark-accent-label">
          Energy infrastructure staffing
        </p>
        <h1 className="max-w-2xl font-headline text-[36px] leading-[1.15] font-bold cv-dark-text-primary md:text-[42px]">
          The right people on the right project.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 cv-dark-text-secondary">
          CrewVolt places experienced inspectors, superintendents, and project managers on
          energy infrastructure projects. Substations. Wind. Solar. We know who is good and we
          know who is available.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/staff-my-project">I need to staff a project</Link>
          </Button>
          <Button asChild variant="secondary" className="border-white text-white hover:bg-transparent">
            <Link to="/join-our-network">I am looking for work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
