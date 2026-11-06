import { useEffect, useRef, useState } from 'react';
import laptopCat from './assets/characters/laptop-cat.png';
import csssCorgi from './assets/characters/csss-corgi.png';
import chillPenguin from './assets/characters/chill-penguin.png';

const services = [
  { icon: '☕', title: 'Free Breakfast', copy: 'Start your day with community, coffee, and something good to eat.' },
  { icon: '♟', title: 'Board Games', copy: 'Drop in, meet someone new, and stay for one more round.' },
  { icon: '▣', title: 'Panels & Talks', copy: 'Hear honest advice from students, alumni, and people in industry.' },
  { icon: 'i', title: 'Info Sessions', copy: 'Get the details on courses, co-op, careers, and opportunities.' },
];

const volunteerOptions = [
  {
    label: 'Volunteer for an Event',
    command: 'event-volunteer',
    copy: 'Help welcome attendees, set up spaces, support activities, and make CSSS events happen.',
    image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    alt: 'Volunteers working together at an event',
  },
  {
    label: 'Become an Executive',
    command: 'executive',
    copy: 'Lead a portfolio, shape society priorities, and represent students across the department.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    alt: 'A student leadership team meeting around a table',
  },
  {
    label: 'Become an Officer',
    command: 'officer',
    copy: 'Join a focused team, build practical experience, and contribute to projects throughout the year.',
    image: 'https://images.unsplash.com/photo-1555734521-b104e271023f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    alt: 'A student club team gathering for a group photo',
  },
];

const eventSlides = ['Website', 'Discord', 'Instagram', 'Email'];

const sponsors = [
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', url: 'https://www.amazon.com/' },
  { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', url: 'https://www.apple.com/' },
  { name: "Arc'teryx", logo: 'https://logo.clearbit.com/arcteryx.com', url: 'https://arcteryx.com/' },
  { name: 'Atlassian', logo: 'https://logo.clearbit.com/atlassian.com', url: 'https://www.atlassian.com/' },
  { name: 'Electronic Arts', logo: 'https://logo.clearbit.com/ea.com', url: 'https://www.ea.com/' },
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com', url: 'https://www.google.com/' },
  { name: 'Jane Street', logo: 'https://logo.clearbit.com/janestreet.com', url: 'https://www.janestreet.com/' },
  { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com', url: 'https://www.meta.com/' },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', url: 'https://www.microsoft.com/' },
  { name: 'TELUS', logo: 'https://logo.clearbit.com/telus.com', url: 'https://www.telus.com/' },
];

const footerCubeFaces = [
  { side: 'front', colors: ['var(--bright)', 'var(--white)', 'var(--blue)', 'var(--navy)', 'var(--bright)', 'var(--white)', 'var(--pale)', 'var(--blue)', 'var(--navy)'] },
  { side: 'back', colors: ['var(--navy)', 'var(--pale)', 'var(--bright)', 'var(--white)', 'var(--blue)', 'var(--navy)', 'var(--bright)', 'var(--white)', 'var(--mid)'] },
  { side: 'right', colors: ['var(--white)', 'var(--bright)', 'var(--navy)', 'var(--pale)', 'var(--blue)', 'var(--white)', 'var(--mid)', 'var(--bright)', 'var(--navy)'] },
  { side: 'left', colors: ['var(--blue)', 'var(--navy)', 'var(--pale)', 'var(--white)', 'var(--bright)', 'var(--mid)', 'var(--navy)', 'var(--white)', 'var(--blue)'] },
  { side: 'top', colors: ['var(--white)', 'var(--pale)', 'var(--white)', 'var(--bright)', 'var(--white)', 'var(--blue)', 'var(--navy)', 'var(--pale)', 'var(--white)'] },
  { side: 'bottom', colors: ['var(--navy)', 'var(--mid)', 'var(--bright)', 'var(--blue)', 'var(--navy)', 'var(--pale)', 'var(--white)', 'var(--blue)', 'var(--deep)'] },
];

function Arrow({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return <span aria-hidden="true">{direction === 'left' ? '←' : '→'}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(0);
  const [volunteerPath, setVolunteerPath] = useState(volunteerOptions[0].label);
  const [cubeFace, setCubeFace] = useState(0);
  const [eventSlide, setEventSlide] = useState(0);
  const [galleryDirection, setGalleryDirection] = useState<'forward' | 'backward'>('forward');
  const [footerCubeRotation, setFooterCubeRotation] = useState({ x: -24, y: 34 });
  const [footerCubeDragging, setFooterCubeDragging] = useState(false);
  const lastGalleryScroll = useRef(0);
  const galleryTouchStart = useRef<number | null>(null);
  const footerCubeDrag = useRef<{ pointerId: number; x: number; rotationY: number } | null>(null);
  const selectedVolunteerPath = volunteerOptions.find((option) => option.label === volunteerPath) ?? volunteerOptions[0];

  useEffect(() => {
    const timer = window.setInterval(() => setCubeFace((face) => (face + 1) % 4), 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setEventSlide((slide) => (slide + 1) % eventSlides.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  const moveService = (amount: number) => {
    setGalleryDirection(amount > 0 ? 'forward' : 'backward');
    setService((current) => (current + amount + services.length) % services.length);
  };

  const scrollGallery = (event: React.WheelEvent<HTMLElement>) => {
    const horizontalDelta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
    const now = Date.now();
    if (Math.abs(horizontalDelta) < 12 || now - lastGalleryScroll.current < 450) return;
    lastGalleryScroll.current = now;
    moveService(horizontalDelta > 0 ? 1 : -1);
  };

  const finishGallerySwipe = (event: React.TouchEvent<HTMLElement>) => {
    if (galleryTouchStart.current === null) return;
    const distance = galleryTouchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 45) moveService(distance > 0 ? 1 : -1);
    galleryTouchStart.current = null;
  };

  const startFooterCubeDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    footerCubeDrag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      rotationY: footerCubeRotation.y,
    };
    setFooterCubeDragging(true);
  };

  const moveFooterCube = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = footerCubeDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setFooterCubeRotation({
      x: -24,
      y: drag.rotationY + (event.clientX - drag.x) * .55,
    });
  };

  const stopFooterCubeDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (footerCubeDrag.current?.pointerId !== event.pointerId) return;
    footerCubeDrag.current = null;
    setFooterCubeDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleFooterCubeKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyMoves: Record<string, number> = {
      ArrowLeft: -12,
      ArrowRight: 12,
    };
    if (keyMoves[event.key]) {
      event.preventDefault();
      setFooterCubeRotation((rotation) => ({
        x: -24,
        y: rotation.y + keyMoves[event.key],
      }));
    }
  };

  return (
    <main>
      <div className="square-path" aria-hidden="true">
        {Array.from({ length: 42 }, (_, index) => <span key={index} />)}
      </div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="UBC CSSS home">
          <span className="brand-mark"><i /><i /><i /><i /></span>
          <span>UBC CSSS</span>
        </a>
        <nav id="mobile-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#sponsors" onClick={() => setMenuOpen(false)}>Sponsors</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#involved" onClick={() => setMenuOpen(false)}>Get Involved</a>
          <a href="#technical-career-fair" onClick={() => setMenuOpen(false)}>Technical Career Fair</a>
          <a href="#research-conference" onClick={() => setMenuOpen(false)}>Research Conference</a>
        </nav>
        <form className="header-search" role="search" action="https://www.google.com/search" method="get" target="_blank">
          <input type="hidden" name="sitesearch" value="ubccsss.org" />
          <input type="search" name="q" aria-label="Search UBC CSSS" placeholder="Search" />
          <button type="submit" aria-label="Submit search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
          </button>
        </form>
        <button
          className={menuOpen ? 'mobile-menu-button open' : 'mobile-menu-button'}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span /><span /><span />
        </button>
      </header>

      <section className="hero" id="home">
        <div className="code-confetti" aria-hidden="true">
          <span>{'{ }'}</span><span>&lt;/&gt;</span><span>01</span><span>++</span><span>/* hi */</span>
        </div>
        <div className="hero-copy">
          <h1>UBC Computer Science Student Society</h1>
          <p className="lede">Welcome to the Computer Science Student Society, the student club for undergraduates at the UBC Department of Computer Science. We provide a social space where everyone’s welcome (in ICICS 021), run events, and represent your interests to the department.</p>
          <div className="hero-actions">
            <a className="button primary" href="#join">Join Discord</a>
            <a className="button instagram" href="https://www.instagram.com/ubccsss/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-link" href="#services">See what we do <span>↓</span></a>
          </div>
        </div>
        <div className="cube-stage" aria-label="Interactive CSSS cube">
          <div className={`cube cube-${cubeFace}`}>
            <div className="cube-side front">C</div><div className="cube-side back">S</div>
            <div className="cube-side right">S</div><div className="cube-side left">UBC</div>
            <div className="cube-side top">⌘</div><div className="cube-side bottom">01</div>
          </div>
          <button onClick={() => setCubeFace((cubeFace + 1) % 4)} className="spin-control">
            <span>Drag the cube</span><b>↻</b>
          </button>
        </div>
        <p className="scroll-note">Keep scrolling <span>↓</span></p>
      </section>

      <div className="community-ticker" aria-hidden="true">
        <div>
          <span>EVENTS</span><i /> <span>SNACKS</span><i /> <span>FRIENDS</span><i /> <span>SUPPORT</span><i />
          <span>BOARD GAMES</span><i /> <span>BIG IDEAS</span><i /> <span>EVENTS</span><i /> <span>SNACKS</span><i />
          <span>FRIENDS</span><i /> <span>SUPPORT</span><i /> <span>BOARD GAMES</span><i /> <span>BIG IDEAS</span><i />
        </div>
      </div>

      <section className="join section" id="join">
        <div className="heading-with-perch">
          <h2>How do I<br />join?</h2>
          <p className="join-answer">You don’t have to! As long as you’re a Computer Science student, you’re a member!</p>
          <img className="character character-join" src={chillPenguin} alt="Penguin listening to music beside ice cubes" />
        </div>
        <figure className="join-photo">
          <img
            src="https://images.unsplash.com/photo-1730173737002-67e5b10d1182?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
            alt="University students walking together on campus"
          />
        </figure>
      </section>

      <section
        className="services section"
        id="services"
        onWheel={scrollGallery}
        onTouchStart={(event) => { galleryTouchStart.current = event.touches[0].clientX; }}
        onTouchEnd={finishGallerySwipe}
      >
        <div className="section-heading">
          <div><h2>What can we<br />do for you?</h2></div>
          <img className="character character-services" src={csssCorgi} alt="Glasses-wearing character printing a UBC CSSS message" />
          <div className="carousel-controls">
            <button onClick={() => moveService(-1)} aria-label="Previous service"><Arrow direction="left" /></button>
            <span>{service + 1} / {services.length}</span>
            <button onClick={() => moveService(1)} aria-label="Next service"><Arrow /></button>
          </div>
        </div>
        <div className={`service-track moving-${galleryDirection}`}>
          {services.map((item, index) => (
            <article
              className={`service-card card-position-${(index - service + services.length) % services.length}`}
              key={item.title}
              onClick={() => setService(index)}
            >
              <span className="service-icon">{item.icon}</span><p>0{index + 1}</p><h3>{item.title}</h3><div>{item.copy}</div>
            </article>
          ))}
        </div>
        <p className="gallery-hint"><b>←</b><span>Scroll sideways</span> to flip through the gallery <b>→</b></p>
      </section>

      <section className="involved section" id="involved">
        <div className="involved-copy">
          <h2>Get involved.</h2>
          <p>How do I find out about events?</p>
          <div className="involved-links">
            <a href="#events"><span>01</span>Find them here on our website <Arrow /></a>
            <a href="#join"><span>02</span>Join our Discord server <Arrow /></a>
            <a href="https://www.instagram.com/ubccsss/" target="_blank" rel="noreferrer"><span>03</span>Follow us on Instagram <Arrow /></a>
            <a href="#involved"><span>04</span>Keep an eye out in the weekly department emails <Arrow /></a>
          </div>
        </div>
        <div className="event-devices">
          <div className="event-laptop" aria-label={`${eventSlides[eventSlide]} event updates illustration`}>
            <div className="laptop-screen">
              <span className="laptop-camera" aria-hidden="true" />
              <div className="event-slides" aria-live="polite">
              <div className={eventSlide === 0 ? 'event-slide website-slide active' : 'event-slide website-slide'} aria-hidden={eventSlide !== 0}>
                <div className="browser-bar"><i /><i /><i /><span>ubccsss.org/events</span></div>
                <div className="website-hero"><b>Upcoming events</b><span /></div>
                <div className="website-cards"><i /><i /><i /></div>
              </div>
              <div className={eventSlide === 1 ? 'event-slide discord-slide active' : 'event-slide discord-slide'} aria-hidden={eventSlide !== 1}>
                <div className="discord-mark">
                  <span className="discord-eye left" /><span className="discord-eye right" /><i />
                </div>
                <b>CSSS Discord</b>
                <span>Events, reminders, and community updates</span>
              </div>
              <div className={eventSlide === 2 ? 'event-slide instagram-slide active' : 'event-slide instagram-slide'} aria-hidden={eventSlide !== 2}>
                <div className="instagram-post">
                  <div className="instagram-profile"><i /><span>@ubccsss</span></div>
                  <div className="instagram-image"><i /><i /><i /></div>
                  <div className="instagram-actions"><span>♡</span><span>○</span><b>Event this week</b></div>
                </div>
              </div>
              <div className={eventSlide === 3 ? 'event-slide email-slide active' : 'event-slide email-slide'} aria-hidden={eventSlide !== 3}>
                <div className="email-envelope"><i /><span /></div>
                <div className="email-copy"><b>Weekly department email</b><i /><i /><i /></div>
              </div>
              </div>
              <div className="event-slide-controls" aria-label="Choose event updates illustration">
                {eventSlides.map((slide, index) => (
                  <button
                    className={eventSlide === index ? 'active' : ''}
                    onClick={() => setEventSlide(index)}
                    aria-label={`Show ${slide} illustration`}
                    aria-pressed={eventSlide === index}
                    key={slide}
                  />
                ))}
              </div>
            </div>
            <div className="laptop-base"><span /></div>
          </div>
          <div className="event-phone" aria-hidden="true">
            <span className="phone-speaker" />
            <div className="phone-screen">
              <div className={eventSlide === 0 ? 'phone-slide phone-website active' : 'phone-slide phone-website'}>
                <b>EVENTS</b><i /><i /><i />
              </div>
              <div className={eventSlide === 1 ? 'phone-slide phone-discord active' : 'phone-slide phone-discord'}>
                <div className="phone-discord-mark"><i /><i /></div>
                <b>CSSS Discord</b><span>3 new updates</span>
              </div>
              <div className={eventSlide === 2 ? 'phone-slide phone-instagram active' : 'phone-slide phone-instagram'}>
                <div><i /><b>@ubccsss</b></div><span /><small>♡ &nbsp; ○</small>
              </div>
              <div className={eventSlide === 3 ? 'phone-slide phone-email active' : 'phone-slide phone-email'}>
                <div className="phone-envelope" /><b>Weekly update</b><i /><i /><i />
              </div>
            </div>
            <span className="phone-home" />
          </div>
        </div>
      </section>

      <section className="sponsor-banner" id="sponsors" aria-labelledby="sponsor-banner-title">
        <div className="sponsor-banner-label">
          <span>Supported by</span>
          <h2 id="sponsor-banner-title">Our sponsors</h2>
        </div>
        <div className="sponsor-viewport">
          <div className="sponsor-track">
            {[0, 1].map((groupIndex) => (
              <div className="sponsor-group" aria-hidden={groupIndex === 1} key={groupIndex}>
                {sponsors.map((sponsor) => (
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noreferrer"
                    className="sponsor-card"
                    tabIndex={groupIndex === 1 ? -1 : undefined}
                    key={`${groupIndex}-${sponsor.name}`}
                  >
                    <img src={sponsor.logo} alt="" loading="lazy" />
                    <span>{sponsor.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="identity volunteer section" id="about">
        <div className="volunteer-heading" id="volunteer">
          <h2>How can I<br />volunteer?</h2>
          <p>Just ask! We’re always happy to bring more people on board and looking for volunteers to help with our events. Our team organization has a three-layer reporting structure: the president, the other core executives, and the committees. The president and core executives are elected each spring, while committee members are appointed throughout the year. If you see a position that interests you, or just want to get involved, shoot us an e-mail.</p>
        </div>
        <div className="volunteer-choice">
          <div className="volunteer-image">
            <img
              key={selectedVolunteerPath.label}
              src={selectedVolunteerPath.image}
              alt={selectedVolunteerPath.alt}
              loading="lazy"
            />
            <span>{selectedVolunteerPath.label}</span>
          </div>
          <div className="degree-tabs" role="group" aria-label="Select a volunteer pathway">
            {volunteerOptions.map((option) => (
              <button
                className={volunteerPath === option.label ? 'active' : ''}
                onClick={() => setVolunteerPath(option.label)}
                aria-pressed={volunteerPath === option.label}
                key={option.label}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="degree-answer volunteer-terminal" aria-live="polite">
            <div className="volunteer-terminal-bar" aria-hidden="true">
              <div className="terminal-dots"><i /><i /><i /></div>
              <span>CSSS volunteer</span>
              <b>terminal</b>
            </div>
            <div className="volunteer-terminal-body" key={selectedVolunteerPath.command}>
              <p className="volunteer-command">
                <b>$</b> select {selectedVolunteerPath.command}
              </p>
              <div className="volunteer-output">
                <h3>{selectedVolunteerPath.label}</h3>
                <p>{selectedVolunteerPath.copy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cube-location section" id="cube">
        <div className="map-card">
          <div className="map-grid" /><span className="map-pin">CSSS<br />THE CUBE</span>
        </div>
        <div className="location-copy">
          <h2>Meet us at<br />The Cube.</h2>
          <p>Find snacks, supplies, friendly faces, and answers. We&apos;re in the ICICS building, just head down the stairs from the front door, turn right, and we’ll be at the end of the hallway, beside the undergraduate labs.</p>
          <div className="address"><span>Find us</span><b>ICICS ___<br />2366 Main Mall, UBC</b></div>
          <a className="button primary" href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions <Arrow /></a>
        </div>
      </section>

      <section className="menu-section section" id="events">
        <div><h2>Food at<br />the Cube.</h2><p>Grab some affordable brain fuel.</p></div>
        <div className="menu-stack">
          {[
            { title: 'Snacks', items: [['Granola bars', '$1.00'], ['Chips', '$1.50'], ['Candy', '$1.00']] },
            { title: 'Meals', items: [['Instant noodles', '$2.00'], ['Mac & cheese', '$2.50'], ['Soup', '$2.00']] },
            { title: 'Beverages', items: [['Coffee', '$1.50'], ['Tea', '$1.00'], ['Cold drinks', '$1.50']] },
          ].map((menu) => (
            <article className="menu-card" key={menu.title}>
              <h3>{menu.title}</h3>
              {menu.items.map(([name, price]) => (
                <div key={name}><span>{name}</span><i /><b>{price}</b></div>
              ))}
            </article>
          ))}
          <img className="character character-menu" src={laptopCat} alt="Cat debugging code on a laptop" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-directory">
          <div className="footer-intro">
            <h2>UBC Computer Science Student Society</h2>
            <p>A student society serving all Computer Science students.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div><b>Explore</b><a href="#about">About</a><a href="#services">Services</a><a href="#involved">Get involved</a></div>
            <div><b>Visit</b><a href="#cube">The Cube</a><a href="#events">Food at the Cube</a></div>
            <div><b>Connect</b><a href="https://www.instagram.com/ubccsss/" target="_blank" rel="noreferrer">Instagram</a><a href="#join">Discord</a></div>
          </nav>
        </div>

        <div className="footer-cube-scene">
          <div className="footer-rubik-stage">
            <div
              className={footerCubeDragging ? 'footer-cube-interaction dragging' : 'footer-cube-interaction'}
              role="group"
              tabIndex={0}
              aria-label="Interactive Rubik's cube. Drag left or right, or use the left and right arrow keys to rotate it."
              onPointerDown={startFooterCubeDrag}
              onPointerMove={moveFooterCube}
              onPointerUp={stopFooterCubeDrag}
              onPointerCancel={stopFooterCubeDrag}
              onKeyDown={handleFooterCubeKey}
            >
              <div
                className="footer-rubik-cube"
                style={{ transform: `rotateX(${footerCubeRotation.x}deg) rotateY(${footerCubeRotation.y}deg)` }}
              >
                {footerCubeFaces.map((face) => (
                  <div className={`rubik-face rubik-${face.side}`} key={face.side}>
                    {face.colors.map((color, stickerIndex) => (
                      <i
                        key={`${face.side}-${stickerIndex}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-table" aria-hidden="true"><span /></div>
          <a className="footer-table-back" href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
