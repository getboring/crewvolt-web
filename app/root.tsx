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
  // Route-level meta() replaces parent meta in React Router 7. PWA / mobile
  // meta tags that should be present on EVERY route live in the <head> of
  // Layout below — not here.
  return [
    { title: "Energy Infrastructure Staffing | CrewVolt" },
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
  // LCP boost — preload the hero image so the offshore-wind photo paints fast.
  {
    rel: "preload",
    as: "image",
    href: "/img/hero-offshore-wind.jpg",
    fetchPriority: "high",
    imageSizes: "55vw",
  },
  // PWA manifest
  { rel: "manifest", href: "/manifest.webmanifest" },
  // Favicons
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  // iOS home-screen icon
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  // Safari pinned tab (uses the SVG mask)
  { rel: "mask-icon", href: "/favicon.svg", color: "#1b365d" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* PWA / iOS / Android — present on every route, not overridable */}
        <meta name="application-name" content="CrewVolt" />
        <meta name="apple-mobile-web-app-title" content="CrewVolt" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f7f4ef"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1b365d"
        />
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
      <Toaster
        position="bottom-center"
        richColors
        offset={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        mobileOffset={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      />
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
  let title = "Something went wrong on our end.";
  let details = "Try refreshing, or get in touch and we will look into it.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "This page does not exist.";
      details = "Use the links below to get back on track.";
    } else {
      title = `Error ${error.status}`;
      details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <TooltipProvider>
      <Nav />
      <main
        id="main-content"
        className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-cv-copper">
          CrewVolt
        </p>
        <h1 className="mt-4 font-headline text-[clamp(2.25rem,4vw,3rem)] leading-[1.05] font-bold text-cv-navy">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-cv-charcoal">
          {details}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex h-11 items-center rounded-md bg-cv-navy px-7 text-sm font-semibold text-white transition-colors hover:bg-cv-copper"
          >
            Back home
          </a>
          <a
            href="/contact"
            className="inline-flex h-11 items-center rounded-md border border-cv-navy bg-transparent px-7 text-sm font-semibold text-cv-navy transition-colors hover:border-cv-copper hover:text-cv-copper"
          >
            Contact us
          </a>
        </div>
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
