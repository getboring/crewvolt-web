import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Footer } from "~/components/footer";
import { JsonLdScript } from "~/components/json-ld-script";
import { Nav } from "~/components/nav";
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
    {
      title: "Energy Infrastructure Staffing | CrewVolt",
    },
    {
      name: "description",
      content:
        "CrewVolt places experienced inspectors, superintendents, and project managers on substation, wind, and solar projects. W-2 staffing for energy construction.",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Playfair+Display:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cv-navy focus:px-4 focus:py-2 focus:text-white focus:outline-none"
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
      <main className="mx-auto w-full max-w-3xl px-6 py-20">
        <h1 className="font-headline text-4xl text-cv-navy">{message}</h1>
        <p className="mt-4 text-base text-cv-steel">{details}</p>
        {stack ? (
          <pre className="mt-8 overflow-x-auto rounded-xl border border-cv-border bg-white p-4 text-xs text-cv-charcoal">
            <code>{stack}</code>
          </pre>
        ) : null}
      </main>
      <Footer />
    </TooltipProvider>
  );
}
