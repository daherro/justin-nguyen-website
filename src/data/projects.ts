export interface Project {
  title: string;
  description: string;
  category: string;
  year: string;
  /** External URL — opens in a new tab. Mutually exclusive with `modal`. */
  href?: string;
  /** Message shown in a pop-up on click, for projects with no shareable public page. */
  modal?: string;
}

// Numbered index, ordered most significant first. Reordering is just array order.
export const projects: Project[] = [
  {
    title: 'The Hub',
    description:
      'A 0-to-1 AI-powered transformation platform I owned end to end, shipped to five enterprise clients with a production LLM assistant, predictive anomaly detection, and an AI email agent.',
    category: 'Enterprise Platform',
    year: '2021–Now',
    modal:
      'The Hub is an internal platform proprietary to Oliver Wyman. I do not have the rights to share details about it on my personal website.',
  },
  {
    title: 'Chronicle',
    description:
      "A platform I am building to record and preserve a loved one's life story in their own voice, so a family's memories last for generations. I started it to capture my grandmother's stories while she is still here.",
    category: 'Side Project',
    year: '2026',
    modal:
      'This project is currently in progress. I will publish it here once it is ready.',
  },
  {
    title: 'Reddit Signal Scanner',
    description:
      'A scanner that mines Reddit for emerging stock tickers and ranks them by upvote-weighted mentions and sentiment, with price and fundamentals filtering.',
    category: 'Side Project',
    year: '2026',
    href: 'https://reddit-signal-scanner.vercel.app/',
  },
  {
    title: 'Lot Armor',
    description:
      'A parking lot striping business I co-founded and ran, grew through direct sales and local partnerships, and then sold.',
    category: 'Business I Built',
    year: '2025–2026',
    href: 'https://www.golotarmor.com/',
  },
  {
    title: 'Fortune 50 IT Divestiture',
    description:
      'Led a 10-person team through a Fortune 50 IT divestiture at Microsoft, managing $6M in engagement funds and a ~20K-item Azure DevOps backlog. The work supported the Kyndryl spinoff and a global Microsoft partnership.',
    category: 'Program',
    year: '2020–2021',
    href: 'https://news.microsoft.com/source/2021/11/12/kyndryl-and-microsoft-establish-global-strategic-partnership-to-accelerate-digital-transformation-across-industries/',
  },
  {
    title: 'DoD Satellite Smartphone',
    description:
      'Built GPS, audio, and tracking features in Java and C for one of the first fully integrated satellite smartphones, developed for military and DoD applications.',
    category: 'Engineering',
    year: '2018',
    href: 'https://naltec.com/shout-solutions/',
  },
];
