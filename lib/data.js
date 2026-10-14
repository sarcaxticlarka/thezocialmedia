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
  { label: 'About', href: '/#about' },
  { label: 'Our Services', href: '/#services' },
  { label: 'Cases', href: '/#portfolio' },
  { label: 'Customers', href: '/customers' },
  { label: 'Contact us', href: '/#form' },
];

// Projects = the real posts/reels from the Instagram feed. Fields mirror Lumos' case rows.
export const CATEGORIES = [
  { heading: 'All', subtext: 'filter posts', value: 'all' },
  { heading: 'BR', subtext: 'branding', value: 'branding' },
  { heading: 'FE', subtext: 'festive', value: 'festive' },
  { heading: 'RE', subtext: 'reels', value: 'reels' },
  { heading: 'ST', subtext: 'strategy', value: 'strategy' },
];

export const PROJECTS = [
  { id: 1, name: 'We’re not an agency', img: '/ig/p1.jpg', url: 'https://www.instagram.com/p/Dcx6o6nAPOo/', tags: ['branding', 'strategy'], labels: ['branding', 'strategy', 'creatives'], format: 'Instagram post · 02.09.26', idea: 'Our positioning in one poster: a team of artists, not an agency. Strategy, storytelling, content and growth in four icons.', goal: 'Tell new followers who we are and what we stand for.' },
  { id: 2, name: 'From idea to attention', img: '/ig/p2.jpg', url: 'https://www.instagram.com/p/Dcx69r9AbTS/', tags: ['strategy', 'branding'], labels: ['strategy', 'content', 'process'], format: 'Instagram post · 02.09.26', idea: 'The six-step creative process: strategy, concept, script, shoot, edit and distribution.', goal: 'Show how an idea becomes content that delivers.' },
  { id: 3, name: 'This is how we create impact', img: '/ig/p3.jpg', url: 'https://www.instagram.com/p/Dcx7PxGgSYn/', tags: ['strategy', 'branding'], labels: ['strategy', 'production', 'results'], format: 'Instagram post · 02.09.26', idea: 'Strategy, creative, production and results: the four things we plan around.', goal: 'Make the value of a full content system easy to see.' },
  { id: 4, name: 'Behind the scenes', img: '/ig/r1.jpg', url: 'https://www.instagram.com/reel/DeeVKMMA6Kh/', tags: ['reels'], labels: ['reel', 'shoot', 'edit'], format: 'Instagram reel · 14.10.26', idea: 'A candid look at a shoot day with the crew.', goal: 'Show clients what working with us actually looks like.' },
  { id: 5, name: 'Location story', img: '/ig/r2.jpg', url: 'https://www.instagram.com/reel/DebFCm8AK3L/', tags: ['reels'], labels: ['reel', 'shoot'], format: 'Instagram reel · 12.10.26', idea: 'A lifestyle location shoot told as a short vertical story.', goal: 'Show what a shoot day looks like for hospitality and lifestyle brands.' },
  { id: 6, name: 'Garba night campaign', img: '/ig/p4.jpg', url: 'https://www.instagram.com/p/DeZU24QgK-g/', tags: ['festive', 'strategy', 'branding'], labels: ['social media', 'meta ads', 'branding', 'print'], format: 'Instagram carousel · 12.10.26', idea: 'A successful Garba starts before the first dandiya: social, meta ads, branding, print, reels and promotions working as one.', goal: 'Show how events get a crowd through a planned campaign.' },
  { id: 7, name: 'Reel edit', img: '/ig/r3.jpg', url: 'https://www.instagram.com/reel/DeT0-vXIkFi/', tags: ['reels'], labels: ['reel', 'edit'], format: 'Instagram reel · 10.10.26', idea: 'A fast-cut vertical edit built for retention.', goal: 'Hold attention from the first second to the last.' },
  { id: 8, name: 'Ganesh Chaturthi', img: '/ig/p5.jpg', url: 'https://www.instagram.com/p/DdQo8vhgdSH/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 14.09.26', idea: 'A festive creative where the creative tools of our trade form the deity.', goal: 'Stay present on festive days with on-brand design.' },
  { id: 9, name: 'Janmashtami', img: '/ig/p6.jpg', url: 'https://www.instagram.com/p/Dc23JFEgeCU/', tags: ['festive', 'branding'], labels: ['festive', 'design'], format: 'Instagram post · 04.09.26', idea: 'A Janmashtami greeting designed to sit natively in the feed.', goal: 'Keep the calendar active with polished festive content.' },
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
  { img: '/ig/p1.jpg', name: 'Brand', role: 'positioning', title: 'We’re not an agency. We’re a team of artists.', text: 'Our positioning in one poster: four icons, one promise. We plan, tell the story, make the content and chase the result.', tags: ['branding', 'strategy'], url: 'https://www.instagram.com/p/Dcx6o6nAPOo/' },
  { img: '/ig/p2.jpg', name: 'Process', role: 'how we work', title: 'From idea to attention.', text: 'Strategy, concept, script, shoot, edit, distribution. The whole route from a notebook sketch to a phone screen.', tags: ['strategy', 'content'], url: 'https://www.instagram.com/p/Dcx69r9AbTS/' },
  { img: '/ig/p4.jpg', name: 'Campaign', role: 'event promotion', title: 'A successful garba starts before the first dandiya.', text: 'Social posts, meta ads, branding, printed material, reels and promotions all pointing at one night. A full house takes planning.', tags: ['meta ads', 'branding'], url: 'https://www.instagram.com/p/DeZU24QgK-g/' },
  { img: '/ig/p3.jpg', name: 'Impact', role: 'what we deliver', title: 'Ideas. Strategy. Content. Real impact.', text: 'Strategy, creative, production, results. Every project gets planned around these four.', tags: ['production', 'results'], url: 'https://www.instagram.com/p/Dcx7PxGgSYn/' },
];

export const SERVICES = [
  { id: 'shoot', title: 'Shoot', tone: 'black', text: ['Product, brand and lifestyle shoots,', 'reels and interviews with crew and', 'equipment included'] },
  { id: 'content', title: 'Content', tone: 'blue', text: ['Posts, carousels, festive creatives,', 'scripts and captions that carry your voice'] },
  { id: 'edit', title: 'Edit', tone: 'black', text: ['Reels and video edited with rhythm,', 'sound and motion graphics,', 'ready for every platform'] },
  { id: 'strategy', title: 'Strategy', tone: 'red', text: ['Creative strategy, social media', 'marketing, meta ads and promotions', 'built on real results'] },
];

export const FAQ = [
  { q: 'What does The Zocial Media do?', a: 'We make social media content from start to finish. We plan it, script it, shoot it, edit it and help it reach people.' },
  { q: 'Do you only make Instagram reels?', a: 'No. Reels are one part. We also do posts, carousels, festive creatives, branding, print material, meta ads and event promotions.' },
  { q: 'How does a project run?', a: 'Six steps: strategy, concept, script, shoot, edit, distribution. We start by agreeing what the content has to achieve, and we check the numbers at the end.' },
  { q: 'How do I get started?', a: 'Fill in the form below or send us a DM on Instagram at @thezocialmediaofficial. Tell us about your business and we will reply with a plan.' },
];

// ---- /customers page. Segments are drawn from what the feed already shows; edit freely. ----
export const SEGMENTS = [
  { id: 'events', no: '01', name: 'Events & festivals', img: '/ig/p4.jpg', alt: 'Garba night campaign creative: social media, meta ads, branding, printing material, reels and promotions', url: 'https://www.instagram.com/p/DeZU24QgK-g/', needs: 'A full house on the night, not a quiet hall.', we: ['Social media plan', 'Meta ads', 'Branding and creatives', 'Print material', 'Reels and video editing', 'Strategic promotions'], proof: 'Our garba night campaign: one idea carried across posts, ads, print and reels.' },
  { id: 'stays', no: '02', name: 'Hospitality & lifestyle', img: '/ig/r2.jpg', alt: 'Reel shot at a villa with a pool by The Zocial Media', url: 'https://www.instagram.com/reel/DebFCm8AK3L/', needs: 'Places and experiences that look as good online as they do in person.', we: ['Location shoots', 'Vertical reels', 'Photo sets', 'Short-form edits'], proof: 'A location reel shot on site and cut for the phone screen.' },
  { id: 'festive', no: '03', name: 'Brands on the festive calendar', img: '/ig/p5.jpg', alt: 'Ganesh Chaturthi greeting creative', url: 'https://www.instagram.com/p/DdQo8vhgdSH/', needs: 'To show up on the days customers are paying attention.', we: ['Festive creatives', 'Calendar planning', 'On-brand design', 'Scheduling'], proof: 'Ganesh Chaturthi, Janmashtami, Raksha Bandhan and Independence Day creatives.' },
  { id: 'new', no: '04', name: 'Businesses finding their voice online', img: '/ig/p2.jpg', alt: 'From idea to attention: the Zocial Media creative process poster', url: 'https://www.instagram.com/p/Dcx69r9AbTS/', needs: 'A clear look, a plan and content that sounds like the owner.', we: ['Creative strategy', 'Concepts and scripts', 'Shoots', 'Edits and distribution'], proof: 'The six-step process we run for every new customer.' },
];

export const JOURNEY = [
  { no: '01', title: 'Strategy', you: 'Tell us about the business, the audience and what you want out of social media.', we: 'Agree goals, platforms and a content calendar before anything is shot.' },
  { no: '02', title: 'Concept', you: 'React to a few directions and pick the one that feels like you.', we: 'Turn the goal into ideas, hooks and a look.' },
  { no: '03', title: 'Script', you: 'Approve the scripts and captions.', we: 'Write every post and reel before the camera comes out.' },
  { no: '04', title: 'Shoot', you: 'Show us the place, the product or the people.', we: 'Bring crew, camera and lights, and direct the day.' },
  { no: '05', title: 'Edit', you: 'Review the cuts and ask for changes.', we: 'Edit reels, posts and creatives for the phone screen.' },
  { no: '06', title: 'Distribution', you: 'Watch the numbers and the enquiries come in.', we: 'Publish, promote and run meta ads where it makes sense.' },
];

export const CUSTOMER_FAQ = [
  { q: 'What do you need from me to start?', a: 'A conversation. We ask about your business, who you want to reach and what a good month looks like, then come back with a plan.' },
  { q: 'Do I have to appear on camera?', a: 'Only if it suits the content. Many projects are about a place, a product or an event, and we can shoot and edit without you in front of the lens.' },
  { q: 'Can you handle one event or one campaign?', a: 'Yes. Some customers come for a single event or festive campaign, others for ongoing content. Tell us which and we will scope it that way.' },
  { q: 'Which platforms do you work on?', a: 'Instagram first, including reels, posts and carousels, along with Facebook and YouTube. Meta ads are available when they help.' },
  { q: 'How do we talk about budget?', a: 'After the first conversation. Every business needs a different amount of content, so we quote once we know the plan.' },
];
