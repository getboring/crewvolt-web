import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services._index.tsx"),
  route("services/owner-side", "routes/services.owner-side.tsx"),
  route("services/contractor-side", "routes/services.contractor-side.tsx"),
  route("how-it-works", "routes/how-it-works.tsx"),
  route("industries", "routes/industries.tsx"),
  route("why-crewvolt", "routes/why-crewvolt.tsx"),
  route("staff-my-project", "routes/staff-my-project.tsx"),
  route("join-our-network", "routes/join-our-network.tsx"),
  route("contact", "routes/contact.tsx"),
  route("vendor-readiness", "routes/vendor-readiness.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
