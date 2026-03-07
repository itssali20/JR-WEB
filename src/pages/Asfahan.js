import { useEffect } from 'react'
import './asfahan.css'

const Asfahan = () => {
  useEffect(() => {
    // Custom cursor
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0
    let rafId

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (cursor) {
        cursor.style.left = mx + 'px'
        cursor.style.top = my + 'px'
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    function tick() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
      }
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const onMouseEnter = () => {
      if (cursor) {
        cursor.style.width = '16px'
        cursor.style.height = '16px'
      }
      if (ring) {
        ring.style.width = '50px'
        ring.style.height = '50px'
      }
    }

    const onMouseLeave = () => {
      if (cursor) {
        cursor.style.width = '10px'
        cursor.style.height = '10px'
      }
      if (ring) {
        ring.style.width = '34px'
        ring.style.height = '34px'
      }
    }

    const interactables = document.querySelectorAll('a, button')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // Scroll reveal with stagger
    const revealEls = document.querySelectorAll('.reveal')
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target
          const parent = target.parentElement
          let siblings = []
          if (parent) {
            siblings = Array.from(parent.children).filter((c) =>
              c.classList.contains('reveal')
            )
          }
          const idx = siblings.indexOf(target)
          setTimeout(() => target.classList.add('visible'), Math.max(0, idx) * 90)
          revealObs.unobserve(target)
        }
      })
    }, { threshold: 0.1 })
    revealEls.forEach((el) => revealObs.observe(el))

    // Counter animation
    function countUp(el) {
      const target = parseFloat(el.dataset.target)
      const prefix = el.dataset.prefix || ''
      const suffix = el.dataset.suffix || ''
      const dur = 1600
      let start = null
      function step(ts) {
        if (!start) start = ts
        const p = Math.min((ts - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        const val = target * ease
        el.textContent =
          prefix +
          (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) +
          suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const proofObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.proof-num[data-target]').forEach(countUp)
        proofObs.disconnect()
      }
    }, { threshold: 0.5 })

    const proof = document.querySelector('.hero-proof')
    if (proof) proofObs.observe(proof)



    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
      revealObs.disconnect()
      proofObs.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[60px] py-[18px] bg-[rgba(26,29,33,0.92)] backdrop-blur-2xl border-b border-[rgba(160,170,178,0.12)]">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-transparent border-none cursor-pointer font-(--font-display) text-[22px] tracking-[1px] uppercase text-[#F2F2F2] no-underline p-0"
        >
          Asfahan<span className="text-[#E87033]">.</span>
        </button>
        <div className="flex items-center gap-8">
          <div className="flex gap-7">
            {[['why','Why Me'],['results','Results'],['services','Services'],['about','About']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="bg-transparent border-none cursor-pointer text-[#A0AAB2] text-[13px] font-normal tracking-[0.5px] uppercase transition-colors duration-200 hover:text-[#F2F2F2] p-0"
              >{label}</button>
            ))}
          </div>
          <a
            href="https://calendly.com/asfahan/the-growth-audit-free-lead-magnet" target='_blank' rel="noreferrer"
            className="bg-[#E87033] text-white no-underline px-[22px] py-[10px] rounded-[3px] font-[var(--font-display)] text-[15px] tracking-[1px] uppercase border-2 border-[#E87033] transition-all duration-200 hover:bg-transparent hover:text-[#E87033] hover:-translate-y-px"
          >
            Book Free Audit →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-[60px] pt-[130px] pb-20 relative overflow-hidden">
        <div className="hero-bg-grid" />
        <div className="absolute top-[-150px] right-[-80px] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(232,112,51,0.18)_0%,transparent_65%)] animate-orb-pulse" />
        <div className="relative z-[1] max-w-[1100px] mx-auto w-full">
          <div className="animate-fade-up-1 inline-flex items-center gap-[10px] bg-[rgba(232,112,51,0.08)] border border-[rgba(232,112,51,0.25)] text-[#E87033] text-[11px] tracking-[2.5px] uppercase font-medium px-4 py-2 rounded-[2px] mb-8">
            <span className="w-[6px] h-[6px] rounded-full bg-[#E87033] animate-blink flex-shrink-0" />
            Sales &amp; Marketing Consultant · Dubai, UAE · Available Worldwide
          </div>
          <h1 className="animate-fade-up-2 font-[var(--font-display)] text-[clamp(72px,11vw,140px)] leading-[0.92] tracking-[1px] uppercase mb-8">
            <span className="block [-webkit-text-stroke:2px_rgba(242,242,242,0.18)] text-transparent">I Help Service</span>
            <span>Businesses</span>
            <span className="text-[#E87033] block">Generate Revenue.</span>
          </h1>
          <p className="animate-fade-up-3 text-[20px] text-[#A0AAB2] leading-[1.65] max-w-[540px] mb-[52px] font-normal">
            <strong className="text-[#F2F2F2] font-medium">$30M in client revenue generated</strong> across real estate, automotive, hospitality, e-commerce and corporate services. If your business needs more leads, better systems, or faster growth — let's talk.
          </p>
          <div className="animate-fade-up-4 flex items-center gap-5 flex-wrap">
            <a
              href="https://calendly.com/asfahan/the-growth-audit-free-lead-magnet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#E87033] text-white no-underline px-9 py-[18px] rounded-[3px] font-[var(--font-display)] text-[18px] tracking-[1px] uppercase border-2 border-[#E87033] transition-all duration-200 hover:bg-transparent hover:text-[#E87033] hover:-translate-y-[3px] hover:shadow-[0_20px_50px_rgba(232,112,51,0.28)] group"
            >
              Book Your Free Growth Audit
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="transition-transform duration-200 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('results');
                if (el) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-[#A0AAB2] bg-transparent border-none cursor-pointer text-[15px] py-[18px] transition-colors duration-200 tracking-[0.5px] hover:text-[#F2F2F2]"
            >
              See real results
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
          <div className="hero-proof animate-fade-up-5 mt-20 pt-[60px] border-t border-[rgba(160,170,178,0.12)] grid grid-cols-4 gap-0">
            <div className="proof-sep pl-0 pr-6">
              <div className="proof-num font-[var(--font-display)] text-[48px] text-[#E87033] leading-none mb-2 tracking-[0]" data-target="30" data-prefix="$" data-suffix="M">$0M</div>
              <div className="text-[12px] text-[#A0AAB2] tracking-[0.5px] uppercase leading-[1.5]">In Client Revenue<br />Generated</div>
            </div>
            <div className="proof-sep px-6">
              <div className="proof-num font-[var(--font-display)] text-[48px] text-[#E87033] leading-none mb-2 tracking-[0]" data-target="10" data-suffix="+">0</div>
              <div className="text-[12px] text-[#A0AAB2] tracking-[0.5px] uppercase leading-[1.5]">Industries<br />Served</div>
            </div>
            <div className="proof-sep px-6">
              <div className="proof-num font-[var(--font-display)] text-[48px] text-[#E87033] leading-none mb-2 tracking-[0]" data-target="2000" data-suffix="+">0</div>
              <div className="text-[12px] text-[#A0AAB2] tracking-[0.5px] uppercase leading-[1.5]">Influencer Network<br />in Dubai</div>
            </div>
            <div className="px-6">
              <div className="proof-num font-[var(--font-display)] text-[48px] text-[#E87033] leading-none mb-2 tracking-[0]" data-target="6">0</div>
              <div className="text-[12px] text-[#A0AAB2] tracking-[0.5px] uppercase leading-[1.5]">Months to Scale<br />Unispire to AED 1.9M/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CRED STRIP */}
      <div className="bg-[#2C3338] border-t border-b border-[rgba(160,170,178,0.12)] py-[26px] px-[60px] flex items-center overflow-hidden">
        <span className="text-[11px] tracking-[2px] uppercase text-[rgba(160,170,178,0.5)] whitespace-nowrap mr-12 flex-shrink-0">Clients Include</span>
        <div className="overflow-hidden flex-1">
          <div className="cred-scroll animate-scroll-left">
            {[
              'Unispire Group FZ', 'JR Digital Media', 'Al Bashayar Auto Auction',
              'Aya MZ Luxury Real Estate', 'Khangi Restaurant', 'Al Hamd Motors',
              'Mumtaz Rent a Car', 'Dxb Attractions', 'Ozone International',
              'TopOneServices', 'Al Ayan Real Estate', 'Ageless Collection',
              'Unispire Group FZ', 'JR Digital Media', 'Al Bashayar Auto Auction',
              'Aya MZ Luxury Real Estate', 'Khangi Restaurant', 'Al Hamd Motors',
              'Mumtaz Rent a Car', 'Dxb Attractions', 'Ozone International',
              'TopOneServices', 'Al Ayan Real Estate', 'Ageless Collection',
            ].map((name, i) => (
              <span key={i} className="cred-item whitespace-nowrap text-[14px] text-[#A0AAB2] inline-flex items-center font-medium tracking-[0.3px]">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY */}
      <section className="bg-[#1A1D21] px-[60px] py-[100px]" id="why">
        <div className="max-w-[1100px] mx-auto">
          <p className="eyebrow-line reveal visible text-[11px] tracking-[3px] uppercase text-[#E87033] font-medium mb-5 flex items-center">Why Work With Me</p>
          <h2 className="reveal visible font-[var(--font-display)] text-[clamp(48px,6vw,80px)] tracking-[1px] uppercase leading-[0.95] mb-4">Not Theory.<br /><span className="text-[#E87033]">Real Execution.</span></h2>
          <p className="reveal visible text-[#A0AAB2] text-[18px] leading-[1.7] max-w-[520px] mb-16">Most consultants give you slides. I give you a running system — built, tested, and proven across 10+ industries in UAE and globally.</p>
          <div className="grid grid-cols-3 gap-[2px]">
            {[
              { num: '01', title: "I've Done It Myself", text: "I built a 32-person sales operation, implemented CRM systems, ran paid ads, created content strategies, and scaled companies from zero — hands on, every time. No theory. No outsourcing your strategy." },
              { num: '02', title: 'Numbers You Can Verify', text: 'AED 1.9M/month from zero in 6 months. 2,500 real estate leads in 60 days. 90 car sales/month from a TikTok Live strategy. Every engagement has a result attached to it.' },
              { num: '03', title: 'Works Across Industries', text: 'Real estate, automotive, hospitality, e-commerce, corporate services, tourism, cleaning — your industry is different, but the growth systems are the same. I adapt fast.' },
              { num: '04', title: 'UAE Market Expertise', text: 'Dubai is one of the most competitive and multicultural markets in the world. I\'ve built campaigns targeting South Asian, Arab, British, and European audiences — all from this city.' },
              { num: '05', title: 'Full Stack, Not Just Strategy', text: 'CRM, paid ads, content, team structure, automation, lead generation — I don\'t just advise. What I recommend, I can build. You get strategy and execution in one person.' },
              { num: '06', title: '2,000+ Influencer Network', text: 'A ready-to-activate network of 2,000+ influencers and models of all nationalities in Dubai. When your brand needs reach, I have it — immediately, without the usual agency lead time.' },
            ].map((card) => (
              <div key={card.num} className="why-card reveal visible bg-[#2C3338] p-10 relative overflow-hidden transition-colors duration-300 hover:bg-[#353c43]">
                <div className="font-[var(--font-display)] text-[72px] text-[rgba(232,112,51,0.07)] leading-none mb-5 tracking-[0] transition-colors duration-300 hover:text-[rgba(232,112,51,0.14)]">{card.num}</div>
                <div className="font-[var(--font-display)] text-[24px] mb-3 tracking-[0.5px] uppercase">{card.title}</div>
                <div className="text-[#A0AAB2] text-[15px] leading-[1.75]">{card.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-[#2C3338] px-[60px] py-[100px]" id="results">
        <div className="max-w-[1100px] mx-auto">
          <p className="eyebrow-line reveal visible text-[11px] tracking-[3px] uppercase text-[#E87033] font-medium mb-5 flex items-center">Proven Results</p>
          <h2 className="reveal visible font-[var(--font-display)] text-[clamp(48px,6vw,80px)] tracking-[1px] uppercase leading-[0.95] mb-4">Numbers That<br /><span className="text-[#E87033]">Actually Happened.</span></h2>
          <p className="reveal visible text-[#A0AAB2] text-[18px] leading-[1.7] max-w-[520px] mb-16">These aren't projections. These are real results delivered for real clients across UAE and beyond.</p>
          <div className="grid grid-cols-2 gap-[2px] mt-16">
            {[
              { industry: 'Corporate Services', big: <>AED <span className="text-[#E87033]">1.9M</span>/month</>, desc: 'Scaled Unispire Group FZ from zero to AED 1.9M per month in just 6 months. Built the entire system: CRM, team structure, content strategy, paid ads, ManyChat automation, and a lead recycling system. 170 trade licenses closed in January alone. Award winner at both Ajman and Meydan Free Zones.' },
              { industry: 'Digital Agency', big: <>AED <span className="text-[#E87033]">841K</span><br />Organic Only</>, desc: 'Grew JR Digital Media Co from inception to AED 841,000 in sales entirely through organic Instagram marketing. No paid ads — pure content strategy, positioning, and conversion optimization.' },
              { industry: 'Luxury Real Estate', big: <><span className="text-[#E87033]">2,500</span> Leads<br />in 60 Days</>, desc: 'Generated 2,500 qualified leads for Aya MZ Luxury Real Estate in two months, resulting in 3 deals worth AED 15 million sourced from Nepal. Zero brand awareness at the start of the campaign.' },
              { industry: 'Automotive', big: <><span className="text-[#E87033]">90</span> Cars<br />/Month</>, desc: 'Launched Al Bashayar Auto Auction from zero to 90 car sales per month using TikTok Live, short-form video, and Instagram Reels. Also scaled Al Hamd Motors to 30 SUV exports/month through digital advertising.' },
              { industry: 'F&B / Hospitality', big: <><span className="text-[#E87033]">3</span> to <span className="text-[#E87033]">7</span><br />Branches</>, desc: 'Helped Khangi Restaurant expand from 3 to 7 branches, serving 6,000+ customers, using only Google Maps optimization, viral video campaigns, and organic social media — zero paid advertising.' },
              { industry: 'Cleaning Services', big: <>AED <span className="text-[#E87033]">100K</span>/month</>, desc: 'Transformed TopOneServices into a multi-vendor cleaning platform generating AED 100,000 per month. Built the website, digital presence, and the lead generation system from scratch.' },
            ].map((r, i) => (
              <div key={i} className="reveal visible bg-[#1A1D21] p-10 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="result-industry-line text-[11px] tracking-[2px] uppercase text-[#E87033] font-medium mb-5 flex items-center">{r.industry}</div>
                <div className="font-[var(--font-display)] text-[clamp(38px,4vw,56px)] text-[#F2F2F2] tracking-[0.5px] uppercase leading-none mb-4">{r.big}</div>
                <div className="text-[#A0AAB2] text-[14px] leading-[1.75]">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#1A1D21] px-[60px] py-[100px]" id="services">
        <div className="max-w-[1100px] mx-auto">
          <p className="eyebrow-line reveal visible text-[11px] tracking-[3px] uppercase text-[#E87033] font-medium mb-5 flex items-center">How We Work Together</p>
          <h2 className="reveal visible font-[var(--font-display)] text-[clamp(48px,6vw,80px)] tracking-[1px] uppercase leading-[0.95] mb-4">Pick Your<br /><span className="text-[#E87033]">Starting Point.</span></h2>
          <p className="reveal visible text-[#A0AAB2] text-[18px] leading-[1.7] max-w-[520px] mb-16">Every engagement starts with a free Growth Audit. From there, we find the right package for where your business is right now.</p>
          <div className="grid grid-cols-2 gap-[2px] mt-16">
            {[
              { badge: 'Free · Start Here', free: true, name: 'The Growth Audit', price: 'Free', priceNote: '· 20-minute call', desc: "A focused diagnostic call. I review your current sales and marketing setup and tell you exactly where your biggest growth opportunity is. No pitch. No obligation. Just honest, experienced advice from someone who has actually done it.", link: 'https://calendly.com/asfahan/the-growth-audit-free-lead-magnet', linkText: 'Book Now →' },
              { badge: 'One-Time Project', free: false, name: 'The Foundation System', price: 'AED 5,000–10,000', priceNote: '· one-time', desc: 'CRM implementation (Odoo), sales process design, and team structure setup. Built for businesses that have traction but are running on chaos. Get the infrastructure right before you scale.', link: 'https://calendly.com/asfahan/the-growth-audit-free-lead-magnet', linkText: 'Enquire →' },
              { badge: 'Monthly Retainer', free: false, name: 'The Scale System', price: 'AED 8,000–15,000', priceNote: '· /month', desc: "Full done-for-you growth: paid ads, content strategy, CRM management, lead generation, and weekly reporting. You focus on closing — I handle everything that fills your pipeline.", link: 'https://calendly.com/asfahan/the-growth-audit-free-lead-magnet', linkText: 'Enquire →' },
              { badge: 'Premium Partnership', free: false, name: 'The Growth Partner', price: 'AED 20,000+', priceNote: '· /month + % revenue', desc: 'I become your embedded growth partner — fractional CMO and CSO. Aligned with your revenue, inside your operations. This is exactly how Unispire went from AED 0 to AED 1.9M/month in 6 months.', link: 'https://calendly.com/asfahan/the-growth-audit-free-lead-magnet', linkText: 'Apply →' },
            ].map((s, i) => (
              <div key={i} className="reveal visible bg-[#2C3338] p-10 flex flex-col border-l-[3px] border-transparent transition-all duration-300 hover:bg-[#353c43] hover:border-l-[#E87033]">
                <span className={`self-start text-[10px] tracking-[2px] uppercase text-[#E87033] border border-[rgba(232,112,51,0.3)] px-[10px] py-[5px] rounded-[2px] mb-5 ${s.free ? 'bg-[rgba(232,112,51,0.1)]' : ''}`}>{s.badge}</span>
                <div className="font-[var(--font-display)] text-[28px] mb-2 tracking-[0.5px] uppercase">{s.name}</div>
                <div className="text-[28px] text-[#E87033] mb-4 font-[var(--font-display)] tracking-[0.3px]">
                  {s.price} <small className="text-[14px] text-[#A0AAB2] font-[var(--font-body)]">{s.priceNote}</small>
                </div>
                <div className="text-[#A0AAB2] text-[15px] leading-[1.75] flex-1">{s.desc}</div>
                <a href={s.link} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[#E87033] text-[14px] no-underline transition-[gap] duration-200 font-[var(--font-display)] tracking-[1px] uppercase hover:gap-[14px]">{s.linkText}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="px-[60px] py-[120px] bg-[#2C3338] relative overflow-hidden text-center" id="booking">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(232,112,51,0.1)_0%,transparent_65%)]" />
        <div className="booking-grid-bg" />
        <div className="relative z-[1] max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(232,112,51,0.1)] border border-[rgba(232,112,51,0.25)] text-[#E87033] text-[11px] tracking-[2.5px] uppercase px-4 py-2 rounded-[2px] mb-9">
            <span className="w-[6px] h-[6px] rounded-full bg-[#E87033] animate-blink flex-shrink-0" />
            Limited spots available each month
          </div>
          <h2 className="font-[var(--font-display)] text-[clamp(56px,8vw,104px)] tracking-[1px] uppercase leading-[0.93] mb-7">Let's Find Your<br /><span className="text-[#E87033]">Growth Lever.</span></h2>
          <p className="text-[#A0AAB2] text-[18px] leading-[1.7] mb-[52px]">
            Book a <strong className="text-[#F2F2F2] font-medium">free 20-minute Growth Audit</strong> call. I'll review your current setup and tell you exactly where the biggest opportunity is. No pitch. No pressure. Just clarity.
          </p>
          <a
            href="https://calendly.com/asfahan/the-growth-audit-free-lead-magnet"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[14px] bg-[#E87033] text-white no-underline px-[52px] py-[22px] rounded-[3px] font-[var(--font-display)] text-[22px] tracking-[1.5px] uppercase border-2 border-[#E87033] transition-all duration-200 hover:bg-transparent hover:text-[#E87033] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(232,112,51,0.3)] group"
          >
            Book Your Free Audit Call
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
          </a>
          <div className="mt-7 text-[13px] text-[rgba(160,170,178,0.5)] flex items-center justify-center gap-6 flex-wrap">
            {['100% Free · No Commitment', '20 Minutes Only', 'Real Advice, Not a Sales Pitch', 'Any Time Zone'].map((item) => (
              <span key={item} className="reassure-item flex items-center">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-[60px] py-20 bg-[#1A1D21] border-t border-[rgba(160,170,178,0.12)]" id="about">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[1fr_1.2fr] gap-20 items-center">
          <div>
            <div className="reveal visible font-[var(--font-display)] text-[clamp(36px,4.5vw,60px)] uppercase tracking-[1px] mb-[6px] leading-[0.95]">
              Asfahan <span className="text-[#E87033]">Ahmad</span><br />Khan Bangash
            </div>
            <div className="reveal visible text-[13px] text-[#A0AAB2] tracking-[1px] uppercase mb-7">Sales &amp; Marketing Consultant · Dubai, UAE</div>
            <p className="reveal visible text-[#A0AAB2] text-[15px] leading-[1.8]">
              I've spent 7+ years building sales and marketing systems that generate real revenue. From <strong className="text-[#F2F2F2] font-medium">scaling Unispire to AED 1.9M/month in 6 months</strong> to growing a digital agency to AED 841K through pure organic Instagram — every result comes from one principle: <strong className="text-[#F2F2F2] font-medium">build the right system, then scale what works.</strong>
              <br /><br />
              Based in Dubai. Working with clients across UAE, UK, Europe, South Asia, and the Arab world. Fluent in English, Urdu, Hindi, and Pashto.
            </p>
            <div className="reveal visible flex flex-wrap gap-2 mt-7">
              {['CRM & Odoo', 'Paid Ads', 'Lead Generation', 'Content Strategy', 'Sales Systems', 'Team Building', 'ManyChat Automation', 'Personal Branding', 'E-commerce', 'Influencer Marketing'].map((tag) => (
                <span key={tag} className="text-[12px] text-[#A0AAB2] border border-[rgba(160,170,178,0.12)] px-[14px] py-[7px] rounded-[2px] transition-all duration-200 hover:border-[#E87033] hover:text-[#E87033]">{tag}</span>
              ))}
            </div>
          </div>
          <div className="reveal visible flex flex-col gap-3">
            {[
              { icon: '🏆', name: 'High Value Client Award', org: 'Ajman Free Zone · 5th Highest Sales · 300 Trade Licenses' },
              { icon: '🥇', name: 'Gold Partner Recognition', org: 'Meydan Free Zone · High Value Clients · 260 Trade Licenses' },
              { icon: '🌍', name: '2,000+ Influencer Network', org: 'Dubai · All Nationalities · Instantly Activatable' },
              { icon: '📈', name: 'Co-Founder · JR Digital Media', org: 'Pakistan · UAE · Brazil · AED 841K Organic Growth' },
            ].map((award) => (
              <div key={award.name} className="bg-[#2C3338] px-[26px] py-[22px] border-l-[3px] border-l-[#E87033] flex items-start gap-4 transition-colors duration-200 hover:bg-[#353c43]">
                <div className="text-[22px] flex-shrink-0">{award.icon}</div>
                <div>
                  <div className="font-[var(--font-display)] text-[16px] mb-1 tracking-[0.3px] uppercase">{award.name}</div>
                  <div className="text-[13px] text-[#A0AAB2]">{award.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C3338] border-t border-[rgba(160,170,178,0.12)] px-[60px] pt-12 pb-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between items-start mb-10 flex-wrap gap-8">
            <div>
              <div className="font-[var(--font-display)] text-[24px] tracking-[1px] uppercase">Asfahan<span className="text-[#E87033]">.</span></div>
              <div className="text-[13px] text-[#A0AAB2] mt-[6px]">$30M in Client Revenue Generated · Dubai, UAE 🌍</div>
            </div>
            <div className="flex flex-col gap-[10px] text-right">
              <a href="mailto:asfahanahmadkhan@gmail.com" className="no-underline text-[#A0AAB2] text-[14px] transition-colors duration-200 hover:text-[#E87033]">asfahanahmadkhan@gmail.com</a>
              <a href="tel:+971527404854" className="no-underline text-[#A0AAB2] text-[14px] transition-colors duration-200 hover:text-[#E87033]">+971 52 740 4854</a>
              <a href="https://www.linkedin.com/in/asfahan-khan-bangash-48a2b6239" target="_blank" rel="noreferrer" className="no-underline text-[#A0AAB2] text-[14px] transition-colors duration-200 hover:text-[#E87033]">LinkedIn Profile →</a>
            </div>
          </div>
          <div className="border-t border-[rgba(160,170,178,0.12)] pt-6 flex justify-between items-center flex-wrap gap-3">
            <span className="text-[12px] text-[rgba(160,170,178,0.5)]">© 2025 Asfahan Ahmad Khan Bangash. All rights reserved.</span>
            <span className="text-[12px] text-[rgba(160,170,178,0.5)]">📍 International City, Dubai, UAE</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Asfahan;