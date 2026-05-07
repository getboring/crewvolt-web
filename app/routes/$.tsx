import { Link } from "react-router";

import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { buildPageMeta, canonicalLinks } from "~/lib/seo";
import type { Route } from "./+types/$";

export function meta(_: Route.MetaArgs) {
  return buildPageMeta({
    title: "Page not found | CrewVolt",
    description: "The page you are looking for does not exist.",
    path: "/404",
  });
}

export function links() {
  return canonicalLinks("/404");
}

export default function CatchAllRoute(_: Route.ComponentProps) {
  return (
    <SectionWrapper tone="parchment" className="min-h-[60vh]" innerClassName="flex justify-center">
      <div className="max-w-xl text-center">
        <p className="font-logo text-[20px] font-bold tracking-[1.5px] text-cv-navy">CREWVOLT</p>
        <h1 className="mt-6 font-headline text-[36px] leading-[1.15] font-bold text-cv-navy">
          This page does not exist.
        </h1>
        <p className="mt-4 text-base leading-7 text-cv-charcoal">
          The page you are looking for is not here. You can go back to the homepage or use the
          links below.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/staff-my-project">Staff my project</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/join-our-network">Join our network</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
