const DEFAULT_BASE_URL = "https://crewvolt.com";

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function absoluteUrl(path: string, baseUrl = DEFAULT_BASE_URL) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/** Build the dynamic OG image URL for a given page title + subtitle.
 *  Routes to the /og.png loader which returns a freshly-rendered PNG. */
function buildOgImagePath(opts: {
  title: string;
  subtitle: string;
  eyebrow?: string;
}) {
  const params = new URLSearchParams({
    title: opts.title,
    subtitle: opts.subtitle,
  });
  if (opts.eyebrow) params.set("eyebrow", opts.eyebrow);
  return `/og.png?${params.toString()}`;
}

export function buildPageMeta(params: {
  title: string;
  description: string;
  path: string;
  /** Override the auto-generated dynamic OG image. */
  imagePath?: string;
  /** Eyebrow text shown above the title in the OG image (e.g. "Industries") */
  ogEyebrow?: string;
}): MetaDescriptor[] {
  const pageUrl = absoluteUrl(params.path);
  // Drop the "| CrewVolt" suffix from titles when rendering the OG, since
  // the OG already shows the brand wordmark.
  const ogTitle = params.title.replace(/\s*[|\-—]\s*CrewVolt.*$/i, "");
  const ogImage = absoluteUrl(
    params.imagePath ??
      buildOgImagePath({
        title: ogTitle,
        subtitle: params.description,
        eyebrow: params.ogEyebrow,
      }),
  );

  return [
    { title: params.title },
    { name: "description", content: params.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "CrewVolt" },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
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
  "@type": "ProfessionalService",
  name: "CrewVolt",
  url: DEFAULT_BASE_URL,
  logo: absoluteUrl("/favicon.svg"),
  image: absoluteUrl("/og/crewvolt-default.png"),
  description:
    "W-2 contract staffing company placing experienced inspectors, superintendents, and project managers on energy infrastructure projects including substations, wind, solar, BESS, and transmission.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "TN",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Tennessee" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "Energy infrastructure staffing",
    "W-2 contract staffing",
    "Inspection staffing",
    "Construction management staffing",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "staffing@crewvolt.com",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: ["https://www.linkedin.com/company/crewvolt"],
  knowsAbout: [
    "Substation construction",
    "Wind energy construction",
    "Solar energy construction",
    "Battery energy storage systems",
    "Transmission construction",
    "Grid modernization",
  ],
};
