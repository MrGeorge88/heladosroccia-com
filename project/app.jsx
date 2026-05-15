/* ============================================================
   Components — Helados Roccia · heladosroccia.com
   ============================================================ */

const { useState, useMemo, useEffect, useRef } = React;

/* Inline SVG icon set (Lucide-style 24x24, stroke currentColor) */
const ICON_PATHS = {
  ArrowUpRight: <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
  ArrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  MapPin:       <><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  Clock:        <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  Phone:        <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></>,
  Search:       <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  Plus:         <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  Minus:        <><line x1="5" y1="12" x2="19" y2="12"/></>,
  Award:        <><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></>,
  Leaf:         <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c.4 2.5.66 5.2.6 7.55-.16 6.6-3.93 11.04-8.8 9.49Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>,
  Mountain:     <><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></>,
  Heart:        <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></>,
  StarFill:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
};

const Icon = ({ name, size = 20, stroke = 1.6, fill = "none", ...rest }) => {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
         fill={fill} stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {path}
    </svg>
  );
};

const Star = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const Stars = ({ n = 5, size = 14 }) => (
  <span className="hero-stars" aria-label={`${n} de 5 estrellas`}>
    {Array.from({ length: n }).map((_, i) => <Star key={i} size={size} />)}
  </span>
);

/* ─────────────────────────────────────────────
   HEADER
   ───────────────────────────────────────────── */
const Header = () => (
  <header className="header" role="banner">
    <div className="header-inner">
      <a href="#top" className="brand-lockup" aria-label="Roccia · Helados artesanales">
        <img src="img/logo-cafe.png" alt="Roccia" style={{ height: 38, width: "auto" }} />
        <span className="brand-divider" aria-hidden="true"></span>
        <span className="brand-sub">Helados artesanales</span>
      </a>
      <nav className="nav" aria-label="Principal">
        <a href="#sabores">Sabores</a>
        <a href="#ubicacion">Ubicación</a>
        <a href="#resenas">Reseñas</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="header-cta">
        <a className="btn btn-primary btn-sm" href="#delivery">
          <span className="header-cta-text-full">Pedir delivery</span>
          <span className="header-cta-text-short">Pedir</span>
          <Icon name="ArrowUpRight" size={16} />
        </a>
      </div>
    </div>
  </header>
);

/* ─────────────────────────────────────────────
   HERO con prueba social
   ───────────────────────────────────────────── */
const Hero = () => (
  <section id="top" className="hero">
    <div className="wrap">
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow rise rise-1">
            <span className="sello"><span className="sello-dot"></span>Cumbayá · Quito</span>
            <span className="hero-rating">
              <Stars />
              <span className="hero-rating-text"><span className="num">4.9</span> en Google · 200+ reseñas</span>
            </span>
          </div>
          <h1 className="hero-title rise rise-2">
            Gelato <span className="script">artesanal</span><span className="dot">.</span><br/>
            en Cumbayá<span className="dot">.</span>
          </h1>
          <p className="hero-sub rise rise-3">
            {TOTAL_FLAVORS} sabores hechos a mano con técnica italiana e ingredientes ecuatorianos. Pídelo a domicilio o ven a visitarnos.
          </p>
          <div className="hero-ctas rise rise-4">
            <a className="btn btn-primary" href="#sabores">Ver los {TOTAL_FLAVORS} sabores <Icon name="ArrowRight" size={16}/></a>
            <a className="btn btn-outline" href="#delivery">Pedir delivery</a>
            <a className="hero-link-visit" href="#ubicacion"><Icon name="MapPin" size={15}/> Visitar local</a>
          </div>
        </div>
        <div className="hero-photo rise rise-3">
          <img src="img/hero.webp" alt="Helado artesanal Roccia · cono de pistacho" className="sepia"/>
          <span className="sello sello-cafe sello-rotated hero-sello-tl">
            <span className="sello-dot"></span>Hecho a mano
          </span>
          <span className="sello sello-mostaza hero-sello-br" style={{ transform: "rotate(4deg)" }}>
            <span className="sello-dot"></span>{TOTAL_FLAVORS} sabores
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   DELIVERY destacado
   ───────────────────────────────────────────── */
const Delivery = () => (
  <section id="delivery" className="delivery">
    <div className="wrap">
      <div className="delivery-header">
        <div>
          <span className="sello"><span className="sello-dot"></span>Delivery</span>
          <h2 className="delivery-title">Tu pausa dulce, <span className="script">donde estés.</span></h2>
        </div>
        <p className="delivery-sub">
          Llegamos a Cumbayá, Tumbaco, Quito y valles cercanos. Helado en envase térmico, listo para servirse. Tiempo promedio en Cumbayá: 25 minutos.
        </p>
      </div>
      <div className="delivery-grid">
        {DELIVERY_APPS.map(a => (
          <a key={a.name} className="delivery-card" href={a.url} target="_blank" rel="noopener">
            <span className="delivery-card-arrow"><Icon name="ArrowUpRight" size={18}/></span>
            <div>
              <div className="delivery-card-name">{a.name}</div>
            </div>
            <div className="delivery-card-desc">{a.desc}</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CATÁLOGO con buscador y filtros
   ───────────────────────────────────────────── */
const FlavorCard = ({ f }) => (
  <a className="flavor-card" href={`/sabores/${f.slug}`}>
    <div className="flavor-img-wrap">
      {f.img ? (
        <img src={f.img} alt={`Helado de ${f.alt}`} loading="lazy" className="sepia"/>
      ) : (
        <div className="flavor-img-placeholder sepia">{f.name.charAt(0)}</div>
      )}
      {f.sello && <span className={`flavor-sello ${f.sello.color}`}>{f.sello.label}</span>}
      <div className="flavor-overlay">
        <span>Ver detalles</span>
        <Icon name="ArrowRight" size={16}/>
      </div>
    </div>
    <div className="flavor-row">
      <h3 className="flavor-name">{f.name}</h3>
      <span className="flavor-origin">{f.origin}</span>
    </div>
    <p className="flavor-desc">{f.desc}</p>
  </a>
);

const Catalog = () => (
  <section id="sabores" className="catalog">
    <div className="wrap">
      <div className="catalog-header">
        <div>
          <span className="sello"><span className="sello-dot"></span>Catálogo · {TOTAL_FLAVORS} sabores</span>
          <h2 className="catalog-title">Encuentra tu <span className="script">sabor favorito.</span></h2>
          <p className="catalog-sub">
            Ocho destacados de la vitrina. Cremas italianas, dulces argentinos, chocolates de Manabí y frutales ecuatorianos.
          </p>
        </div>
        <a className="btn btn-outline" href="#carta-completa">
          Ver los {TOTAL_FLAVORS} sabores <Icon name="ArrowRight" size={15}/>
        </a>
      </div>

      <div className="catalog-grid">
        {FEATURED_FLAVORS.map(f => <FlavorCard key={f.slug} f={f} />)}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CARTA COMPLETA — 35 sabores en 4 columnas (texto SEO)
   ───────────────────────────────────────────── */
const FullMenu = () => (
  <section id="carta-completa" className="fullmenu">
    <div className="wrap">
      <div className="fullmenu-head">
        <span className="sello"><span className="sello-dot"></span>Carta completa</span>
        <h2 className="fullmenu-title">Los <span className="script">35 sabores.</span></h2>
        <p className="fullmenu-sub">
          La carta entera, organizada por categoría. La vitrina rota por temporada — siempre encontrarás entre 16 y 20 sabores en frío al mismo tiempo.
        </p>
      </div>

      <div className="fullmenu-grid">
        {CATALOG_SECTIONS.map(s => (
          <div key={s.id} className="fullmenu-col">
            <header className="fullmenu-col-head">
              <h3 className="fullmenu-col-title">{s.title}</h3>
              <div className="fullmenu-col-meta">
                <span>{s.count} sabores</span>
                {s.vegan && (
                  <span className="fullmenu-vegan"><Icon name="Leaf" size={11}/>vegano</span>
                )}
              </div>
            </header>
            <ul className="fullmenu-list">
              {s.items.map(it => (
                <li key={it.slug}>
                  <a href={`/sabores/${it.slug}`}>{it.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   POR QUÉ ROCCIA
   ───────────────────────────────────────────── */
const Why = () => (
  <section className="why">
    <div className="wrap">
      <span className="sello"><span className="sello-dot"></span>Por qué Roccia</span>
      <h2 className="why-title">Cuatro razones para <span className="script">elegirnos.</span></h2>
      <div className="why-grid">
        {WHY_REASONS.map(r => (
          <div className="why-card" key={r.title}>
            <div className="why-icon"><Icon name={r.icon} size={24} stroke={1.5}/></div>
            <h3 className="why-cardtitle">{r.title}</h3>
            <p className="why-cardbody">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   UBICACIÓN
   ───────────────────────────────────────────── */
const Location = () => (
  <section id="ubicacion" className="location">
    <div className="wrap">
      <div className="location-grid">
        <div>
          <span className="sello"><span className="sello-dot"></span>Visítanos</span>
          <h2 className="location-title">Briza <span className="script">Cumbayá.</span></h2>
          <ul className="loc-list">
            <li>
              <span className="loc-list-icon"><Icon name="MapPin" size={20}/></span>
              <div>
                <div className="loc-list-label">Dirección</div>
                <div className="loc-list-text">Briza Cumbayá<br/>Av. Francisco de Orellana, Y y Tajamar</div>
              </div>
            </li>
            <li>
              <span className="loc-list-icon"><Icon name="Clock" size={20}/></span>
              <div>
                <div className="loc-list-label">Horario</div>
                <div className="loc-list-text">Todos los días · 10:00 — 20:00</div>
              </div>
            </li>
            <li>
              <span className="loc-list-icon"><Icon name="Phone" size={20}/></span>
              <div>
                <div className="loc-list-label">Teléfono</div>
                <div className="loc-list-text">+593 99 555 0123</div>
              </div>
            </li>
          </ul>
          <div className="loc-ctas">
            <a className="btn btn-primary" href="https://maps.app.goo.gl/Qt9VRLwuddWuuQKP8" target="_blank" rel="noopener">
              Cómo llegar <Icon name="ArrowUpRight" size={15}/>
            </a>
          </div>
        </div>
        <div className="location-photo">
          <img src="img/local-vitrina.jpeg" alt="Local Roccia en Briza Cumbayá" className="sepia"/>
          <span className="sello sello-cafe sello-rotated location-sello">
            <span className="sello-dot"></span>Briza Cumbayá
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   REVIEWS
   ───────────────────────────────────────────── */
const Reviews = () => (
  <section id="resenas" className="reviews">
    <div className="wrap">
      <span className="sello"><span className="sello-dot"></span>Reseñas verificadas</span>
      <h2 className="reviews-title">
        <span className="num">4.9</span> en Google.
      </h2>
      <div className="reviews-meta">
        <Stars size={18}/> Más de 200 reseñas
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <article key={i} className="review-card grain">
            <header className="review-head">
              <span className="review-stars"><Stars/></span>
              <span className="review-time">{r.time}</span>
            </header>
            <p className="review-text">"{r.text}"</p>
            <footer className="review-foot">
              <span className="review-avatar">{r.initial}</span>
              <span className="review-name">{r.name}</span>
            </footer>
          </article>
        ))}
      </div>
      <div className="reviews-cta">
        <a className="btn btn-outline" href="https://www.google.com/maps" target="_blank" rel="noopener">
          Ver todas las reseñas en Google <Icon name="ArrowUpRight" size={15}/>
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FAQ accordion
   ───────────────────────────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="wrap-narrow">
        <div style={{ textAlign: "center" }}>
          <span className="sello"><span className="sello-dot"></span>Preguntas frecuentes</span>
        </div>
        <h2 className="faq-title">Lo que más nos <span className="script">preguntan.</span></h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-item-icon">
                  <Icon name={open === i ? "Minus" : "Plus"} size={16}/>
                </span>
              </button>
              <div className="faq-item-body">
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CTA FINAL
   ───────────────────────────────────────────── */
const CTAFinal = () => (
  <section className="cta-final">
    <div className="wrap">
      <span className="sello"><span className="sello-dot"></span>Dale el sí</span>
      <h2 className="cta-title">¿Listo para <span className="script">tu pausa?</span></h2>
      <p className="cta-sub">Helado artesanal en tu puerta, en menos de media hora.</p>
      <div className="cta-pills">
        {DELIVERY_APPS.map(a => (
          <a key={a.name} className="btn btn-cream" href={a.url} target="_blank" rel="noopener">
            {a.name} <Icon name="ArrowUpRight" size={15}/>
          </a>
        ))}
      </div>
      <a className="cta-link-visit" href="#ubicacion">
        <Icon name="MapPin" size={14}/> O ven a visitarnos a Briza Cumbayá
      </a>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FOOTER comercial
   ───────────────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-script">Roccia</div>
          <p className="footer-brand-desc">
            Heladería artesanal italo-argentina en Cumbayá. {TOTAL_FLAVORS} sabores hechos a mano con ingredientes reales.
          </p>
          <div className="footer-rating">
            <Stars size={14}/> <strong>4.9</strong> en Google
          </div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Sabores</h4>
            <ul>
              <li><a href="#sabores">Cremas</a></li>
              <li><a href="#sabores">Dulces de Leche</a></li>
              <li><a href="#sabores">Chocolates</a></li>
              <li><a href="#sabores">Frutales</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Pedir</h4>
            <ul>
              <li><a href="https://www.ubereats.com" target="_blank" rel="noopener">Uber Eats</a></li>
              <li><a href="https://www.rappi.com.ec" target="_blank" rel="noopener">Rappi</a></li>
              <li><a href="https://wa.me/593995550123" target="_blank" rel="noopener">WhatsApp</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Visitar</h4>
            <ul>
              <li><a href="#ubicacion">Briza Cumbayá</a></li>
              <li><a href="#ubicacion">10:00 — 20:00</a></li>
              <li><a href="https://maps.app.goo.gl/Qt9VRLwuddWuuQKP8" target="_blank" rel="noopener">Cómo llegar</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Roccia</h4>
            <ul>
              <li><a href="https://roccia.ec" target="_blank" rel="noopener">Nuestra historia</a></li>
              <li><a href="mailto:hola@rocciaheladeria.com">Mayoristas</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="mailto:hola@rocciaheladeria.com">Contacto</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© Roccia · Cumbayá · 2026</span>
        <span>Helados artesanales · heladosroccia.com</span>
        <span>hola@rocciaheladeria.com</span>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   APP root
   ───────────────────────────────────────────── */
const App = () => {
  return (
    <>
      <Header/>
      <main>
        <Hero/>
        <Delivery/>
        <Catalog/>
        <FullMenu/>
        <Why/>
        <Location/>
        <Reviews/>
        <FAQ/>
        <CTAFinal/>
      </main>
      <Footer/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
