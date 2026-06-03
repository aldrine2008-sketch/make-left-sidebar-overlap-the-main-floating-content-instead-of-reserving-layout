export interface Service {
  title: string;
  description: string;
  icon: string;
  route?: string;
  url?: string;
}

export interface ServiceCategory {
  category: string;
  description: string;
  services: Service[];
}

export const servicesCatalog: ServiceCategory[] = [
  {
    category: "Land Services",
    description: "Core land administration and registration services",
    services: [
      {
        title: "Land Records Search",
        description: "Search and view land ownership records",
        icon: "search",
        route: "/search",
      },
      {
        title: "Title Deed Registration",
        description: "Register new title deeds and land ownership",
        icon: "file-text",
        route: "/applications/new",
      },
      {
        title: "Land Transfer",
        description: "Transfer land ownership between parties",
        icon: "arrow-right-left",
        route: "/applications/new",
      },
      {
        title: "Subdivision Application",
        description: "Apply for land subdivision approval",
        icon: "split",
        route: "/applications/new",
      },
      {
        title: "Boundary Dispute",
        description: "File a land boundary dispute case",
        icon: "alert-triangle",
        route: "/applications/new",
      },
      {
        title: "Land Valuation",
        description: "Request official land valuation services",
        icon: "calculator",
        route: "/applications/new",
        url: "https://lands.go.ke/valuation",
      },
    ],
  },
  {
    category: "Citizen Services",
    description: "General government services for citizens",
    services: [
      {
        title: "ID Registration",
        description: "Register for national identification",
        icon: "id-card",
        url: "https://ecitizen.go.ke",
      },
      {
        title: "Business Registration",
        description: "Register a new business entity",
        icon: "briefcase",
        url: "https://ecitizen.go.ke",
      },
      {
        title: "Tax Services",
        description: "File taxes and view tax records",
        icon: "receipt",
        url: "https://itax.kra.go.ke",
      },
      {
        title: "Permits & Licenses",
        description: "Apply for various permits and licenses",
        icon: "file-check",
        url: "https://ecitizen.go.ke",
      },
      {
        title: "Public Records",
        description: "Access public records and documents",
        icon: "folder-open",
        route: "/verify",
      },
      {
        title: "Feedback & Support",
        description: "Submit feedback or get support",
        icon: "message-circle",
        url: "https://ecitizen.go.ke",
      },
    ],
  },
];
