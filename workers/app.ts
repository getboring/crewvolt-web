import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: https://*.unsplash.com https://images.unsplash.com",
    "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "connect-src 'self' https://api.resend.com https://cloudflareinsights.com",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
};

export default {
  async fetch(request, env, ctx) {
    const response = await requestHandler(request, {
      cloudflare: { env, ctx },
    });

    // Apply security headers (skip for static assets where CSP could be over-strict).
    const url = new URL(request.url);
    const isAsset = /\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|ico|map)$/i.test(
      url.pathname
    );
    if (isAsset) {
      return response;
    }

    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      if (!headers.has(k)) headers.set(k, v);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
