import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CircleDollarSign,
  Clock,
  Compass,
  FileCheck2,
  Handshake,
  Heart,
  PhoneCall,
  Repeat,
  Shield,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type Benefit = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const clientBenefits: Benefit[] = [
  {
    icon: Clock,
    title: "5-day match window",
    body: "Active-network roles surfaced fast — no four-week recruiter cycle.",
  },
  {
    icon: Shield,
    title: "W-2 employees only",
    body: "Workers comp, GL, payroll, taxes — handled. No misclassification risk.",
  },
  {
    icon: FileCheck2,
    title: "COI ready",
    body: "Insurance, vendor docs, and prequalification packet ready at intake.",
  },
  {
    icon: BadgeCheck,
    title: "Field-vetted",
    body: "References from people who actually worked alongside the candidate.",
  },
  {
    icon: Zap,
    title: "Energy-only specialization",
    body: "Substation, wind, solar, BESS, transmission. We do not staff outside our category.",
  },
  {
    icon: Briefcase,
    title: "One invoice, one vendor",
    body: "AP-friendly. Procurement gets a single MSA, single PO, single line item.",
  },
];

const workerBenefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "W-2 — not 1099",
    body: "Real employment. Taxes withheld. No quarterly estimated bookkeeping.",
  },
  {
    icon: Wallet,
    title: "Weekly pay",
    body: "Direct deposit on a predictable schedule. No invoice chasing.",
  },
  {
    icon: Heart,
    title: "Workers comp + GL",
    body: "Covered on every site. Slip on a transmission tower, you are protected.",
  },
  {
    icon: CircleDollarSign,
    title: "Fair rate, no cuts",
    body: "Rate we agree to is the rate you get. No bait-and-switch after placement.",
  },
  {
    icon: Repeat,
    title: "Continuity to next project",
    body: "We start working on the next placement before the current one wraps.",
  },
  {
    icon: Compass,
    title: "Per diem when on the road",
    body: "Travel and lodging handled. You focus on the work, not the logistics.",
  },
  {
    icon: PhoneCall,
    title: "We pick up the phone",
    body: "After placement is when most agencies disappear. We do not.",
  },
  {
    icon: Handshake,
    title: "Treated like the pro you are",
    body: "We talk to you the way someone who has run jobsites would.",
  },
];

type BenefitGridProps = {
  audience: "clients" | "workers";
  /** Override the heading. */
  heading?: string;
  /** Override the lead copy. */
  lead?: string;
  className?: string;
};

export function BenefitGrid({
  audience,
  heading,
  lead,
  className,
}: BenefitGridProps) {
  const isClient = audience === "clients";
  const benefits = isClient ? clientBenefits : workerBenefits;
  const accentClass = isClient ? "text-cv-copper" : "text-cv-field-green";

  const defaultHeading = isClient
    ? "What clients get when they work with us."
    : "What workers get when they join our network.";
  const defaultLead = isClient
    ? "Every engagement comes with the same set of operating commitments. No surprises at procurement, no surprises on site."
    : "Every CrewVolt placement comes with the same set of guarantees. The basics that should not be optional in a 2026 staffing relationship.";

  return (
    <div className={className}>
      <h2
        className={cn(
          "font-headline text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] font-semibold text-cv-navy",
        )}
      >
        {heading ?? defaultHeading}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-cv-charcoal">
        {lead ?? defaultLead}
      </p>

      <ul
        role="list"
        className={cn(
          "mt-8 grid gap-4 sm:grid-cols-2",
          isClient ? "lg:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {benefits.map((b) => (
          <li key={b.title}>
            <Card className="@container/card h-full border-transparent bg-white shadow-sm ring-1 ring-cv-border">
              <CardHeader>
                <b.icon
                  aria-hidden="true"
                  className={cn("size-5 shrink-0", accentClass)}
                />
                <CardTitle className="font-headline text-base font-semibold leading-snug text-cv-navy @md/card:text-[17px]">
                  {b.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-cv-steel">{b.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
