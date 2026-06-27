export interface Project {
  title: string;
  description: string;
  category: string;
  year: string;
  href: string;
}

// Numbered index, ordered most significant first. Update `href` as live
// links or detail pages become available.
export const projects: Project[] = [
  {
    title: 'The Hub',
    description:
      'A 0-to-1 AI-powered transformation platform I owned end to end, shipped to five enterprise clients with a production LLM assistant, predictive anomaly detection, and an AI email agent.',
    category: 'Enterprise Platform',
    year: '2021–Now',
    href: '#',
  },
  {
    title: 'FLO Promo Optimization',
    description:
      'PM lead on a ~$6M retail promo-optimization engagement, expanding the tool from a one-banner pilot to four banners for an $18B Canadian grocer, with hands-on SQL and production code.',
    category: 'Product · PM Lead',
    year: '2026',
    href: '#',
  },
  {
    title: 'Lot Armor',
    description:
      'A parking lot striping business I co-founded and ran, grew through direct sales and local partnerships, and then sold.',
    category: 'Business I Built',
    year: '2025–2026',
    href: '#',
  },
  {
    title: 'Fortune 50 IT Divestiture',
    description:
      'Led a 10-person team through a Fortune 50 IT divestiture at Microsoft, managing $6M in engagement funds and a ~20K-item Azure DevOps backlog.',
    category: 'Program',
    year: '2020–2021',
    href: '#',
  },
  {
    title: 'DoD Satellite Smartphone',
    description:
      'Built GPS, audio, and tracking features in Java and C for one of the first fully integrated satellite smartphones, developed for military and DoD applications.',
    category: 'Engineering',
    year: '2018',
    href: '#',
  },
];
