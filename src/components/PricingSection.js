import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight, ChevronLeft, ChevronRight, X, Rocket, Lock, CheckCircle, Package } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { detectUserCountry } from "../utils/geolocation";

// ─── Stripe price IDs — replace with your real ones ───────────────────────────
const STRIPE_PAYMENT_LINKS = {
  // map your service/package IDs to Stripe Payment Link URLs
  // e.g. "starter-website": "https://buy.stripe.com/xxxx"
};
const STRIPE_DEFAULT_URL = "https://buy.stripe.com/your_default_link"; // fallback
// ──────────────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  "Email / SMS Marketing",
  "Facebook / Instagram Ads",
  "Google / Youtube Ads",
  "Amazon Growth",
  "TikTok Shops",
  "Lead Generation",
];

const BUSINESS_TYPES = [
  "E-commerce",
  "Real Estate",
  "Professional Services",
  "Healthcare",
  "Hospitality & F&B",
  "Education",
  "Technology",
  "Other",
];

const REVENUE_RANGES = [
  "Less than AED 10K",
  "AED 10K – 50K",
  "AED 50K – 200K",
  "AED 200K – 500K",
  "AED 500K+",
];

// ─── Project Application Modal ────────────────────────────────────────────────
function ProjectModal({ plan, displayPrice, onClose }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", website: "", bizType: "", instagram: "",
    revenue: "", referral: "", currentMarketing: "", consent: false,
  });
  const [solutions, setSolutions] = useState([]);
  const [step, setStep] = useState("form"); // "form" | "success"
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleSolution = (s) =>
    setSolutions((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.consent) e.consent = "Please agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // Save to Firestore dashboard collection
      await addDoc(collection(db, "projectApplications"), {
        plan: plan?.title || "",
        planId: plan?.id || "",
        price: displayPrice || plan?.price || "",
        ...form,
        solutions,
        status: "new",
        source: "pricing_page",
        createdAt: serverTimestamp(),
      });

      setStep("success");

      // Redirect to Stripe after 2s
      setTimeout(() => {
        const stripeUrl = STRIPE_PAYMENT_LINKS[plan?.id] || STRIPE_DEFAULT_URL;
        window.location.href = stripeUrl;
      }, 2000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const inputCls = (key) =>
    `w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[key] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">

        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-5 border-b border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Package size={22} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Project Application</h2>
          <p className="text-sm text-gray-500 mt-1">Tell us about your business goals</p>
          {plan && (
            <span className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              {plan.title} — {displayPrice || plan.price}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex-1">
          {step === "success" ? (
            <div className="text-center py-8">
              <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Details received!</h3>
              <p className="text-gray-500 text-sm mb-4">
                Your application has been saved to our dashboard. Redirecting you to secure checkout…
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3">
                <Lock size={13} />
                Secure checkout via Stripe — {displayPrice || plan?.price}
              </div>
            </div>
          ) : (
            <>
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    First Name *
                  </label>
                  <input className={inputCls("firstName")} placeholder="John" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Last Name *
                  </label>
                  <input className={inputCls("lastName")} placeholder="Smith" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label>
                <input className={inputCls("email")} type="email" placeholder="hello@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone Number *</label>
                <input className={inputCls("phone")} type="tel" placeholder="+971 50 000 0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Company + Website */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Company</label>
                  <input className={inputCls("company")} placeholder="Your company" value={form.company} onChange={(e) => set("company", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website</label>
                  <input className={inputCls("website")} placeholder="https://" value={form.website} onChange={(e) => set("website", e.target.value)} />
                </div>
              </div>

              {/* Business Type */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What kind of business?</label>
                <select className={inputCls("bizType")} value={form.bizType} onChange={(e) => set("bizType", e.target.value)}>
                  <option value="">Type of business</option>
                  {BUSINESS_TYPES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>

              {/* Instagram */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Business Instagram</label>
                <input className={inputCls("instagram")} placeholder="@yourhandle" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} />
              </div>

              {/* Solutions */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  What solutions are you interested in?{" "}
                  <span className="normal-case font-normal tracking-normal text-gray-400">Select all that apply</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SOLUTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSolution(s)}
                      className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border text-sm transition ${
                        solutions.includes(s)
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Check size={14} className={solutions.includes(s) ? "text-blue-600" : "text-gray-300"} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Monthly Revenue</label>
                <select className={inputCls("revenue")} value={form.revenue} onChange={(e) => set("revenue", e.target.value)}>
                  <option value="">Select range</option>
                  {REVENUE_RANGES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>

              {/* Referral */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">How did you hear about us?</label>
                <input className={inputCls("referral")} placeholder="Google, Instagram, referral…" value={form.referral} onChange={(e) => set("referral", e.target.value)} />
              </div>

              {/* Current Marketing */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What marketing are you currently doing?</label>
                <textarea
                  className={`${inputCls("currentMarketing")} resize-none`}
                  rows={3}
                  placeholder="Tell us what's working and what isn't…"
                  value={form.currentMarketing}
                  onChange={(e) => set("currentMarketing", e.target.value)}
                />
              </div>

              {/* Consent */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5 text-xs text-gray-500 leading-relaxed">
                By submitting this form, you agree to be contacted by our team regarding your project. Your information will not be shared with third parties.
                <label className="flex items-start gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 accent-blue-600"
                  />
                  <span className="text-gray-700 text-sm font-medium">I agree to receive messages</span>
                </label>
                {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <Rocket size={18} /> Launch Your Project
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Pricing Section ─────────────────────────────────────────────────────
export default function PricingSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("web");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [services, setServices] = useState([]);
  const [userCountry, setUserCountry] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [loading, setLoading] = useState(true);
  const [modalPlan, setModalPlan] = useState(null); // null = closed

  const filtersContainerRef = useRef(null);
  const activeTabRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      try { setUserCountry(await detectUserCountry()); } catch {}
    };
    getCountry();
  }, []);

  const getDisplayPrice = (item) => {
    if (userCountry && item.regionalPrices?.length) {
      const r = item.regionalPrices.find((p) => p.location.toUpperCase() === userCountry.toUpperCase());
      if (r) return `${r.currency} ${r.price}`;
    }
    return item.price;
  };

  const filters = [
    { id: "web", label: t("web") },
    { id: "seo", label: t("seo") },
    { id: "social", label: t("social") },
    { id: "cgi", label: t("cgi") },
    { id: "erp", label: t("erp") },
    { id: "creative", label: t("creative") },
  ];

  useEffect(() => {
    const q = query(collection(db, "pricingServices"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setServices(data);
      setFilteredServices(data.filter((s) => s.category === activeFilter));
      setLoading(false);
    });
    return unsub;
  }, []);

  const checkScroll = () => {
    const c = filtersContainerRef.current;
    if (c) {
      setCanScrollLeft(c.scrollLeft > 0);
      setCanScrollRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 1);
    }
  };

  useEffect(() => {
    const c = filtersContainerRef.current;
    if (c) { c.addEventListener("scroll", checkScroll); checkScroll(); }
    return () => c?.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (activeTabRef.current) {
      setSliderStyle({ left: activeTabRef.current.offsetLeft, width: activeTabRef.current.offsetWidth });
    }
  }, [activeFilter, filteredServices]);

  const handleFilterClick = (id) => {
    if (id === activeFilter || isAnimating) return;
    setIsAnimating(true);
    setActiveFilter(id);
    setTimeout(() => {
      setFilteredServices(services.filter((s) => s.category === id));
      setIsAnimating(false);
    }, 400);
  };

  if (loading) {
    return (
      <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((n) => <div key={n} className="bg-gray-200 rounded-3xl h-96" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-2 lg:py-20 px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {t("packages_heading")}
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-2">
          <div className="relative group">
            <button
              onClick={() => filtersContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
              className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg transition-all hover:scale-110 ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              onClick={() => filtersContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
              className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg transition-all hover:scale-110 ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 relative">
              <div
                ref={filtersContainerRef}
                className="flex items-center overflow-x-auto gap-1 relative"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                <div
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-500 ease-out shadow-lg z-0"
                  style={{ left: sliderStyle.left, width: sliderStyle.width }}
                />
                {filters.map((f) => (
                  <button
                    key={f.id}
                    ref={activeFilter === f.id ? activeTabRef : null}
                    onClick={() => handleFilterClick(f.id)}
                    disabled={isAnimating}
                    className={`relative flex-shrink-0 lg:flex-1 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 z-10 whitespace-nowrap ${
                      activeFilter === f.id ? "text-white" : "text-gray-600 hover:text-gray-900"
                    } ${isAnimating ? "opacity-70" : "opacity-100"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-sky-200/40 via-blue-400/30 to-blue-800/20 blur-2xl rounded-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500 ${isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    {service.popular && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {t("pricing.popular_badge")}
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{getDisplayPrice(service)}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="p-6 md:p-8 flex-1">
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <Check size={16} className="text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto px-6 md:px-8 pb-6 md:pb-8">
                  <button
                    type="button"
                    onClick={() => setModalPlan({ ...service, displayPrice: getDisplayPrice(service) })}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    {t("get_started")} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && !isAnimating && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">{t("no_services_found")}</h3>
              <p className="text-gray-500 max-w-md mx-auto">{t("no_services_desc")}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{t("need_custom_solution")}</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t("custom_solution_desc")}</p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {t("get_custom_quote")}
          </Link>
        </div>
      </section>

      {/* Modal */}
      {modalPlan && (
        <ProjectModal
          plan={modalPlan}
          displayPrice={modalPlan.displayPrice}
          onClose={() => setModalPlan(null)}
        />
      )}
    </>
  );
}
