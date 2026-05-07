import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { BarScale } from "~/components/bar-scale";
import { Footer } from "~/components/footer";
import { JsonLdScript } from "~/components/json-ld-script";
import { Nav } from "~/components/nav";
import { StickyMobileCta } from "~/components/sticky-mobile-cta";
import { TitleBlock } from "~/components/title-block";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/sonner";
import { organizationSchema } from "~/lib/seo";
import type { Route } from "./+types/root";
import "./styles/app.css";

export function loader({ context }: Route.LoaderArgs) {
  return {
    analyticsToken: context.cloudflare.env.CF_WEB_ANALYTICS_TOKEN ?? "",
  };
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Energy Infrastructure Staffing | CrewVolt" },
    {
      name: "description",
      content:
        "CrewVolt places experienced inspectors, superintendents, and project managers on substation, wind, and solar projects. W-2 staffing for energy construction.",
    },
    { name: "theme-color", content: "#1A1A1A" },
    { name: "color-scheme", content: "light" },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "preconnect", href: "https://api.fontshare.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Fraunces:opsz,wght@9..144,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap",
  },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cv-pencil focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-cv-vellum focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const analyticsBeacon = loaderData.analyticsToken
    ? JSON.stringify({ token: loaderData.analyticsToken })
    : null;

  return (
    <TooltipProvider>
      <JsonLdScript data={organizationSchema} />
      <Nav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <TitleBlock />
      <BarScale />
      <StickyMobileCta />
      <Toaster position="top-center" richColors />
      {analyticsBeacon ? (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={analyticsBeacon}
        />
      ) : null}
    </TooltipProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <TooltipProvider>
      <Nav />
      <main id="main-content" className="mx-auto w-full max-w-3xl px-6 py-20">
        <p className="cv-slug-copper">Sheet — error</p>
        <h1 className="cv-display mt-4 text-[clamp(2.5rem,5vw,4rem)]">{message}</h1>
        <p className="mt-4 text-base leading-relaxed text-cv-graphite">{details}</p>
        {stack ? (
          <pre className="mt-8 overflow-x-auto cv-paper-flat p-4 cv-mono text-xs">
            <code>{stack}</code>
          </pre>
        ) : null}
      </main>
      <Footer />
    </TooltipProvider>
  );
}
