import { Link } from "react-router";

import { Button } from "~/components/ui/button";

export function CtaBanner() {
  return (
    <section className="rounded-xl bg-cv-navy px-6 py-8 md:px-8 md:py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-[1.5px] uppercase cv-dark-accent-label">
            For clients
          </p>
          <p className="text-lg font-semibold cv-dark-text-primary">
            You have a project. You need people. We probably already know who should be on it.
          </p>
          <div className="mt-4">
            <Button asChild variant="accent">
              <Link to="/staff-my-project">Staff my project</Link>
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-cv-field-green-light">
            For workers
          </p>
          <p className="text-lg font-semibold cv-dark-text-primary">
            You have the experience. We have the projects.
          </p>
          <div className="mt-4">
            <Button asChild variant="secondary" className="border-white text-white hover:bg-transparent">
              <Link to="/join-our-network">Join our network</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
