export const SITE = {
  name: 'The Zocial Media',
  url: 'https://thezocialmedia.com', // TODO: replace with the real domain
  instagram: 'https://www.instagram.com/thezocialmediaofficial/',
  handle: '@thezocialmediaofficial',
  email: '', // TODO: add business email (contact form + footer show it when set)
  phone: '', // TODO: add business phone
  founder: 'Nevin Johnson',
};

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Cases', href: '#portfolio' },
  { label: 'Contact us', href: '#form' },
];

// Projects = the real posts/reels from the Instagram feed. Fields mirror Lumos' case rows.
export const CATEGORIES = [
  { heading: 'All', subtext: 'filter posts', value: 'all' },
  { heading: 'BR', subtext: 'branding', value: 'branding' },
  { heading: 'FE', subtext: 'festive', value: 'festive' },
  { heading: 'RE', subtext: 'reels', value: 'reels' },
  { heading: 'ST', subtext: 'strategy', value: 'strategy' },
  { heading: 'TM', subtext: 'team', value: 'team' },
];

export const PROJECTS = [
  { id: 1, name: 'We’re not an agency', img: '/ig/p1.jpg', url: 'https://www.instagram.com/p/Dcx6o6nAPOo/', tags: ['branding', 'strategy'], labels: ['branding', 'strategy', 'creatives'], format: 'Instagram post · 02.09.26', idea: 'Our positioning in one poster: a team of artists, not an agency. Strategy, storytelling, content and growth in four icons.', goal: 'Tell new followers who we are and what we stand for.' },
  { id: 2, name: 'From idea to attention', img: '/ig/p2.jpg', url: 'https://www.instagram.com/p/Dcx69r9AbTS/', tags: ['strategy', 'branding'], labels: ['strategy', 'content', 'process'], format: 'Instagram post · 02.09.26', idea: 'The six-step creative process: strategy, concept, script, shoot, edit and distribution.', goal: 'Show how an idea becomes content that delivers.' },
  { id: 3, name: 'This is how we create impact', img: '/ig/p3.jpg', url: 'https://www.instagram.com/p/Dcx7PxGgSYn/', tags: ['strategy', 'branding'], labels: ['strategy', 'production', 'results'], format: 'Instagram post · 02.09.26', idea: 'Strategy, creative, production and results: the four things we plan around.', goal: 'Make the value of a full content system easy to see.' },
  { id: 4, name: 'Behind the scenes', img: '/ig/r1.jpg', url: 'https://www.instagram.com/reel/DeeVKMMA6Kh/', tags: ['reels', 'team'], labels: ['reel', 'shoot', 'edit'], format: 'Instagram reel · 14.10.26', idea: 'A candid look at the crew at work.', goal: 'Build trust by showing the people behind the content.' },
  { id: 5, name: 'Location story', img: '/ig/r2.jpg', url: 'https://www.instagram.com/reel/DebFCm8AK3L/', tags: ['reels'], labels: ['reel', 'shoot'], format: 'Instagram reel · 12.10.26', idea: 'A lifestyle location shoot told as a short vertical story.', goal: 'Show what a shoot day looks like for hospitality and lifestyle brands.' },
  { id: 6, name: 'Garba night campaign', img: '/ig/p4.jpg', url: 'https://www.instagram.com/p/DeZU24QgK-g/', tags: ['festive', 'strategy', 'branding'], labels: ['social media', 'meta ads', 'branding', 'print'], format: 'Instagram carousel · 12.10.26', idea: 'A successful Garba starts before the first dandiya: social, meta ads, branding, print, reels and promotions working as one.', goal: 'Show how events get a crowd through a planned campaign.' },
  { id: 7, name: 'Reel edit', img: '/ig/r3.jpg', url: 'https://www.instagram.com/reel/DeT0-vXIkFi/', tags: ['reels'], labels: ['reel', 'edit'], format: 'Instagram reel · 10.10.26', idea: 'A fast-cut vertical edit built for retention.', goal: 'Hold attention from the first second to the last.' },
  { id: 8, name: 'Ganesh Chaturthi', img: '/ig/p5.jpg', url: 'https://www.instagram.com/p/DdQo8vhgdSH/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 14.09.26', idea: 'A festive creative where the creative tools of our trade form the deity.', goal: 'Stay present on festive days with on-brand design.' },
  { id: 9, name: 'Janmashtami', img: '/ig/p6.jpg', url: 'https://www.instagram.com/p/Dc23JFEgeCU/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 04.09.26', idea: 'A Janmashtami greeting designed to sit natively in the feed.', goal: 'Keep the calendar active with polished festive content.' },
  { id: 10, name: 'We’re hiring: video editor', img: '/ig/r4.jpg', url: 'https://www.instagram.com/reel/DckyTm7oerh/', tags: ['team', 'reels'], labels: ['team', 'reel', 'hiring'], format: 'Instagram reel · 28.08.26', idea: 'An open call for a video editor to join the crew.', goal: 'Attract creative people who care about craft.' },
  { id: 11, name: 'Raksha Bandhan', img: '/ig/p7.jpg', url: 'https://www.instagram.com/p/DckeFLjoo5m/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 27.08.26', idea: 'A warm festive creative for Raksha Bandhan.', goal: 'Make every festive day feel considered.' },
  { id: 12, name: 'Independence Day', img: '/ig/p8.jpg', url: 'https://www.instagram.com/p/DcDiodygnaA/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 15.08.26', idea: 'An Independence Day creative in the Zocial look.', goal: 'Show up on national moments with a strong visual.' },
];

// Draggable cards in "why we are loved". Photo cards use real feed images; text cards carry the values from the posts.
export const CARDS = [
  { type: 'photo', img: '/ig/p1.jpg', title: 'not an agency', date: '02.09.26', alt: 'We’re not an agency Instagram poster' },
  { type: 'text', tone: 'red', title: 'We plan with purpose', text: 'Strategy is our starting point. Every post has a job before the camera rolls.' },
  { type: 'photo', img: '/ig/p3.jpg', title: 'create impact', date: '02.09.26', alt: 'This is how we create impact poster' },
  { type: 'text', tone: 'blue', title: 'We create stories that connect', text: 'We turn ideas into stories people want to watch, share and remember.' },
  { type: 'photo', img: '/ig/p2.jpg', title: 'the process', date: '02.09.26', alt: 'From idea to attention process poster' },
  { type: 'text', tone: 'red', title: 'We shoot. We set. We capture.', text: 'In-house shoots, scripting and editing so content looks like you, not a template.' },
  { type: 'photo', img: '/ig/p4.jpg', title: 'garba night', date: '12.10.26', alt: 'Garba night campaign creative' },
  { type: 'text', tone: 'blue', title: 'We focus on real business results', text: 'Reach is nice. Enquiries and loyal customers are better. That is what we measure.' },
];

export const STATS = [
  { target: '616+', label: '[instagram community]' },
  { target: '6', label: '[steps in our process]' },
  { target: '100%', label: '[personalised work]' },
];

// Replace with real testimonials when the client has them. Until then this section shows the feed.
export const STACK = [
  { img: '/ig/p1.jpg', name: 'Brand', role: 'positioning', title: 'We’re not an agency. We’re a team of artists.', text: 'Our manifesto in a single poster: creative strategy, storytelling and results for businesses that want to grow online.', tags: ['branding', 'strategy'], url: 'https://www.instagram.com/p/Dcx6o6nAPOo/' },
  { img: '/ig/p2.jpg', name: 'Process', role: 'how we work', title: 'From idea to attention.', text: 'Strategy, concept, script, shoot, edit, distribution. Strategy is our starting point. Results are our finish line.', tags: ['strategy', 'content'], url: 'https://www.instagram.com/p/Dcx69r9AbTS/' },
  { img: '/ig/p4.jpg', name: 'Campaign', role: 'event promotion', title: 'A successful garba starts before the first dandiya.', text: 'Social media, meta ads, branding, print, reels and promotions: a crowd comes through planning, not luck.', tags: ['meta ads', 'branding'], url: 'https://www.instagram.com/p/DeZU24QgK-g/' },
  { img: '/ig/p3.jpg', name: 'Impact', role: 'what we deliver', title: 'Ideas. Strategy. Content. Real impact.', text: 'Strategy, creative, production and results: four things we plan every project around.', tags: ['production', 'results'], url: 'https://www.instagram.com/p/Dcx7PxGgSYn/' },
];

export const SERVICES = [
  { id: 'shoot', title: 'Shoot', tone: 'black', text: ['Product, brand and lifestyle shoots,', 'reels and interviews with crew and', 'equipment included'] },
  { id: 'content', title: 'Content', tone: 'blue', text: ['Posts, carousels, festive creatives,', 'scripts and captions that carry your voice'] },
  { id: 'edit', title: 'Edit', tone: 'black', text: ['Reels and video edited with rhythm,', 'sound and motion graphics,', 'ready for every platform'] },
  { id: 'strategy', title: 'Strategy', tone: 'red', text: ['Creative strategy, social media', 'marketing, meta ads and promotions', 'built on real results'] },
];

export const FAQ = [
  { q: 'What does The Zocial Media do?', a: 'We shoot, write, edit and plan social media content: strategy, concept, scripting, video shoots, reels editing, creatives and distribution.' },
  { q: 'Do you only make Instagram reels?', a: 'No. We build full content systems including posts, carousels, reels, festive creatives, branding, printing material, meta ads and strategic promotions.' },
  { q: 'How does your process work?', a: 'Six steps: strategy, concept, script, shoot, edit and distribution. Strategy is our starting point and results are our finish line.' },
  { q: 'How do I start a project with you?', a: 'Fill in the form on this page or message us on Instagram at @thezocialmediaofficial and we will get back to you with a plan.' },
];
