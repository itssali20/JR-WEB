


import { useState, useEffect, useRef } from "react";
import "./JRChatbot.css";

// ─── Data ────────────────────────────────────────────────────────────────────

const WHATSAPP = "971527404854";

const packages = {
  "web-starter": { name: "Starter Website", price: 999, tagline: "Perfect for small businesses & personal brands", features: ["3–5 pages", "Mobile responsive design", "Basic SEO setup", "WhatsApp integration", "Delivery: 5–7 days"] },
  "web-professional": { name: "Professional Website", price: 1499, tagline: "Ideal for SMEs & service-based companies", features: ["8–12 pages", "Custom modern UI/UX", "Blog or services module", "On-page SEO", "3 revisions", "Delivery: 10–14 days"], featured: true },
  "web-premium": { name: "Premium Website", price: 2999, tagline: "Enterprise-level clients & E-commerce", features: ["Up to 30 pages / products", "Full custom UI/UX", "Payment gateway integration", "Advanced SEO setup", "1 month free support", "Delivery: 20–30 days"] },
  "seo-basic": { name: "Basic SEO", price: 699, tagline: "Best for startup websites", features: ["Keyword setup", "5 pages on-page SEO", "Basic backlinks", "Monthly report"] },
  "seo-professional": { name: "Professional SEO", price: 999, tagline: "Ideal for service-based businesses", features: ["Full site audit", "Advanced keyword targeting", "On-page + technical SEO", "10–12 backlinks/month"], featured: true },
  "seo-advanced": { name: "Advanced SEO + Content", price: 1999, tagline: "Designed for competitive industries", features: ["SEO strategy", "Monthly blog writing (4–6 articles)", "High-quality backlinks", "Competitor tracking"] },
  "social-starter": { name: "Starter Social", price: 999, tagline: "Best for small businesses", features: ["8 posts / month", "Caption writing", "Hashtag research", "Basic reporting"] },
  "social-growth": { name: "Growth Social", price: 1999, tagline: "Most popular package", features: ["12–16 posts / month", "4 reels", "Copywriting", "Community management", "Paid ads setup"], featured: true },
  "social-premium": { name: "Premium Social", price: 2999, tagline: "Ideal for brands that want growth", features: ["20+ posts / month", "8 reels", "Photographer visit (1/month)", "Strategy + content planning"] },
  "cgi-basic": { name: "Basic 3D / CGI", price: 999, tagline: "Best for simple visuals", features: ["1 simple 3D model", "Basic textures & lighting", "Standard rendering", "1 revision", "Delivery: 5–7 days"] },
  "cgi-professional": { name: "Professional CGI", price: 2499, tagline: "Ideal for ads & product showcases", features: ["Up to 3 custom 3D models", "Advanced textures & lighting", "15–30 sec animation", "2 revisions"], featured: true },
  "cgi-premium": { name: "Premium CGI Studio", price: 4999, tagline: "Best for high-end ads & architectural work", features: ["Full 3D environment", "Complex animations (30–60 sec)", "Sound FX + music", "Priority rendering"] },
  "erp-lite": { name: "ERP Lite", price: 2999, tagline: "Perfect for small businesses", features: ["Inventory management", "Invoicing & billing", "Dashboard overview", "1 training session", "1 month free support"] },
  "erp-business": { name: "ERP Business", price: 6999, tagline: "Best for SMEs wanting automation", features: ["Accounting & finance module", "HRM (employee management)", "Sales & CRM", "3 training sessions", "2 months support"], featured: true },
  "erp-enterprise": { name: "ERP Enterprise", price: 14999, tagline: "Ideal for enterprises & multi-branch companies", features: ["Fully customizable modules", "Multi-branch support", "API integration", "Dedicated account manager", "90-day priority support"] },
  "brand-basic": { name: "Basic Branding Kit", price: 499, tagline: "Ideal for startups", features: ["Logo (3 concepts)", "Color palette", "Typography guidelines"] },
  "brand-professional": { name: "Professional Brand Identity", price: 1299, tagline: "Includes everything in Basic", features: ["Brand guidelines PDF", "Business card design", "Letterhead", "Social media kit"], featured: true },
  "brand-premium": { name: "Premium Brand + Strategy", price: 2999, tagline: "Best for growing businesses", features: ["Complete brand identity", "Marketing direction", "Brand tone & messaging", "Social templates (6–10)"] },
};

const flow = {
  start: {
    message: "Hi there! 👋\nI'm **JR**, your digital growth assistant.\nWhat can I help you build today?",
    options: [
      { label: "🌐 Website Design", next: "website_type" },
      { label: "📈 SEO Services", next: "seo_level" },
      { label: "📱 Social Media", next: "social_level" },
      { label: "🎬 CGI & 3D", next: "cgi_level" },
      { label: "🏢 ERP Systems", next: "erp_size" },
      { label: "🎨 Branding & Design", next: "brand_level" },
      { label: "💬 Talk to the team", next: "contact_human" },
    ],
  },
  website_type: {
    message: "Great choice! What type of website do you need?",
    options: [
      { label: "Small business / personal site", showPackages: ["web-starter", "web-professional"] },
      { label: "Company website (8+ pages)", showPackages: ["web-professional", "web-premium"] },
      { label: "E-commerce / online store", showPackages: ["web-premium"] },
      { label: "Not sure yet 🤔", showPackages: ["web-starter", "web-professional", "web-premium"] },
    ],
  },
  seo_level: {
    message: "How established is your website right now?",
    options: [
      { label: "New / startup website", showPackages: ["seo-basic", "seo-professional"] },
      { label: "Established, want more traffic", showPackages: ["seo-professional", "seo-advanced"] },
      { label: "Competitive industry, need content too", showPackages: ["seo-advanced"] },
    ],
  },
  social_level: {
    message: "How active do you want your social media to be?",
    options: [
      { label: "Just consistent presence", showPackages: ["social-starter"] },
      { label: "Growth: posts + reels + ads", showPackages: ["social-growth"] },
      { label: "Full management + photography", showPackages: ["social-premium"] },
      { label: "Show me everything", showPackages: ["social-starter", "social-growth", "social-premium"] },
    ],
  },
  cgi_level: {
    message: "What kind of 3D / CGI work do you need?",
    options: [
      { label: "Single product model", showPackages: ["cgi-basic"] },
      { label: "Product showcase / ad animation", showPackages: ["cgi-professional"] },
      { label: "Full cinematic / architectural scene", showPackages: ["cgi-premium"] },
    ],
  },
  erp_size: {
    message: "Roughly how big is your business operation?",
    options: [
      { label: "Small business, basic needs", showPackages: ["erp-lite"] },
      { label: "SME, multiple departments", showPackages: ["erp-business"] },
      { label: "Enterprise / multi-branch", showPackages: ["erp-enterprise"] },
      { label: "Not sure — need advice", next: "contact_human" },
    ],
  },
  brand_level: {
    message: "Where are you in your branding journey?",
    options: [
      { label: "Just starting — need a logo", showPackages: ["brand-basic"] },
      { label: "Need full brand identity", showPackages: ["brand-professional"] },
      { label: "Brand + marketing strategy", showPackages: ["brand-premium"] },
    ],
  },
  contact_human: {
    message: "Our team is standing by. Tap below to connect on WhatsApp — we reply in minutes. 🚀",
    whatsapp: true,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="jr-msg-row jr-bot">
      <div className="jr-avatar-sm">JR</div>
      <div className="jr-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function BotMessage({ text }) {
  const formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
  return (
    <div className="jr-msg-row jr-bot">
      <div className="jr-avatar-sm">JR</div>
      <div className="jr-bubble jr-bubble-bot" dangerouslySetInnerHTML={{ __html: formatted }} />
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="jr-msg-row jr-user">
      <div className="jr-bubble jr-bubble-user">{text}</div>
    </div>
  );
}

function Chips({ options, onSelect, disabled }) {
  return (
    <div className="jr-chips">
      {options.map((opt) => (
        <button
          key={opt.label}
          className={`jr-chip ${disabled ? "jr-chip-disabled" : ""}`}
          onClick={() => !disabled && onSelect(opt)}
          disabled={disabled}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function PackageCard({ pkg, id, onSelect }) {
  return (
    <div className={`jr-pkg-card ${pkg.featured ? "jr-pkg-featured" : ""}`}>
      {pkg.featured && <div className="jr-pkg-badge">Most popular</div>}
      <div className="jr-pkg-header">
        <p className="jr-pkg-name">{pkg.name}</p>
        <p className="jr-pkg-tagline">{pkg.tagline}</p>
      </div>
      <div className="jr-pkg-price">
        <span className="jr-price-currency">AED</span>
        <span className="jr-price-amount">{pkg.price.toLocaleString()}</span>
      </div>
      <ul className="jr-pkg-features">
        {pkg.features.map((f) => (
          <li key={f}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="6.5" fill="#00c2a2" fillOpacity="0.15" />
              <path d="M4 6.5l1.8 1.8L9 4.5" stroke="#00c2a2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button className="jr-pkg-select" onClick={() => onSelect(id, pkg.name, pkg.price)}>
        Select package →
      </button>
    </div>
  );
}

function WhatsAppBlock({ onRestart }) {
  return (
    <div className="jr-wa-block">
      <a
        className="jr-wa-btn"
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.55 4.093 1.512 5.815L0 24l6.335-1.493C8.053 23.467 9.993 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.897 0-3.673-.512-5.193-1.404l-.372-.22-3.762.887.904-3.661-.242-.381A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
        </svg>
        Chat on WhatsApp
      </a>
      <button className="jr-restart-btn" onClick={onRestart}>
        ← Start over
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function JRChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chipsData, setChipsData] = useState(null);
  const [chipsDisabled, setChipsDisabled] = useState(false);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bodyRef = useRef(null);
  const hasStarted = useRef(false);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 50);
  };

  const addBotMsg = (text) =>
    new Promise((res) => {
      setTyping(true);
      scrollToBottom();
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { type: "bot", text }]);
        scrollToBottom();
        res();
      }, 750);
    });

  const addUserMsg = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
    scrollToBottom();
  };

  const showStep = async (stepId) => {
    const step = flow[stepId];
    if (!step) return;
    await addBotMsg(step.message);
    if (step.whatsapp) {
      setMessages((prev) => [...prev, { type: "whatsapp" }]);
      scrollToBottom();
      return;
    }
    if (step.options) setChipsData(step.options);
  };

  const handleChip = async (opt) => {
    setChipsDisabled(true);
    addUserMsg(opt.label.replace(/^[^\w]+/, "").trim());
    setChipsData(null);
    setChipsDisabled(false);
    if (opt.next) {
      await showStep(opt.next);
    } else if (opt.showPackages) {
      await addBotMsg("Here are our recommended packages for you 👇");
      const pkgs = opt.showPackages.map((id) => ({ id, ...packages[id] })).filter(Boolean);
      setMessages((prev) => [...prev, { type: "packages", pkgs }]);
      scrollToBottom();
      setTimeout(async () => {
        await addBotMsg("Would you like to move forward, or have questions?");
        setChipsData([
          { label: "📅 Book a free consultation", next: "contact_human" },
          { label: "💬 I have questions", next: "contact_human" },
          { label: "🔙 Start over", next: "start" },
        ]);
      }, 400);
    }
  };

  const handlePackageSelect = async (id, name, price) => {
    addUserMsg(`I'm interested in ${name} — AED ${price.toLocaleString()}`);
    await addBotMsg(`Great choice! 🎉 Let's get the **${name}** locked in for you.\n\nTap below to connect with our team on WhatsApp — we'll get everything started right away.`);
    setMessages((prev) => [...prev, { type: "whatsapp" }]);
    scrollToBottom();
  };

  const handleRestart = () => {
    setMessages([]);
    setChipsData(null);
    showStep("start");
  };

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
    if (!hasStarted.current) {
      hasStarted.current = true;
      setTimeout(() => showStep("start"), 400);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <>
      {/* Floating tab button */}
      {!open && (
        <button className="jr-tab-btn" onClick={handleOpen} aria-label="Open chat assistant">
          <span className="jr-tab-online" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Chat with JR</span>
          {unread > 0 && <span className="jr-unread">{unread}</span>}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="jr-window" role="dialog" aria-label="JR Digital Media chat assistant">
          {/* Header */}
          <div className="jr-header">
            <div className="jr-header-glow" aria-hidden="true" />
            <div className="jr-header-inner">
              <div className="jr-header-avatar">JR</div>
              <div className="jr-header-info">
                <p className="jr-header-name">JR Assistant</p>
                <span className="jr-header-status">
                  <span className="jr-header-dot" />
                  Online · Typically replies instantly
                </span>
              </div>
              <button className="jr-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Grid lines decoration */}
            <div className="jr-header-grid" aria-hidden="true" />
          </div>

          {/* Body */}
          <div className="jr-body" ref={bodyRef}>
            {messages.map((msg, i) => {
              if (msg.type === "bot") return <BotMessage key={i} text={msg.text} />;
              if (msg.type === "user") return <UserMessage key={i} text={msg.text} />;
              if (msg.type === "whatsapp") return <WhatsAppBlock key={i} onRestart={handleRestart} />;
              if (msg.type === "packages")
                return (
                  <div key={i} className="jr-packages-list">
                    {msg.pkgs.map((pkg) => (
                      <PackageCard key={pkg.id} id={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
                    ))}
                  </div>
                );
              return null;
            })}
            {typing && <TypingIndicator />}
          </div>

          {/* Chips */}
          {chipsData && (
            <div className="jr-chips-bar">
              <Chips options={chipsData} onSelect={handleChip} disabled={chipsDisabled} />
            </div>
          )}
        </div>
      )}
    </>
  );
}