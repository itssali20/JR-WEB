require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ================= PACKAGES (from jrdigitalmedia pricing) =================
const packages = [
  // ---------- WEBSITE DESIGN ----------
  { id: 'web-starter', category: 'website', name: 'Starter Website', price: 999, currency: 'AED',
    tagline: 'Perfect for small businesses and personal brands',
    features: ['3–5 pages', 'Mobile responsive design', 'Basic SEO setup', 'WhatsApp integration', 'Delivery: 5–7 days'] },
  { id: 'web-professional', category: 'website', name: 'Professional Website', price: 1499, currency: 'AED',
    tagline: 'Ideal for SMEs & service-based companies',
    features: ['8–12 pages', 'Custom modern UI/UX', 'Blog or services module', 'On-page SEO', 'Speed optimization', 'WhatsApp + email automation', '3 revisions', 'Delivery: 10–14 days'] },
  { id: 'web-premium', category: 'website', name: 'Premium Website', price: 2999, currency: 'AED',
    tagline: 'Enterprise-level clients & E-commerce',
    features: ['Up to 30 pages / products', 'Full custom UI/UX', 'Payment gateway integration', 'Product management system', 'Advanced SEO setup', 'Speed + security optimization', 'Social pixel integration', 'Built on AI', '1 month free support', 'Delivery: 20–30 days'] },

  // ---------- SEO SERVICES ----------
  { id: 'seo-basic', category: 'seo', name: 'Basic SEO', price: 699, currency: 'AED',
    tagline: 'Best for startup websites',
    features: ['Keyword setup', '5 pages on-page SEO', 'Basic backlinks', 'Monthly report'] },
  { id: 'seo-professional', category: 'seo', name: 'Professional SEO', price: 999, currency: 'AED',
    tagline: 'Ideal for service-based businesses',
    features: ['Full site audit', 'Advanced keyword targeting', 'On-page + technical SEO', '10–12 backlinks/month', 'Content optimisation', 'Reporting + recommendations'] },
  { id: 'seo-advanced', category: 'seo', name: 'Advanced SEO + Content', price: 1999, currency: 'AED',
    tagline: 'Designed for competitive industries',
    features: ['SEO strategy', 'Monthly blog writing (4–6 articles)', 'High-quality backlinks', 'Technical overhaul', 'Keyword cluster ranking', 'Competitor tracking', 'Monthly performance meeting'] },

  // ---------- SOCIAL MEDIA ----------
  { id: 'social-starter', category: 'social', name: 'Starter Social', price: 999, currency: 'AED',
    tagline: 'Best for small businesses',
    features: ['8 posts / month', 'Caption writing', 'Hashtag research', 'Basic reporting'] },
  { id: 'social-growth', category: 'social', name: 'Growth Social', price: 1999, currency: 'AED',
    tagline: 'Most popular package',
    features: ['12–16 posts / month', '4 reels', 'Copywriting', 'Community management', 'Paid ads setup (budget not included)', 'Monthly report'] },
  { id: 'social-premium', category: 'social', name: 'Premium Social', price: 2999, currency: 'AED',
    tagline: 'Ideal for brands that want growth',
    features: ['20+ posts / month', '8 reels', 'Photographer visit (1/month)', 'Strategy + content planning', 'Community management', 'Ad optimisation', 'Detailed reporting'] },

  // ---------- CGI & 3D ----------
  { id: 'cgi-basic', category: 'cgi', name: 'Basic 3D / CGI', price: 999, currency: 'AED',
    tagline: 'Best for simple visuals & small businesses',
    features: ['1 simple 3D model (product or object)', 'Basic textures & lighting', 'Standard rendering', '1 revision', 'Delivery: 5–7 days'] },
  { id: 'cgi-professional', category: 'cgi', name: 'Professional CGI', price: 2499, currency: 'AED',
    tagline: 'Ideal for ads, product showcases & presentations',
    features: ['Up to 3 custom 3D models', 'Advanced textures & lighting', 'Cinematic rendering', '15–30 sec animation', 'Motion graphics overlay', '2 revisions', 'Delivery: 7–10 days'] },
  { id: 'cgi-premium', category: 'cgi', name: 'Premium 3D / CGI Studio', price: 4999, currency: 'AED',
    tagline: 'Best for high-end ads, architectural & commercial work',
    features: ['Full 3D environment or scene', 'Realistic materials & lighting', 'Complex animations (30–60 sec)', 'Camera movements', 'Sound FX + background music', 'Priority rendering', '3 revisions', 'Delivery: 10–20 days'] },

  // ---------- ERP SYSTEMS ----------
  { id: 'erp-lite', category: 'erp', name: 'ERP Lite', price: 2999, currency: 'AED',
    tagline: 'Perfect for small businesses needing basic automation',
    features: ['Inventory management', 'Customer & supplier database', 'Invoicing & billing', 'Dashboard overview', 'User roles & permissions', 'Basic reporting', 'Cloud hosting included', '1 training session', '1 month free support', 'Delivery: 7–10 days'] },
  { id: 'erp-business', category: 'erp', name: 'ERP Business', price: 6999, currency: 'AED',
    tagline: 'Best for SMEs wanting strong automation',
    features: ['Accounting & finance module', 'HRM (employee management)', 'Sales & CRM', 'Purchase management', 'Advanced reports & analytics', 'Workflow automation', 'Multiple user access', 'Data import from previous system', '3 training sessions', '2 months support', 'Delivery: 10–15 days'] },
  { id: 'erp-enterprise', category: 'erp', name: 'ERP Enterprise', price: 14999, currency: 'AED',
    tagline: 'Ideal for enterprises & multi-branch companies',
    features: ['Fully customizable modules', 'Multi-branch / multi-warehouse support', 'Attendance & payroll integration', 'Vendor management', 'POS system (optional)', 'API integration (Website / App / CRM)', 'Automated email & WhatsApp alerts', 'Dedicated account manager', 'Free priority support (90 days)', 'Delivery: 20–30 days'] },

  // ---------- CREATIVE DESIGN ----------
  { id: 'brand-basic', category: 'creative', name: 'Basic Branding Kit', price: 499, currency: 'AED',
    tagline: 'Ideal for startups',
    features: ['Logo (3 concepts)', 'Color palette', 'Typography guidelines'] },
  { id: 'brand-professional', category: 'creative', name: 'Professional Brand Identity', price: 1299, currency: 'AED',
    tagline: 'Includes everything in Basic +',
    features: ['Brand guidelines (PDF)', 'Business card design', 'Letterhead', 'Social media kit'] },
  { id: 'brand-premium', category: 'creative', name: 'Premium Brand Identity + Strategy', price: 2999, currency: 'AED',
    tagline: 'Best for growing businesses',
    features: ['Complete brand identity', 'Marketing direction', 'Brand tone & messaging', 'Social templates (6–10)', 'Launch graphics'] },
];

// ================= CHAT FLOW (decision tree, SIA-style) =================
const WHATSAPP_NUMBER = '+971527404854'; // <-- PUT CEO's WhatsApp number here (no + sign)

const chatFlow = {
  start: {
    message: "Hi! 👋 I'm JR Assistant. I'll help you find the perfect digital solution in under a minute. What are you looking for?",
    options: [
      { label: '🌐 Website Design', next: 'website_type' },
      { label: '📈 SEO Services', next: 'seo_level' },
      { label: '📱 Social Media', next: 'social_level' },
      { label: '🎬 CGI & 3D', next: 'cgi_level' },
      { label: '🏢 ERP Systems', next: 'erp_size' },
      { label: '🎨 Branding & Design', next: 'brand_level' },
      { label: '💬 Something else', next: 'contact_human' },
    ],
  },

  website_type: {
    message: 'Great choice! What type of website do you need?',
    options: [
      { label: 'Small business / personal site', showPackages: ['web-starter', 'web-professional'] },
      { label: 'Company website (8+ pages)', showPackages: ['web-professional', 'web-premium'] },
      { label: 'E-commerce / online store', showPackages: ['web-premium'] },
      { label: 'Not sure yet 🤔', showPackages: ['web-starter', 'web-professional', 'web-premium'] },
    ],
  },

  seo_level: {
    message: 'How established is your website right now?',
    options: [
      { label: 'New / startup website', showPackages: ['seo-basic', 'seo-professional'] },
      { label: 'Established, want more traffic', showPackages: ['seo-professional', 'seo-advanced'] },
      { label: 'Competitive industry, need content too', showPackages: ['seo-advanced'] },
    ],
  },

  social_level: {
    message: 'How active do you want your social media to be?',
    options: [
      { label: 'Just consistent presence', showPackages: ['social-starter'] },
      { label: 'Growth: posts + reels + ads', showPackages: ['social-growth'] },
      { label: 'Full management + photography', showPackages: ['social-premium'] },
      { label: 'Show me everything', showPackages: ['social-starter', 'social-growth', 'social-premium'] },
    ],
  },

  cgi_level: {
    message: 'What kind of 3D / CGI work do you need?',
    options: [
      { label: 'Single product model', showPackages: ['cgi-basic'] },
      { label: 'Product showcase / ad animation', showPackages: ['cgi-professional'] },
      { label: 'Full cinematic / architectural scene', showPackages: ['cgi-premium'] },
    ],
  },

  erp_size: {
    message: 'Roughly how big is your business operation?',
    options: [
      { label: 'Small business, basic needs', showPackages: ['erp-lite'] },
      { label: 'SME, multiple departments', showPackages: ['erp-business'] },
      { label: 'Enterprise / multi-branch', showPackages: ['erp-enterprise'] },
      { label: 'Not sure — need advice', next: 'contact_human' },
    ],
  },

  brand_level: {
    message: 'Where are you in your branding journey?',
    options: [
      { label: 'Just starting — need a logo', showPackages: ['brand-basic'] },
      { label: 'Need full brand identity', showPackages: ['brand-professional'] },
      { label: 'Brand + marketing strategy', showPackages: ['brand-premium'] },
    ],
  },

  after_packages: {
    message: 'Would you like to move forward, or do you have questions?',
    options: [
      { label: '💳 Proceed with this package', next: 'checkout' },
      { label: '📅 Book a free consultation call', next: 'contact_human' },
      { label: '💬 I have more questions', next: 'contact_human' },
      { label: '🔙 Start over', next: 'start' },
    ],
  },

  checkout: {
    message: "Awesome! 🎉 Click below to complete your payment securely, or talk to us first if you prefer.",
    options: [
      { label: '💳 Pay securely', action: 'stripe_checkout' },
      { label: '💬 Talk to us first', next: 'contact_human' },
    ],
  },

  contact_human: {
    message: "No problem! Our team is one tap away. Message us on WhatsApp and we'll reply right away. 💬",
    options: [
      { label: '💬 Chat on WhatsApp', action: 'whatsapp' },
      { label: '🔙 Back to start', next: 'start' },
    ],
  },
};

// ================= ROUTES =================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JR backend is alive' });
});

app.get('/api/packages', (req, res) => {
  const { category } = req.query;
  res.json(category ? packages.filter(p => p.category === category) : packages);
});

// Returns one step of the chat flow + any packages to display
app.get('/api/chat-flow/:stepId', (req, res) => {
  const step = chatFlow[req.params.stepId];
  if (!step) return res.status(404).json({ error: 'Step not found' });
  res.json({ ...step, whatsapp: WHATSAPP_NUMBER });
});

// Resolve package ids to full package objects (used when a chip has showPackages)
app.post('/api/packages/resolve', (req, res) => {
  const { ids } = req.body;
  res.json(packages.filter(p => ids.includes(p.id)));
});

app.listen(4000, () => console.log('Running on http://localhost:4000'));