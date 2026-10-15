/**
 * Site-wide constants: identity, metadata and navigation.
 *
 * Navigation deliberately mirrors the current Hugo menu (config/_default/menu.yml
 * in ubccsss.org) so the React routes line up with the URLs already in the wild.
 * Every entry below is a placeholder until the page it points at is built.
 */

export const site = {
  name: "UBC CSSS",
  shortName: "CSSS",
  title: "UBC Computer Science Student Society",
  description:
    "The UBC Computer Science Student Society (CSSS) is the student-run society for Computer Science students at the University of British Columbia.",
  // The eventual production home, used for canonical/OG URLs. While this is
  // still a staging deploy on someone.netlify.app, the noindex layers keep the
  // mismatch from mattering. Update this when the rewrite actually moves.
  url: "https://ubccsss.org",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Sponsorship", href: "/about/partners" },
  { label: "The Cube", href: "/cube" },
  { label: "Services", href: "/services" },
  { label: "Course Reviews", href: "/services/courses" },
  { label: "Technical Career Fair", href: "/tcf" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Elections", href: "/elections" },
  { label: "Affiliates", href: "/about/affiliates" },
];
