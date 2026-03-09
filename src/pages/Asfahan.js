import { useEffect } from 'react'
import './asfahan.css'

const Asfahan = () => {
  useEffect(() => {
    document.body.classList.add('asfahan-theme')
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
      document.body.classList.remove('asfahan-theme')
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
      <nav>
        <a href="#" className="nav-logo">Asfahan<span>.</span></a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#why">Why Me</a>
            <a href="#results">Results</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
          </div>
          <a href="#booking" className="nav-book">Book Free Audit →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-orb"></div>
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Sales &amp; Marketing Consultant · Dubai, UAE · Available Worldwide
          </div>
          <h1 className="hero-h1">
            <span className="line-ghost">I Help Service</span>
            <span>Businesses</span>
            <span className="line-orange">Generate Revenue.</span>
          </h1>
          <p className="hero-sub">
            <strong>$30M in client revenue generated</strong> across real estate, automotive, hospitality, e-commerce and corporate services. If your business needs more leads, better systems, or faster growth — let's talk.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="btn-book">
              Book Your Free Growth Audit
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
            </a>
            <a href="#results" className="btn-ghost">
              See real results
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-item">
              <div className="proof-num" data-target="30" data-prefix="$" data-suffix="M">$0M</div>
              <div className="proof-label">In Client Revenue<br />Generated</div>
            </div>
            <div className="proof-item">
              <div className="proof-num" data-target="10" data-suffix="+">0</div>
              <div className="proof-label">Industries<br />Served</div>
            </div>
            <div className="proof-item">
              <div className="proof-num" data-target="2000" data-suffix="+">0</div>
              <div className="proof-label">Influencer Network<br />in Dubai</div>
            </div>
            <div className="proof-item">
              <div className="proof-num" data-target="6">0</div>
              <div className="proof-label">Months to Scale<br />Unispire to AED 1.9M/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CRED STRIP */}
      <div className="cred-strip">
        <span className="cred-label">Clients Include</span>
        <div className="cred-track">
          <div className="cred-scroll">
            <span className="cred-item">Unispire Group FZ</span>
            <span className="cred-item">JR Digital Media</span>
            <span className="cred-item">Al Bashayar Auto Auction</span>
            <span className="cred-item">Aya MZ Luxury Real Estate</span>
            <span className="cred-item">Khangi Restaurant</span>
            <span className="cred-item">Al Hamd Motors</span>
            <span className="cred-item">Mumtaz Rent a Car</span>
            <span className="cred-item">Dxb Attractions</span>
            <span className="cred-item">Ozone International</span>
            <span className="cred-item">TopOneServices</span>
            <span className="cred-item">Al Ayan Real Estate</span>
            <span className="cred-item">Ageless Collection</span>
            <span className="cred-item">Unispire Group FZ</span>
            <span className="cred-item">JR Digital Media</span>
            <span className="cred-item">Al Bashayar Auto Auction</span>
            <span className="cred-item">Aya MZ Luxury Real Estate</span>
            <span className="cred-item">Khangi Restaurant</span>
            <span className="cred-item">Al Hamd Motors</span>
            <span className="cred-item">Mumtaz Rent a Car</span>
            <span className="cred-item">Dxb Attractions</span>
            <span className="cred-item">Ozone International</span>
            <span className="cred-item">TopOneServices</span>
            <span className="cred-item">Al Ayan Real Estate</span>
            <span className="cred-item">Ageless Collection</span>
          </div>
        </div>
      </div>

      {/* WHY */}
      <section className="why" id="why">
        <div className="why-inner">
          <p className="section-eyebrow reveal visible">Why Work With Me</p>
          <h2 className="section-h2 reveal visible">Not Theory.<br /><span>Real Execution.</span></h2>
          <p className="section-sub reveal visible">Most consultants give you slides. I give you a running system — built, tested, and proven across 10+ industries in UAE and globally.</p>
          <div className="why-grid">
            <div className="why-card reveal visible">
              <div className="why-num">01</div>
              <div className="why-title">I've Done It Myself</div>
              <div className="why-text">I built a 32-person sales operation, implemented CRM systems, ran paid ads, created content strategies, and scaled companies from zero — hands on, every time. No theory. No outsourcing your strategy.</div>
            </div>
            <div className="why-card reveal visible">
              <div className="why-num">02</div>
              <div className="why-title">Numbers You Can Verify</div>
              <div className="why-text">AED 1.9M/month from zero in 6 months. 2,500 real estate leads in 60 days. 90 car sales/month from a TikTok Live strategy. Every engagement has a result attached to it.</div>
            </div>
            <div className="why-card reveal visible">
              <div className="why-num">03</div>
              <div className="why-title">Works Across Industries</div>
              <div className="why-text">Real estate, automotive, hospitality, e-commerce, corporate services, tourism, cleaning — your industry is different, but the growth systems are the same. I adapt fast.</div>
            </div>
            <div className="why-card reveal visible">
              <div className="why-num">04</div>
              <div className="why-title">UAE Market Expertise</div>
              <div className="why-text">Dubai is one of the most competitive and multicultural markets in the world. I've built campaigns targeting South Asian, Arab, British, and European audiences — all from this city.</div>
            </div>
            <div className="why-card reveal visible">
              <div className="why-num">05</div>
              <div className="why-title">Full Stack, Not Just Strategy</div>
              <div className="why-text">CRM, paid ads, content, team structure, automation, lead generation — I don't just advise. What I recommend, I can build. You get strategy and execution in one person.</div>
            </div>
            <div className="why-card reveal visible">
              <div className="why-num">06</div>
              <div className="why-title">2,000+ Influencer Network</div>
              <div className="why-text">A ready-to-activate network of 2,000+ influencers and models of all nationalities in Dubai. When your brand needs reach, I have it — immediately, without the usual agency lead time.</div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="results" id="results">
        <div className="results-inner">
          <p className="section-eyebrow reveal visible">Proven Results</p>
          <h2 className="section-h2 reveal visible">Numbers That<br /><span>Actually Happened.</span></h2>
          <p className="section-sub reveal visible">These aren't projections. These are real results delivered for real clients across UAE and beyond.</p>
          <div className="results-grid">
            <div className="result-card reveal visible">
              <div className="result-industry">Corporate Services</div>
              <div className="result-big">AED <span>1.9M</span>/month</div>
              <div className="result-desc">Scaled Unispire Group FZ from zero to AED 1.9M per month in just 6 months. Built the entire system: CRM, team structure, content strategy, paid ads, ManyChat automation, and a lead recycling system. 170 trade licenses closed in January alone. Award winner at both Ajman and Meydan Free Zones.</div>
            </div>
            <div className="result-card reveal visible">
              <div className="result-industry">Digital Agency</div>
              <div className="result-big">AED <span>841K</span><br />Organic Only</div>
              <div className="result-desc">Grew JR Digital Media Co from inception to AED 841,000 in sales entirely through organic Instagram marketing. No paid ads — pure content strategy, positioning, and conversion optimization.</div>
            </div>
            <div className="result-card reveal visible">
              <div className="result-industry">Luxury Real Estate</div>
              <div className="result-big"><span>2,500</span> Leads<br />in 60 Days</div>
              <div className="result-desc">Generated 2,500 qualified leads for Aya MZ Luxury Real Estate in two months, resulting in 3 deals worth AED 15 million sourced from Nepal. Zero brand awareness at the start of the campaign.</div>
            </div>
            <div className="result-card reveal visible">
              <div className="result-industry">Automotive</div>
              <div className="result-big"><span>90</span> Cars<br />/Month</div>
              <div className="result-desc">Launched Al Bashayar Auto Auction from zero to 90 car sales per month using TikTok Live, short-form video, and Instagram Reels. Also scaled Al Hamd Motors to 30 SUV exports/month through digital advertising.</div>
            </div>
            <div className="result-card reveal visible">
              <div className="result-industry">F&amp;B / Hospitality</div>
              <div className="result-big"><span>3</span> to <span>7</span><br />Branches</div>
              <div className="result-desc">Helped Khangi Restaurant expand from 3 to 7 branches, serving 6,000+ customers, using only Google Maps optimization, viral video campaigns, and organic social media — zero paid advertising.</div>
            </div>
            <div className="result-card reveal visible">
              <div className="result-industry">Cleaning Services</div>
              <div className="result-big">AED <span>100K</span>/month</div>
              <div className="result-desc">Transformed TopOneServices into a multi-vendor cleaning platform generating AED 100,000 per month. Built the website, digital presence, and the lead generation system from scratch.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="services-inner">
          <p className="section-eyebrow reveal visible">How We Work Together</p>
          <h2 className="section-h2 reveal visible">Pick Your<br /><span>Starting Point.</span></h2>
          <p className="section-sub reveal visible">Every engagement starts with a free Growth Audit. From there, we find the right package for where your business is right now.</p>
          <div className="services-list">
            <div className="service-item reveal visible">
              <span className="service-badge free">Free · Start Here</span>
              <div className="service-name">The Growth Audit</div>
              <div className="service-price">Free <small>· 20-minute call</small></div>
              <div className="service-desc">A focused diagnostic call. I review your current sales and marketing setup and tell you exactly where your biggest growth opportunity is. No pitch. No obligation. Just honest, experienced advice from someone who has actually done it.</div>
              <a href="#booking" className="service-link">Book Now →</a>
            </div>
            <div className="service-item reveal visible">
              <span className="service-badge">One-Time Project</span>
              <div className="service-name">The Foundation System</div>
              <div className="service-price">AED 5,000–10,000 <small>· one-time</small></div>
              <div className="service-desc">CRM implementation (Odoo), sales process design, and team structure setup. Built for businesses that have traction but are running on chaos. Get the infrastructure right before you scale.</div>
              <a href="#booking" className="service-link">Enquire →</a>
            </div>
            <div className="service-item reveal visible">
              <span className="service-badge">Monthly Retainer</span>
              <div className="service-name">The Scale System</div>
              <div className="service-price">AED 8,000–15,000 <small>· /month</small></div>
              <div className="service-desc">Full done-for-you growth: paid ads, content strategy, CRM management, lead generation, and weekly reporting. You focus on closing — I handle everything that fills your pipeline.</div>
              <a href="#booking" className="service-link">Enquire →</a>
            </div>
            <div className="service-item reveal visible">
              <span className="service-badge">Premium Partnership</span>
              <div className="service-name">The Growth Partner</div>
              <div className="service-price">AED 20,000+ <small>· /month + % revenue</small></div>
              <div className="service-desc">I become your embedded growth partner — fractional CMO and CSO. Aligned with your revenue, inside your operations. This is exactly how Unispire went from AED 0 to AED 1.9M/month in 6 months.</div>
              <a href="#booking" className="service-link">Apply →</a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <div className="booking-inner">
          <div className="booking-tag">
            <span className="badge-dot"></span>
            Limited spots available each month
          </div>
          <h2 className="booking-h2">Let's Find Your<br /><span>Growth Lever.</span></h2>
          <p className="booking-sub">
            Book a <strong>free 20-minute Growth Audit</strong> call. I'll review your current setup and tell you exactly where the biggest opportunity is. No pitch. No pressure. Just clarity.
          </p>
          <a href="https://calendly.com/asfahan/the-growth-audit-free-lead-magnet" target="_blank" rel="noreferrer" className="btn-book-xl">
            Book Your Free Audit Call
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
          </a>
          <div className="booking-reassure">
            <span>100% Free · No Commitment</span>
            <span>20 Minutes Only</span>
            <span>Real Advice, Not a Sales Pitch</span>
            <span>Any Time Zone</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-strip" id="about">
        <div className="about-strip-inner">
          <div>
            <div className="about-name reveal visible">Asfahan <span>Ahmad</span><br />Khan Bangash</div>
            <div className="about-role reveal visible">Sales &amp; Marketing Consultant · Dubai, UAE</div>
            <p className="about-bio reveal visible">
              I've spent 7+ years building sales and marketing systems that generate real revenue. From <strong>scaling Unispire to AED 1.9M/month in 6 months</strong> to growing a digital agency to AED 841K through pure organic Instagram — every result comes from one principle: <strong>build the right system, then scale what works.</strong>
              <br /><br />
              Based in Dubai. Working with clients across UAE, UK, Europe, South Asia, and the Arab world. Fluent in English, Urdu, Hindi, and Pashto.
            </p>
            <div className="about-tags reveal visible">
              <span className="about-tag">CRM &amp; Odoo</span>
              <span className="about-tag">Paid Ads</span>
              <span className="about-tag">Lead Generation</span>
              <span className="about-tag">Content Strategy</span>
              <span className="about-tag">Sales Systems</span>
              <span className="about-tag">Team Building</span>
              <span className="about-tag">ManyChat Automation</span>
              <span className="about-tag">Personal Branding</span>
              <span className="about-tag">E-commerce</span>
              <span className="about-tag">Influencer Marketing</span>
            </div>
          </div>
          <div className="about-awards reveal visible">
            <div className="award-card">
              <div className="award-icon">🏆</div>
              <div>
                <div className="award-name">High Value Client Award</div>
                <div className="award-org">Ajman Free Zone · 5th Highest Sales · 300 Trade Licenses</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🥇</div>
              <div>
                <div className="award-name">Gold Partner Recognition</div>
                <div className="award-org">Meydan Free Zone · High Value Clients · 260 Trade Licenses</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🌍</div>
              <div>
                <div className="award-name">2,000+ Influencer Network</div>
                <div className="award-org">Dubai · All Nationalities · Instantly Activatable</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">📈</div>
              <div>
                <div className="award-name">Co-Founder · JR Digital Media</div>
                <div className="award-org">Pakistan · UAE · Brazil · AED 841K Organic Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">Asfahan<span>.</span></div>
              <div className="footer-tagline">$30M in Client Revenue Generated · Dubai, UAE 🌍</div>
            </div>
            <div className="footer-contact">
              <a href="mailto:asfahanahmadkhan@gmail.com">asfahanahmadkhan@gmail.com</a>
              <a href="tel:+971527404854">+971 52 740 4854</a>
              <a href="https://www.linkedin.com/in/asfahan-khan-bangash-48a2b6239" target="_blank" rel="noreferrer">LinkedIn Profile →</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 Asfahan Ahmad Khan Bangash. All rights reserved.</span>
            <span className="footer-loc">📍 International City, Dubai, UAE</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Asfahan;