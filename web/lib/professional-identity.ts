import {SITE_EMAIL, SITE_PHONE_E164, SITE_URL} from "./site";

export const PROFESSIONAL_IDENTITY = {
  alternateNames: [
    "ITSEGHOSIME",
    "Abdulrahman Bello",
    "Itseghosime Bello",
    "Abdulrahman Itseghosime",
  ],
  award: "Best Web Graduating Student — EdoBits, 2021",
  description:
    "Abdulrahman Itseghosime Bello is a software developer in Abuja, Nigeria, specialising in frontend engineering and accessible, responsive web products.",
  fullName: "Abdulrahman Itseghosime Bello",
  location: "Abuja, Nigeria",
  role: "Software Developer",
  sameAs: [
    "https://github.com/itseghosime",
    "https://www.linkedin.com/in/itseghosime",
  ],
} as const;

const CORE_KNOWLEDGE = [
  "Software development",
  "Frontend engineering",
  "Web development",
  "Responsive web design",
  "Web accessibility",
  "Web performance",
  "Content management systems",
  "AI-assisted software development",
];

type PersonStructuredDataInput = {
  description?: string;
  image?: string;
  knowsAbout?: string[];
  sameAs?: string[];
};

function unique(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}

export function createPersonStructuredData({
  description,
  image,
  knowsAbout = [],
  sameAs = [],
}: PersonStructuredDataInput = {}) {
  const personId = `${SITE_URL}/#person`;

  return {
    "@id": personId,
    "@type": "Person",
    name: PROFESSIONAL_IDENTITY.fullName,
    alternateName: PROFESSIONAL_IDENTITY.alternateNames,
    jobTitle: PROFESSIONAL_IDENTITY.role,
    description: description || PROFESSIONAL_IDENTITY.description,
    email: `mailto:${SITE_EMAIL}`,
    telephone: SITE_PHONE_E164,
    url: `${SITE_URL}/about`,
    image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    homeLocation: {
      "@type": "Place",
      name: PROFESSIONAL_IDENTITY.location,
    },
    award: [PROFESSIONAL_IDENTITY.award],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Benin",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Benin City",
          addressCountry: "NG",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "EdoBits",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Benin City",
          addressCountry: "NG",
        },
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: PROFESSIONAL_IDENTITY.role,
      description:
        "Software development with a frontend engineering specialism, including web products, CMS integrations, developer tools and production deployment.",
      occupationLocation: {
        "@type": "Country",
        name: "Nigeria",
      },
      skills: unique([...CORE_KNOWLEDGE, ...knowsAbout]),
    },
    knowsAbout: unique([...CORE_KNOWLEDGE, ...knowsAbout]),
    sameAs: unique([...PROFESSIONAL_IDENTITY.sameAs, ...sameAs]),
  };
}
