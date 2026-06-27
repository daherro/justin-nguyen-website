# Personal Website Design Brief

## Who This Is For

Justin Nguyen. Strategist and builder. Not defined by any single company, but shaped by a career that moves fluidly between strategy and execution across enterprise consulting, product development, and entrepreneurship.

Career trajectory: Computer Science and Entrepreneurship at the University of Virginia (3.9 GPA, Phi Beta Kappa, With Distinction). Joined Microsoft as a Program Manager leading a 10-person team through a Fortune 50 IT divestiture. Moved to Oliver Wyman where he spent 5+ years as an Associate across strategy, operations, and product delivery, including building The Hub, a 0-to-1 AI-powered enterprise platform deployed across 5 clients with production LLM features, predictive anomaly detection, and an AI email agent. Most recently served as PM lead on a ~$6M retail promo-optimization engagement for an $18B Canadian grocery retailer, expanding a tool from 1 to 4 retail banners with hands-on SQL and code contributions. Outside of corporate work, founded and operated Lot Armor, a parking lot striping business. Also has experience co-launching a search fund to acquire and operate a small business.

The through line is not "consultant" or "PM" or "founder." It is someone who structures ambiguous problems into executable plans, builds the thing, and ships it.

## Purpose

This site goes into job applications. It is the link a hiring manager clicks after reading a resume, and it needs to do two things in under 10 seconds: confirm credibility and reveal dimension the resume cannot. The site also houses a personal blog for longer-form thinking on topics that interest Justin, which doubles as a signal of intellectual curiosity and communication ability to prospective employers.

## Cultural Design Foundation

Justin is Vietnamese-American. His Vietnamese heritage is a source of deep personal pride and should inform the site's visual identity in a way that feels embedded in the design language rather than applied on top of it. The inspiration comes from Vietnamese artistic traditions, not political identity. No flags, no national symbols, no government associations.

The design should draw from these specific Vietnamese traditions:

### Sơn Mài (Vietnamese Lacquerware)
Vietnamese lacquer art is a centuries-old tradition requiring up to 100 days and 20 stages to produce a single piece. Multiple layers of lacquer are applied over wood, with inlays of eggshell, mother-of-pearl, or gold leaf. The traditional palette is deep black, vermillion red, and warm brown/gold. The aesthetic is one of depth through layering, richness through restraint, and beauty that reveals itself slowly. This philosophy should guide the entire site: depth earned through careful craft, not surface-level decoration.

### Lý Dynasty Celadon
Vietnamese ceramics from the Lý Dynasty (1009-1225) are famous for their celadon glaze, a pale grayish-green that ranges from jade to moss to sage. The glaze was produced in different shades: pale grayish green, yellow green, light green, violet green. These ceramics were prized across East and Southeast Asia for their understated elegance. A celadon-derived green is the recommended accent color for the site, used sparingly (links, hover states, the availability indicator). It is distinctly Vietnamese, not generic "tech blue," and pairs naturally with the near-black and off-white base palette.

### Vietnamese Diacritical Marks
Vietnamese uses Latin script enriched with an extensive system of tonal diacritical marks (dấu). Consider rendering Justin's name with proper Vietnamese diacritics somewhere on the site (e.g., "Nguyễn" in a subtitle, footer, or the About page), as a quiet cultural marker. This is not decoration; it is the correct rendering of the name. The diacritical marks are visually elegant and immediately signal Vietnamese identity to those who recognize them, while reading as clean typography to those who do not.

### What NOT to Do
- No lotus flowers, dragons, or lanterns used as literal decorative elements. These are meaningful cultural symbols that become kitsch when used as clip art.
- No Vietnamese flag colors (red and yellow star) or any political imagery.
- No bamboo textures, rice paddy photography, or other "stock Vietnam" imagery.
- No áo dài illustrations or any figurative cultural imagery.
- The Vietnamese influence should live in the color palette, the typography choices, the philosophy of layered depth, and the disciplined restraint of the layout. If a viewer cannot immediately tell "this is a Vietnamese-inspired site," that is correct. The influence should be felt, not labeled.

## Site Structure

Four pages total. Simple top navigation. No hamburger menus, no dropdowns.

### 1. Homepage

The homepage is a brief, confident introduction. Not a landing page with a giant hero image. Not a wall of text. Think of it as a business card that breathes.

Content hierarchy:
- Name (Justin Nguyen) and a one-line identity statement. Something in the spirit of "strategist and builder" but in Justin's own words, not a job title. Consider including "Nguyễn" with diacritics as a subtle secondary rendering (e.g., smaller type beneath or beside the anglicized name).
- A short paragraph (3-4 sentences max) that establishes who he is and what he cares about, written in first person, conversational but not casual.
- Two clear entry points below: one to Projects, one to the Blog.
- A subtle indicator of availability or current status (e.g., "Currently exploring operator roles at growth-stage companies"), not a blinking badge, just a line of text.

The homepage should not list work experience. That belongs on the About page. The homepage is the hook, not the resume.

### 2. Projects

A clean list of personal coding projects and notable professional work. Each project gets:
- Project name
- One-line description
- Year
- A tag or label for category (e.g., "side project," "enterprise platform," "business I built")
- Link to live project, GitHub repo, or a detail page with more context

This page should feel like a numbered index (reference: carlosprado.dev's project list, where projects are listed 01-09 with year and title). No thumbnails unless Justin adds screenshots later. Text-first. The list itself should communicate rigor and range.

Include The Hub, Lot Armor, and other personal builds alongside coding projects. The point is to show builder instinct across domains, not just code output.

### 3. Blog

A reverse-chronological list of posts. Each entry shows:
- Post title
- Date
- A one-line preview or subtitle (not a full excerpt)

No categories or tags in v1. No sidebar. No "featured posts" section. Just a clean list that grows over time. Individual blog posts should be comfortable to read: appropriate line length (60-75 characters per line), generous spacing, clear typography hierarchy for headers within posts.

The blog is where Justin writes about whatever interests him: strategy, technology, culture, ideas. It should not feel like a "content marketing" blog. It should feel like a person's notebook that happens to be public.

### 4. About

This is the page that does the heaviest lifting for job applications. Structure it as:

**Introduction section:** A longer version of who Justin is, written in first person. This is where Vietnamese-American identity, personal values, and the "strategist and builder" narrative come together. Not a bio in third person. Not a cover letter. A genuine, concise self-portrait.

**Experience section:** A streamlined, visually clean timeline of career history. Not a copy-paste of the resume, but the key beats:

- Oliver Wyman (Sep 2021 to Present): Associate across Strategy, Operations, and Product Delivery. Built The Hub (0-to-1 AI platform) across 5 enterprise clients. PM lead on a ~$6M retail engagement expanding a promo-optimization tool across 4 banners for an $18B Canadian grocer. Designed procurement operating models, built $1B+ revenue roadmaps, led cross-functional teams of 5-8 across overlapping engagements.
- Microsoft (Sep 2020 to Sep 2021): Program Manager, Modern Workplace. Led a 10-person team through a Fortune 50 IT divestiture, managed $6M in engagement funds, prioritized a ~20K-item Azure DevOps backlog.
- Lot Armor: Founded and operated a parking lot striping business.
- University of Virginia (May 2020): B.A. Computer Science & Entrepreneurship, With Distinction, Phi Beta Kappa, 3.9 GPA.
- Thomas Jefferson High School for Science & Technology: Advanced Studies Diploma, #1 STEM magnet school in the U.S.

Each entry gets a company/project name, role, timeframe, and 1-2 sentences. No bullet-point lists of responsibilities. The design should let the content breathe without needing decorative timeline graphics.

**Contact/links:** Email, LinkedIn, GitHub. No contact form in v1. Just links.

## Visual Direction

Stark. Architectural. Typographic. Depth through restraint. The reference points are carlosprado.dev (layout discipline, numbered project index, text-first aesthetic) and Vietnamese sơn mài philosophy (beauty revealed through patient layering, not surface embellishment).

### Typography
- One sans-serif typeface family for everything. Something with personality but not novelty, with strong support for Vietnamese diacritical marks (this is a hard requirement, not a nice-to-have). Candidates: Inter (excellent Vietnamese support), Satoshi, Geist, or similar. Avoid anything that reads as "default" (system fonts) or "trying too hard" (display/decorative faces).
- Large, confident headings. Generous letter-spacing on uppercase labels if used.
- Body text sized for comfortable reading (16-18px equivalent). Generous line height (1.5-1.6).

### Color
- Near-black and off-white as the primary palette. Not pure #000 and #FFF. Consider a very slight warm undertone to the off-white (referencing the warm ivory of aged lacquer or ceramic glaze) and a rich near-black with depth (not flat charcoal).
- **Accent color: a Vietnamese celadon green.** Muted, understated, pulled from the Lý Dynasty ceramic palette. Think sage-to-jade range, not mint or neon. Used sparingly: links, hover states, the availability indicator, perhaps a thin rule or border element. This single color does the cultural work without needing explanation.
- No other accent colors. The palette is: warm near-black, warm off-white, celadon green. That is the entire system.
- Dark mode support is a nice-to-have for v2, not v1.

### Layout
- Generous whitespace. Let the content breathe.
- Max content width around 720-800px for text-heavy pages (Blog posts, About). Wider (up to 1200px) for the Projects list if needed.
- No sidebar on any page.
- Mobile-responsive but designed desktop-first (hiring managers review on laptops).
- Consider subtle use of a thin horizontal rule or border as a recurring structural element, referencing the layered horizontal planes of lacquerware or the banded decoration on Vietnamese ceramics. This is a structural choice, not decoration.

### Motion and Interaction
- Minimal. No page transition animations. No scroll-triggered reveals. No parallax.
- Subtle hover states on links and project list items (celadon green color shift or underline, not transform/scale effects).
- The site should feel fast and static, not "animated."

### What to Avoid
- Hero images or large photography on the homepage
- Gradient backgrounds
- Card-based layouts with drop shadows
- "Tech bro" aesthetic (neon on dark, terminal/hacker themes)
- Any animation that exists for its own sake rather than to communicate state change
- Emoji anywhere in the design
- Decorative illustrations
- Em dashes in any copy or placeholder text

## Technical Notes for Handoff to Development

The design should assume this will be built as a static site (likely Next.js or Astro) with markdown-based blog posts. Design decisions should be implementable with standard HTML/CSS and minimal JavaScript. Nothing in the design should require a CMS, database, or third-party widget in v1.

File deliverables from Claude Design should include:
- Homepage layout
- Projects page layout
- Blog index layout
- Blog post detail layout
- About page layout
- Mobile responsive versions of each
- Typography scale and spacing system
- Color tokens (with specific hex values for the celadon accent, near-black, and off-white)

## Tone Summary

If this site were a person in a room, it would be the one who doesn't speak first but says something worth remembering when they do. Confident without performing confidence. Clean without being cold. Personal without being confessional. The craftsmanship is in what you choose to leave out.

Like sơn mài: the beauty is in the layers you built but cannot see.
