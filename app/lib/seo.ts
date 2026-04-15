const DEFAULT_BASE_URL = "https://crewvolt.com";

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function absoluteUrl(path: string, baseUrl = DEFAULT_BASE_URL) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function buildPageMeta(params: {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
}): MetaDescriptor[] {
  const pageUrl = absoluteUrl(params.path);
  const ogImage = absoluteUrl(params.imagePath ?? "/og/crewvolt-default.svg");

  return [
    { title: params.title },
    { name: "description", content: params.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "CrewVolt" },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: params.title },
    { name: "twitter:description", content: params.description },
    { name: "twitter:image", content: ogImage },
  ];
}

export function canonicalLinks(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CrewVolt",
  url: DEFAULT_BASE_URL,
  logo: absoluteUrl("/favicon.svg"),
  description:
    "CrewVolt places experienced inspectors, superintendents, and project managers on energy infrastructure projects.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    areaServed: ["US-TN", "US-TX", "US", "Southeast", "Midwest"],
    availableLanguage: ["English"],
  },
  sameAs: ["https://www.linkedin.com/company/crewvolt"],
};
