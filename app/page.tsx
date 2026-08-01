import SiteEffects from "@/app/components/SiteEffects";
import SiteNav from "@/app/components/SiteNav";
import ContactForm from "@/app/components/ContactForm";
import {
  getGallery,
  getImpactStats,
  getPartners,
  getPublishedPosts,
  getSectionImages,
} from "@/lib/content";

export default async function Home() {
  const [impact, images, gallery, partners, posts] = await Promise.all([
    getImpactStats(),
    getSectionImages(),
    getGallery(),
    getPartners(),
    getPublishedPosts(),
  ]);

  return (
    <>
      <SiteEffects />
      <SiteNav logo={images.logo} />

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-noise" />
        <div className="hero-content">
          <div className="hero-label" data-fr>🌍 Recyclage • Impact • Futur</div>
          <div className="hero-label" data-en>🌍 Recycling • Impact • Future</div>
          <h1 className="hero-h1" data-fr>Nous transformons les déchets plastiques <span className="accent">en pavés écologiques</span> durables.</h1>
          <h1 className="hero-h1" data-en>We transform plastic waste into <span className="accent">eco-friendly paving stones</span> that last.</h1>
          <p className="hero-sub" data-fr>Construire des villes propres, créer des emplois et protéger notre environnement en Afrique.</p>
          <p className="hero-sub" data-en>Building cleaner cities, creating jobs, and protecting our environment in Africa.</p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary" data-fr>Collaborer avec nous</a>
            <a href="#contact" className="btn-primary" data-en>Partner With Us</a>
            <a href="#about" className="btn-secondary" data-fr>Découvrir notre mission</a>
            <a href="#about" className="btn-secondary" data-en>Discover Our Mission</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span data-fr>Défiler</span><span data-en>Scroll</span>
        </div>
        <div className="hero-stats">
          {impact.slice(0, 3).map((s) => (
            <div className="hero-stat-item" key={s.key}>
              <div className="hero-stat-num">{s.value.toLocaleString()}{s.unit}</div>
              <div className="hero-stat-label" data-fr>{s.label_fr}</div>
              <div className="hero-stat-label" data-en>{s.label_en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI */}
      <section id="pourquoi" style={{ background: "var(--deep)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }} className="reveal">
          <div className="section-label" data-fr>Notre Raison d&apos;Être</div>
          <div className="section-label" data-en>Why We Exist</div>
          <h2 className="section-title" data-fr>Pourquoi nous <span style={{ color: "var(--red)" }}>existons</span></h2>
          <h2 className="section-title" data-en>Why we <span style={{ color: "var(--red)" }}>exist</span></h2>
          <div className="section-divider" style={{ margin: "28px auto" }} />
          <p style={{ color: "var(--light-gray)", fontSize: 18, lineHeight: 2, maxWidth: 720, margin: "0 auto" }} data-fr>
            Chaque jour, des tonnes de déchets plastiques envahissent nos villes, polluent nos sols et menacent notre avenir.<br /><br />
            Chez <strong style={{ color: "var(--white)" }}>ONCE FOR ALL COMPANY SARL</strong>, nous avons décidé de transformer ce problème en solution.<br /><br />
            Nous collectons, recyclons et valorisons les déchets plastiques pour en faire des matériaux de construction écologiques et durables.
          </p>
          <p style={{ color: "var(--light-gray)", fontSize: 18, lineHeight: 2, maxWidth: 720, margin: "0 auto" }} data-en>
            Every day, tonnes of plastic waste invade our cities, pollute our soil, and threaten our future.<br /><br />
            At <strong style={{ color: "var(--white)" }}>ONCE FOR ALL COMPANY SARL</strong>, we decided to turn this problem into a solution.<br /><br />
            We collect, recycle, and valorize plastic waste to create ecological and durable building materials.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-text reveal-left">
            <div className="section-label" data-fr>À Propos de nous</div>
            <div className="section-label" data-en>About Us</div>
            <h2 className="section-title">Once For<br /><span style={{ color: "var(--red)" }}>All</span> Company</h2>
            <div className="section-divider" />
            <p data-fr>OFAC est née d&apos;une conviction simple mais puissante : chaque déchet plastique est une ressource ignorée. Nous transformons cette conviction en action concrète, en collectant, recyclant et valorisant le plastique pour construire un avenir durable à Bukavu, au Sud-Kivu en particulier, et en RDC en général.</p>
            <p data-en>OFAC was born from a simple yet powerful conviction: every piece of plastic waste is an overlooked resource. We transform this conviction into concrete action, collecting, recycling, and valorizing plastic to build a sustainable future in Bukavu, in South-Kivu, particularly, and in DRC in general.</p>
            <p data-fr>Notre modèle unique associe impact environnemental et développement économique — chaque tonne recyclée génère des revenus, crée des emplois et assainit notre environnement.</p>
            <p data-en>Our unique model combines environmental impact with economic development — every tonne recycled generates revenue, creates jobs, and cleans our environment.</p>
            <div className="about-values">
              <div className="value-card reveal">
                <h4 data-fr>Mission</h4><h4 data-en>Mission</h4>
                <p data-fr>Éliminer durablement la pollution plastique en transformant les déchets en opportunités économiques grâce au recyclage innovant et à l&apos;éducation des communautés.</p>
                <p data-en>Sustainably eliminate plastic pollution by turning waste into economic opportunities through innovative recycling and community education.</p>
              </div>
              <div className="value-card reveal" style={{ transitionDelay: "0.1s" }}>
                <h4 data-fr>Vision</h4><h4 data-en>Vision</h4>
                <p data-fr>Construire une Afrique où les déchets plastiques deviennent une richesse et non une menace, d&apos;ici 2035.</p>
                <p data-en>Build an Africa where plastic waste becomes an invaluable resource rather than a threat, by 2035.</p>
              </div>
              <div className="value-card reveal" style={{ transitionDelay: "0.2s" }}>
                <h4 data-fr>Impact Social</h4><h4 data-en>Social Impact</h4>
                <p data-fr>✔️ Créer des emplois locaux durables <br /> ✔️ Augmenter les revenus des jeunes <br /> ✔️ Améliorer concrètement les conditions de vie des communautés.</p>
                <p data-en>✔️ Creating sustainable local jobs <br /> ✔️ Improving youth incomes <br /> ✔️ Improving quality of life in local communities.</p>
              </div>
              <div className="value-card reveal" style={{ transitionDelay: "0.3s" }}>
                <h4 data-fr>Innovation</h4><h4 data-en>Innovation</h4>
                <p data-fr>Transformer les déchets en pavés écologiques résistants, accessibles et adaptés aux réalités africaines.</p>
                <p data-en>Transforming waste into resistant, accessible ecological paving stones adapted to african realities.</p>
              </div>
            </div>
          </div>
          <div className="about-visual reveal-right">
            <div className="about-tag">OFAC</div>
            <img className="about-img-main" src={images.about_main} alt="OFAC Recyclage — équipe terrain" loading="lazy" />
            <img className="about-img-overlay" src={images.about_overlay} alt="Pavés écologiques OFAC" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder">
        <div className="about-grid">
          <div className="about-visual">
            <img src={images.founder} className="about-img-main" alt="Joëlle Baraka — Fondatrice OFAC" loading="lazy" />
          </div>
          <div className="about-text reveal-right">
            <div className="section-label">Leadership</div>
            <h2 className="section-title">Joëlle Baraka</h2>
            <div className="section-divider" />
            <div className="founder-role" data-fr>Représentante légale &amp; Fondatrice</div>
            <div className="founder-role" data-en>Legal Representative &amp; Founder</div>
            <p className="founder-intro" data-fr>ONCE FOR ALL COMPANY SARL est née d&apos;une réalité visible chaque jour : des déchets plastiques envahissent nos rues, nos quartiers et notre environnement. Face à cette situation, <strong>BARAKA BIRINGANINE JOËLLE</strong> n&apos;a pas voulu rester spectatrice.</p>
            <p className="founder-intro" data-en>ONCE FOR ALL COMPANY LLC was born from a reality we witness every day: plastic waste is invading our streets, neighborhoods, and environment. Faced with this situation, <strong>BARAKA BIRINGANINE JOËLLE</strong> refused to remain a mere spectator.</p>
            <p data-fr>Jeune entrepreneure passionnée par le développement durable et l&apos;impact social, elle a décidé de transformer un problème majeur en opportunité concrète. Elle a lancé OFAC SARL RDC avec un objectif : réduire la pollution plastique tout en créant des solutions économiques locales.</p>
            <p data-en>As a young entrepreneur passionate about sustainable development and social impact, she decided to turn a major problem into a concrete opportunity. She launched OFAC SARL RDC with one goal: reducing plastic pollution while creating local economic solutions.</p>
            <div className="founder-achievements" data-fr>
              <div className="founder-ach-title">En quelques années, OFAC SARL RDC a réussi à :</div>
              <ul className="founder-list"><li>Mettre en place une activité de recyclage opérationnelle</li><li>Réaliser ses premières ventes</li><li>Attirer de nouveaux clients et partenaires</li></ul>
            </div>
            <div className="founder-achievements" data-en>
              <div className="founder-ach-title">In just a few years, OFAC SARL RDC has succeeded in:</div>
              <ul className="founder-list"><li>Establishing an operational recycling activity</li><li>Making its first sales</li><li>Attracting new clients and partners</li></ul>
            </div>
            <blockquote className="founder-quote" data-fr>&quot;Faire d&apos;OFAC SARL RDC une entreprise de référence en Afrique dans la transformation des déchets plastiques en matériaux durables.&quot;</blockquote>
            <blockquote className="founder-quote" data-en>&quot;To make OFAC SARL RDC a leading company in Africa in the transformation of plastic waste into sustainable materials.&quot;</blockquote>
            <p className="founder-belief" data-fr>Son engagement va au-delà du business — elle croit profondément que les jeunes africains peuvent être des acteurs du changement, en construisant des solutions locales aux problèmes locaux.</p>
            <p className="founder-belief" data-en>Her commitment goes beyond business — she deeply believes that young Africans can be agents of change by building local solutions to local problems.</p>
            <div className="founder-cta" data-fr>Ensemble, transformons les déchets en opportunités. Rejoignez le mouvement.</div>
            <div className="founder-cta" data-en>Together, let&apos;s transform waste into opportunities. Join the movement.</div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story">
        <div className="story-inner">
          <div className="reveal">
            <div className="section-label" data-fr>Notre Histoire</div>
            <div className="section-label" data-en>Our Story</div>
            <h2 className="section-title" data-fr>L&apos;Histoire<br />d&apos;<span style={{ color: "var(--red)" }}>OFAC</span></h2>
            <h2 className="section-title" data-en>The Story<br />of <span style={{ color: "var(--red)" }}>OFAC</span></h2>
          </div>
          <div className="story-timeline">
            <div className="story-item reveal">
              <div className="story-year">2020</div>
              <h3 data-fr>La naissance d&apos;une idée</h3><h3 data-en>The birth of an idea</h3>
              <p data-fr>Face à la crise plastique grandissante, les fondateurs d&apos;OFAC décident de transformer le problème en opportunité. La vision : recycler le plastique pour créer des matériaux de construction durables.</p>
              <p data-en>Faced with the growing plastic crisis, OFAC&apos;s founders decided to transform the problem into an opportunity. The vision: recycle plastic to create durable building materials.</p>
            </div>
            <div className="story-item reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="story-year">2021</div>
              <h3 data-fr>Premier site de collecte</h3><h3 data-en>First collection site</h3>
              <p data-fr>Ouverture du premier centre de collecte et de tri. Les premières familles rejoignent l&apos;initiative, marquant le début d&apos;un mouvement communautaire fort.</p>
              <p data-en>Opening of the first collection and sorting center. The first families join the initiative, marking the beginning of a strong community movement.</p>
            </div>
            <div className="story-item reveal" style={{ transitionDelay: "0.3s" }}>
              <div className="story-year">2022</div>
              <h3 data-fr>Production des premiers pavés</h3><h3 data-en>First paving stones produced</h3>
              <p data-fr>OFAC lance sa ligne de production de pavés écologiques. Une technologie innovante qui transforme les déchets plastiques en matériaux résistants pour la construction de routes et trottoirs.</p>
              <p data-en>OFAC launches its ecological paving stone production line. An innovative technology that transforms plastic waste into durable materials for road and sidewalk construction.</p>
            </div>
            <div className="story-item reveal" style={{ transitionDelay: "0.45s" }}>
              <div className="story-year">2024</div>
              <h3 data-fr>Expansion &amp; Croissance</h3><h3 data-en>Expansion &amp; Growth</h3>
              <p data-fr>OFAC a déjà recyclé plus de 10 tonnes de plastique, produit plus de 10 700 pavés et créé 26 emplois — et continue de croître. Un modèle qui prouve que l&apos;écologie et l&apos;économie peuvent avancer ensemble.</p>
              <p data-en>OFAC has already recycled over 10 tonnes of plastic, produced more than 10,700 paving stones and created 26 jobs — and keeps growing. A model proving that ecology and economy can advance together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal">
            <div className="section-label" data-fr>Ce que nous faisons</div>
            <div className="section-label" data-en>What We Do</div>
            <h2 className="section-title" data-fr>Nos <span style={{ color: "var(--red)" }}>Activités</span></h2>
            <h2 className="section-title" data-en>Our <span style={{ color: "var(--red)" }}>Activities</span></h2>
          </div>
          <div className="activities-grid">
            {[
              { img: "recycl.jpg", num: "01", tagFr: "Recyclage", tagEn: "Recycling", icon: "♻️", tFr: "Recyclage Plastique", tEn: "Plastic Recycling", pFr: "Collecte, tri et transformation des déchets plastiques en matières premières valorisables pour une économie circulaire locale.", pEn: "Collection, sorting and transformation of plastic waste into valuable raw materials for a local circular economy." },
              { img: "paves1.jpg", num: "02", tagFr: "Production", tagEn: "Production", icon: "🧱", tFr: "Pavés Écologiques", tEn: "Eco-Paving Stones", pFr: "Production de pavés durables à base de plastique recyclé — résistants, économiques, et respectueux de l'environnement.", pEn: "Production of durable paving stones from recycled plastic — resilient, cost-effective, and eco-friendly." },
              { img: "sensibilisation.jpg", num: "03", tagFr: "Sensibilisation", tagEn: "Awareness", icon: "📢", tFr: "Sensibilisation", tEn: "Community Awareness", pFr: "Campagnes éducatives et mobilisation communautaire pour changer les comportements face à la pollution plastique.", pEn: "Educational campaigns and community mobilization to shift behaviors around plastic pollution." },
              { img: "activite_emploi.jpg", num: "04", tagFr: "Emploi", tagEn: "Employment", icon: "👷", tFr: "Création d'Emplois", tEn: "Job Creation", pFr: "Chaque centre OFAC génère des emplois directs et indirects pour les jeunes et les femmes de la communauté.", pEn: "Every OFAC center generates direct and indirect jobs for youth and women in the community." },
              { img: "paves2.jpg", num: "05", tagFr: "Commerce", tagEn: "Commerce", icon: "🧱", tFr: "Vente de Pavés Écologiques", tEn: "Eco-Paving Stone Sales", pFr: "Nos pavés écologiques sont disponibles à la vente : 1 m² = 25 pièces à 15 $. Durables, résistants et fabriqués à partir de déchets plastiques recyclés.", pEn: "Our eco-paving stones are available for purchase: 1 m² = 25 pieces at $15. Durable, resistant, and made from recycled plastic waste." },
              { img: "sensibilisation1.jpg", num: "06", tagFr: "Formation", tagEn: "Training", icon: "🎓", tFr: "Formation Économie Verte", tEn: "Green Economy Training", pFr: "Semaine 1 (en ligne) : théorie sur la gestion de projets, le recyclage et l'entrepreneuriat vert. Semaine 2 (en présentiel) : pratique — transformation des déchets en pavés. À la fin : un projet écrit + un certificat.", pEn: "Week 1 (online): theory on project management, recycling & green entrepreneurship. Week 2 (in-person): hands-on transforming plastic waste into paving stones. Graduates receive a written project + a certificate." },
            ].map((a, i) => (
              <div className="activity-card reveal" key={a.num} style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={`/images/${a.img}`} alt={a.tFr} loading="lazy" />
                <div className="activity-overlay">
                  <span className="activity-num">{a.num}</span>
                  <div className="activity-tag" data-fr>{a.tagFr}</div>
                  <div className="activity-tag" data-en>{a.tagEn}</div>
                  <div className="activity-icon">{a.icon}</div>
                  <h3 data-fr>{a.tFr}</h3><h3 data-en>{a.tEn}</h3>
                  <p data-fr>{a.pFr}</p><p data-en>{a.pEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact">
        <div className="impact-inner">
          <div className="reveal">
            <div className="section-label" data-fr>Depuis notre lancement</div>
            <div className="section-label" data-en>Since our launch</div>
            <h2 className="section-title" data-fr>Notre <span style={{ color: "var(--red)" }}>Impact</span></h2>
            <h2 className="section-title" data-en>Our <span style={{ color: "var(--red)" }}>Impact</span></h2>
          </div>
          <div className="impact-stats">
            {impact.map((s, i) => (
              <div className="impact-stat reveal" key={s.key} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-num counter" data-target={s.value}>0</div>
                {s.unit ? <span className="stat-unit">{s.unit}</span> : null}
                <div className="stat-desc" data-fr>{s.label_fr}</div>
                <div className="stat-desc" data-en>{s.label_en}</div>
              </div>
            ))}
          </div>
          <div className="impact-bar-section reveal">
            {[
              { fr: "Collecte plastique", en: "Plastic collection", w: 87 },
              { fr: "Production pavés", en: "Paving production", w: 74 },
              { fr: "Zones sensibilisées", en: "Areas sensitized", w: 91 },
              { fr: "Création d'emplois", en: "Job creation", w: 62 },
            ].map((b) => (
              <div className="impact-bar-item" key={b.en}>
                <div className="impact-bar-label">
                  <span data-fr>{b.fr}</span><span data-en>{b.en}</span>
                  <span>{b.w}%</span>
                </div>
                <div className="impact-bar-track"><div className="impact-bar-fill" data-width={b.w} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal">
            <div className="section-label" data-fr>Terrain &amp; Projets</div>
            <div className="section-label" data-en>Field &amp; Projects</div>
            <h2 className="section-title" data-fr>La Réalité<br />du <span style={{ color: "var(--red)" }}>Terrain</span></h2>
            <h2 className="section-title" data-en>The Reality<br />on the <span style={{ color: "var(--red)" }}>Ground</span></h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((g, i) => (
              <div className="gallery-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={g.image_url} alt={g.caption_fr || "OFAC"} loading="lazy" />
                <div className="gallery-caption" data-fr>{g.caption_fr}</div>
                <div className="gallery-caption" data-en>{g.caption_en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTUALITÉS (dynamique) */}
      {posts.length > 0 && (
        <section id="actualites" style={{ background: "var(--deep)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 50 }}>
              <div className="section-label" data-fr>Dernières nouvelles</div>
              <div className="section-label" data-en>Latest news</div>
              <h2 className="section-title" data-fr>Nos <span style={{ color: "var(--red)" }}>Actualités</span></h2>
              <h2 className="section-title" data-en>Our <span style={{ color: "var(--red)" }}>News</span></h2>
            </div>
            <div className="activities-grid">
              {posts.slice(0, 6).map((p) => (
                <a className="activity-card reveal" href={`/actualites/${p.slug}`} key={p.id} style={{ display: "block" }}>
                  {p.cover_url ? <img src={p.cover_url} alt={p.title_fr} loading="lazy" /> : null}
                  <div className="activity-overlay" style={{ position: "static", opacity: 1, transform: "none", padding: 24 }}>
                    <h3 data-fr>{p.title_fr}</h3><h3 data-en>{p.title_en || p.title_fr}</h3>
                    <p data-fr>{p.excerpt_fr}</p><p data-en>{p.excerpt_en || p.excerpt_fr}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="cta">
        <div className="section-label" data-fr>Rejoignez-nous</div>
        <div className="section-label" data-en>Join Us</div>
        <h2 data-fr>ENSEMBLE,<br />CHANGEONS<br />LE MONDE</h2>
        <h2 data-en>TOGETHER,<br />LET&apos;S CHANGE<br />THE WORLD</h2>
        <p data-fr>Que vous soyez partenaire, investisseur, client ou simple citoyen engagé — votre soutien amplifie notre impact. Rejoignez le mouvement OFAC.</p>
        <p data-en>Whether you&apos;re a partner, investor, customer, or engaged citizen — your support amplifies our impact. Join the OFAC movement.</p>
        <div className="cta-buttons">
          <a href="#contact" className="btn-white" data-fr>Devenir Partenaire</a>
          <a href="#contact" className="btn-white" data-en>Become a Partner</a>
          <a href="#contact" className="btn-outline-white" data-fr>Soutenir la Mission</a>
          <a href="#contact" className="btn-outline-white" data-en>Support the Mission</a>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section id="partenaires" style={{ background: "var(--deep)" }}>
        <div className="partners-inner">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" data-fr>Ils nous font confiance</div>
            <div className="section-label" data-en>They trust us</div>
            <h2 className="section-title" data-fr>Nos <span style={{ color: "var(--red)" }}>Partenaires</span></h2>
            <h2 className="section-title" data-en>Our <span style={{ color: "var(--red)" }}>Partners</span></h2>
          </div>
          <div className="partners-grid">
            {partners.map((p, i) => (
              <div className="partner-logo reveal" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
                {p.logo_url ? (
                  <img src={p.logo_url} alt={p.name} className="partner-img" loading="lazy" />
                ) : (
                  <div className="partner-ph-icon">{p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</div>
                )}
                <span className="partner-ph-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECONNAISSANCES */}
      <section id="reconnaissances" style={{ background: "var(--black)" }}>
        <div className="recog-inner">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" data-fr>Notre Crédibilité</div>
            <div className="section-label" data-en>Our Credibility</div>
            <h2 className="section-title" data-fr>Reconnaissances &amp;<br /><span style={{ color: "var(--red)" }}>Certifications</span></h2>
            <h2 className="section-title" data-en>Recognitions &amp;<br /><span style={{ color: "var(--red)" }}>Certifications</span></h2>
          </div>
          <div className="recog-grid">
            {[
              { icon: "fa-award", year: "2023", tFr: "Enregistrement Officiel", tEn: "Official Registration", dFr: "ONCE FOR ALL COMPANY SARL — société légalement enregistrée en RDC", dEn: "ONCE FOR ALL COMPANY SARL — legally registered company in the DRC" },
              { icon: "fa-leaf", year: "À venir", tFr: "Certification Environnementale", tEn: "Environmental Certification", dFr: "Certification en cours d'obtention", dEn: "Certification in progress" },
              { icon: "fa-handshake", year: "2024", tFr: "Reconnaissance Partenaire", tEn: "Partner Recognition", dFr: "Reconnaissance par nos partenaires institutionnels", dEn: "Recognized by our institutional partners" },
              { icon: "fa-trophy", year: "2024", tFr: "Prix Impact Social", tEn: "Social Impact Award", dFr: "Catégorie entrepreneuriat durable", dEn: "Sustainable entrepreneurship category" },
              { icon: "fa-certificate", year: "À venir", tFr: "Certification Qualité", tEn: "Quality Certification", dFr: "Produits & processus", dEn: "Products & processes" },
              { icon: "fa-globe-africa", year: "À venir", tFr: "Label Vert Africain", tEn: "African Green Label", dFr: "Initiative régionale", dEn: "Regional initiative" },
            ].map((r, i) => (
              <div className="recog-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="recog-badge"><i className={`fa-solid ${r.icon}`} /></div>
                <div className="recog-body">
                  <div className="recog-year">{r.year}</div>
                  <h4 className="recog-title" data-fr>{r.tFr}</h4><h4 className="recog-title" data-en>{r.tEn}</h4>
                  <p className="recog-desc" data-fr>{r.dFr}</p><p className="recog-desc" data-en>{r.dEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="reveal-left">
            <div className="section-label" data-fr>Parlez-nous</div>
            <div className="section-label" data-en>Talk to Us</div>
            <h2 className="contact-info" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,60px)", lineHeight: 0.95, marginBottom: 24 }} data-fr>Travaillons<br /><span style={{ color: "var(--red)" }}>ensemble</span></h2>
            <h2 className="contact-info" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,60px)", lineHeight: 0.95, marginBottom: 24 }} data-en>Let&apos;s work<br /><span style={{ color: "var(--red)" }}>together</span></h2>
            <p style={{ color: "var(--white)", fontSize: 16, marginBottom: 40, lineHeight: 1.8, fontWeight: 700 }} data-fr>Que ce soit pour un partenariat, un investissement ou simplement pour en savoir plus sur notre mission — nous sommes là pour vous répondre.</p>
            <p style={{ color: "var(--white)", fontSize: 16, marginBottom: 40, lineHeight: 1.8, fontWeight: 700 }} data-en>Whether for a partnership, investment, or simply to learn more about our mission — we&apos;re here to respond to you.</p>
            <div className="contact-items">
              <a href="https://wa.me/243971969157" className="contact-item" target="_blank" rel="noopener noreferrer">
                <div className="contact-item-icon"><i className="fa-brands fa-whatsapp" /></div>
                <div className="contact-item-text"><h4>WhatsApp</h4><p>+243971969157</p></div>
              </a>
              <a href="mailto:onceforallcompanysarl@gmail.com" className="contact-item">
                <div className="contact-item-icon"><i className="fa-brands fa-google" /></div>
                <div className="contact-item-text"><h4>Email</h4><p>onceforallcompanysarl@gmail.com</p></div>
              </a>
              <a href="tel:+243971969157" className="contact-item">
                <div className="contact-item-icon"><i className="fa-solid fa-phone" /></div>
                <div className="contact-item-text"><h4 data-fr>Téléphone</h4><h4 data-en>Phone</h4><p>+243 971 969 157</p></div>
              </a>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text"><h4 data-fr>Localisation</h4><h4 data-en>Location</h4><p data-fr>Afrique, RDC, Sud-Kivu, Bukavu</p><p data-en>Africa, DRC, South-Kivu, Bukavu</p></div>
              </div>
            </div>
            <div className="social-links" style={{ marginTop: 24 }}>
              <a className="social-link" href="https://www.facebook.com/profile.php?id=61559867910546" target="_blank" title="Facebook" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
              <a className="social-link instagram-link" href="https://www.instagram.com/__onceforallcompany" target="_blank" title="Instagram" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
            </div>
          </div>
          <div className="reveal-right">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={images.logo} alt="OFAC Logo" style={{ height: 60, width: "auto", background: "white", borderRadius: 8, padding: "4px 8px", marginBottom: 16 }} />
            <p data-fr>Once For All Company — Transformer les déchets plastiques en ressources durables pour un avenir meilleur en Afrique.</p>
            <p data-en>Once For All Company — Transforming plastic waste into sustainable resources for a better future in Africa.</p>
          </div>
          <div className="footer-col">
            <h4 data-fr>Navigation</h4><h4 data-en>Navigation</h4>
            <ul>
              <li><a href="#about" data-fr>À Propos</a><a href="#about" data-en>About</a></li>
              <li><a href="#activities" data-fr>Activités</a><a href="#activities" data-en>Activities</a></li>
              <li><a href="#impact">Impact</a></li>
              <li><a href="#gallery" data-fr>Galerie</a><a href="#gallery" data-en>Gallery</a></li>
              <li><a href="#partenaires" data-fr>Partenaires</a><a href="#partenaires" data-en>Partners</a></li>
              <li><a href="#reconnaissances" data-fr>Reconnaissances</a><a href="#reconnaissances" data-en>Awards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 data-fr>Services</h4><h4 data-en>Services</h4>
            <ul>
              <li><a href="#activities" data-fr>Recyclage Plastique</a><a href="#activities" data-en>Plastic Recycling</a></li>
              <li><a href="#activities" data-fr>Pavés Écologiques</a><a href="#activities" data-en>Eco-Paving</a></li>
              <li><a href="#activities" data-fr>Sensibilisation</a><a href="#activities" data-en>Awareness</a></li>
              <li><a href="#activities" data-fr>Formation Éco</a><a href="#activities" data-en>Green Training</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/243971969157">WhatsApp</a></li>
              <li><a href="mailto:onceforallcompanysarl@gmail.com">Email</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61559867910546">Facebook</a></li>
              <li><a href="https://www.instagram.com/__onceforallcompany" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OFAC — Once For All Company. <span data-fr>Tous droits réservés.</span><span data-en>All rights reserved.</span></span>
          <span data-fr>Conçu pour la planète</span>
          <span data-en>Made for the planet</span>
        </div>
      </footer>

      {/* POWERED BY */}
      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "14px 24px", textAlign: "center" }}>
        <a href="https://ptvagency.netlify.app" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center", textDecoration: "none" }}>
          <span style={{ color: "#666", fontSize: 13, letterSpacing: "0.04em" }}>Powered by</span>
          <img src="/images/ptv.jpg" alt="Pour Ta Visibilité" style={{ height: 36, width: "auto", objectFit: "contain", borderRadius: 4 }} />
          <span style={{ color: "#999", fontSize: 13, letterSpacing: "0.04em" }}>pour ta visibilité</span>
        </a>
      </div>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/243971969157" target="_blank" className="whatsapp-float" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp" />
      </a>
    </>
  );
}
