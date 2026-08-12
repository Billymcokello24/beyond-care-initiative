import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Heart, Zap, Leaf, Star, Quote, Users, BookOpen, Globe, TrendingUp, ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Building, Search, Download, Upload, HelpCircle, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function HomePage() {
  const navigate = useNavigate();
  const [hp, setHp] = useState<any>({});
  const [stats, setStats] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    Promise.all([
      api.homepage(), api.stats(), api.highlights(), api.testimonials(),
      api.heroSlides(), api.programs(), api.events(), api.news(),
      api.partners(), api.projects(),
    ])
      .then(([h, s, hl, t, sl, p, e, n, pt, pr]) => {
        setHp(h || {}); setStats(s); setHighlights(hl); setTestimonials(t);
        setSlides(sl || []); setPrograms(p || []); setEvents(e || []); setNews(n || []);
        setPartners(pt || []); setProjects(pr || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const prevSlide = useCallback(() => setCurrentSlide(s => (s - 1 + slides.length) % slides.length), [slides.length]);
  const nextSlide = useCallback(() => setCurrentSlide(s => (s + 1) % slides.length), [slides.length]);

  const iconMap: Record<string, any> = { Heart, Zap, Leaf, Users, BookOpen, Globe, TrendingUp, Building, MapPin, Star };

  const resolveImage = (obj: any) => {
    const img = obj?.resolved_image || obj?.image || obj?.image_url || '';
    if (!img) return '';
    if (typeof img === 'string' && img.startsWith('http')) return img;
    return `http://localhost:8000${img}`;
  };

  if (loading) return <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-primary" style={{minHeight:'90vh'}}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* LEFT — text */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full bg-white/8 text-white/70 border border-white/8">
                <span className="w-2 h-2 rounded-full bg-accent" />{hp.hero_badge || 'Community-Based Organization'}
              </div>
              <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.12] tracking-tight mb-5"
                dangerouslySetInnerHTML={{
                  __html: (hp.hero_heading || 'Rethink, Reshape &amp; Restart Our Pathways')
                    .replace(/&amp;/g, '&').replace(/&/g, '<br/>')
                    .replace(/Restart/, '<span class="text-accent">Restart</span>')
                }}
              />
              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                {hp.hero_subtext || 'Beyond Care Initiative CBO is building healthy, empowered, and resilient communities across Bungoma County through health promotion, youth empowerment, and sustainable development.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate(hp.cta_primary_link || '/programs')} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm">
                  {hp.cta_primary_text || 'Explore Our Programs'} <ArrowRight size={15} />
                </button>
                <button onClick={() => navigate(hp.cta_secondary_link || '/about')} className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm">
                  {hp.cta_secondary_text || 'Learn About Us'}
                </button>
              </div>
            </div>

            {/* RIGHT — Slide (large rectangle) */}
            <div className="lg:col-span-2 w-full">
              {slides.length > 0 ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40" style={{width:'100%',aspectRatio:'4/3',maxHeight:'600px'}}>
                  {slides.map((slide, i) => (
                    <div key={slide.id || i} className={clx("absolute inset-0 transition-opacity duration-500", i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0')}>
                      <img src={resolveImage(slide)} alt={slide.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        {slide.category && <span className="inline-block text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-accent text-white mb-2">{slide.category}</span>}
                        <h3 className="font-['Montserrat'] font-bold text-white text-base md:text-lg leading-snug mb-1.5">{slide.caption}</h3>
                        {slide.description && <p className="text-white/65 text-xs leading-relaxed mb-3 line-clamp-2">{slide.description}</p>}
                        {slide.link_path && (
                          <button onClick={() => navigate(slide.link_path)} className="inline-flex items-center gap-1.5 text-white text-xs font-semibold hover:text-accent transition-colors group/slide">
                            {slide.link_text || 'Discover More'} <ExternalLink size={11} className="group-hover/slide:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Controls */}
                  <div className="absolute top-3 right-3 z-20 flex gap-1">
                    {slides.map((_, i) => (
                      <button key={i} onClick={() => setCurrentSlide(i)}
                        className={clx("h-1.5 rounded-full transition-all duration-300",
                          i === currentSlide ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50 w-1.5')} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-10" style={{width:'100%',aspectRatio:'4/3',maxHeight:'600px',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                  <span className="inline-block text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-accent text-white mb-2 w-fit">Announcement</span>
                  <h3 className="font-['Montserrat'] font-bold text-white text-base md:text-lg leading-snug mb-1.5">Beyond Care Initiative CBO</h3>
                  <p className="text-white/55 text-xs leading-relaxed mb-3">Building healthy, empowered, and resilient communities across Bungoma County, Kenya.</p>
                  <button onClick={() => navigate('/about')} className="inline-flex items-center gap-1.5 text-white text-xs font-semibold hover:text-accent transition-colors w-fit">
                    Discover More <ExternalLink size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. STATS BAR
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant">
            {stats.map(({ value, label, icon }) => {
              const Icon = iconMap[icon] || Users;
              return (
                <div key={label} className="flex flex-col items-center justify-center py-8 px-4">
                  <Icon size={20} className="text-primary/40 mb-2" />
                  <div className="font-['Montserrat'] font-extrabold text-2xl md:text-3xl text-primary">{value}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-[0.15em] font-semibold mt-1.5 text-center">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. HOW TO GET INVOLVED — 4 entry cards
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">How to Get Involved</h2>
            <p className="text-on-surface-variant text-sm mt-1">Find the right way to support or engage with our work.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Search, title: 'Explore Programs', desc: 'Discover our health, youth, and development programs across Bungoma County.', path: '/programs' },
              { icon: Heart, title: 'Volunteer With Us', desc: 'Join our team and contribute your skills to community transformation.', path: '/volunteer' },
              { icon: Download, title: 'Make a Donation', desc: 'Support our work financially — every contribution creates impact.', path: '/donate' },
              { icon: HelpCircle, title: 'Contact Us', desc: 'Reach out for partnerships, inquiries, or more information.', path: '/contact' },
            ].map((item, i) => (
              <button key={i} onClick={() => navigate(item.path)}
                className="group bg-surface border border-outline-variant rounded-xl p-6 text-left hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,17,58,0.06)] transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon size={18} className="text-primary group-hover:text-primary-container transition-colors" />
                </div>
                <h3 className="font-['Montserrat'] font-semibold text-sm text-primary mb-1.5">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. KEY SECTIONS — Navigation cards
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Explore Our Work</h2>
              <p className="text-on-surface-variant text-sm mt-1">Access key sections of our organization.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'About Us', desc: 'Our story, vision, mission & values', path: '/about', color: '#0ea5e9' },
              { title: 'Programs', desc: 'Health, youth & development', path: '/programs', color: 'var(--bc-primary)' },
              { title: 'Projects & Impact', desc: 'Ongoing initiatives & success stories', path: '/impact', color: '#14b8a6' },
              { title: 'Events', desc: 'Upcoming community gatherings', path: '/events', color: 'var(--bc-secondary)' },
              { title: 'News & Blog', desc: 'Latest updates & articles', path: '/news', color: '#8b5cf6' },
            ].map((item, i) => (
              <button key={i} onClick={() => navigate(item.path)}
                className="group bg-surface border border-outline-variant rounded-xl p-6 text-left hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,17,58,0.08)] transition-all"
                style={{borderTop:`3px solid ${item.color}`}}>
                <h3 className="font-['Montserrat'] font-bold text-sm text-primary mb-1.5">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">{item.desc}</p>
                <span className="text-[11px] font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                  Explore <ArrowRight size={11} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. PROGRAMS — 3 cards with tags
          ═══════════════════════════════════════════════════════════ */}
      {programs.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-lowest">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Our Programs</h2>
                <p className="text-on-surface-variant text-sm mt-1">Community-driven initiatives making an impact.</p>
              </div>
              <button onClick={() => navigate('/programs')} className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent transition-colors">
                View All Programs <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {programs.slice(0, 3).map((p: any) => {
                const Icon = iconMap[p.icon] || Heart;
                const imgSrc = resolveImage(p);
                return (
                  <button key={p.id} onClick={() => navigate('/programs')}
                    className="group bg-surface border border-outline-variant rounded-xl overflow-hidden text-left hover:shadow-[0_8px_30px_rgba(0,17,58,0.08)] transition-all">
                    {imgSrc && <div className="h-44 overflow-hidden"><img src={imgSrc} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block w-2 h-2 rounded-full" style={{background:p.color?.replace('bg-','')||'var(--bc-primary)'}} />
                        <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">{p.stat_label}</span>
                      </div>
                      <h3 className="font-['Montserrat'] font-bold text-sm text-primary mb-1.5">{p.title}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{p.description}</p>
                      {Array.isArray(p.highlights) && p.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.highlights.slice(0, 3).map((h: string) => (
                            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary/60">{h}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          6. UPCOMING EVENTS
          ═══════════════════════════════════════════════════════════ */}
      {events.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Upcoming Events</h2>
                <p className="text-on-surface-variant text-sm mt-1">Join our community gatherings and activities.</p>
              </div>
              <button onClick={() => navigate('/events')} className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent transition-colors">
                View All Events <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {events.slice(0, 3).map((e: any) => {
                const d = new Date(e.event_date);
                return (
                  <button key={e.id} onClick={() => navigate('/events')}
                    className="group bg-surface border border-outline-variant rounded-xl p-5 text-left hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(0,17,58,0.06)] transition-all">
                    <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent mb-2">{e.type}</span>
                    <h3 className="font-['Montserrat'] font-semibold text-sm text-primary mb-2">{e.title}</h3>
                    <div className="space-y-1.5 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1.5"><Calendar size={11} /> {d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {e.event_time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={11} /> {e.location}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          7. IMPACT PROJECTS — With progress
          ═══════════════════════════════════════════════════════════ */}
      {projects.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-lowest">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Projects &amp; Impact</h2>
                <p className="text-on-surface-variant text-sm mt-1">Measurable change across Bungoma County.</p>
              </div>
              <button onClick={() => navigate('/impact')} className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent transition-colors">
                View All Projects <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((p: any) => (
                <div key={p.id} className="bg-surface border border-outline-variant rounded-xl p-5 hover:shadow-[0_4px_20px_rgba(0,17,58,0.06)] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-secondary/10 text-secondary">
                      {p.beneficiaries || 'Active'}
                    </span>
                  </div>
                  <h3 className="font-['Montserrat'] font-semibold text-sm text-primary mb-1.5">{p.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden mb-1">
                    <div className="h-full rounded-full" style={{width:`${p.progress_pct}%`,background:p.color?.replace('bg-','')||'var(--bc-primary)'}} />
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-semibold">{p.progress_pct}% complete</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          8. LATEST NEWS
          ═══════════════════════════════════════════════════════════ */}
      {news.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Latest News</h2>
                <p className="text-on-surface-variant text-sm mt-1">Stories and updates from our community.</p>
              </div>
              <button onClick={() => navigate('/news')} className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent transition-colors">
                View All News <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {news.slice(0, 3).map((a: any) => (
                <button key={a.id} onClick={() => navigate('/news')}
                  className="group bg-surface border border-outline-variant rounded-xl overflow-hidden text-left hover:shadow-[0_8px_30px_rgba(0,17,58,0.08)] transition-all">
                  {resolveImage(a) && <div className="h-40 overflow-hidden"><img src={resolveImage(a)} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/8 text-primary mb-2">{a.tag}</span>
                    <h3 className="font-['Montserrat'] font-semibold text-sm text-primary mb-1.5 line-clamp-2">{a.title}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-on-surface-variant">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(a.published_at).toLocaleDateString()}</span>
                      <span>{a.author}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          9. PARTNERS
          ═══════════════════════════════════════════════════════════ */}
      {partners.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-lowest">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary">Our Partners</h2>
                <p className="text-on-surface-variant text-sm mt-1">Organizations that make our work possible.</p>
              </div>
              <button onClick={() => navigate('/partners')} className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:text-accent transition-colors">
                View All Partners <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partners.slice(0, 4).map((p: any) => (
                <div key={p.id} className="bg-surface border border-outline-variant rounded-xl p-5 text-center hover:shadow-[0_4px_16px_rgba(0,17,58,0.04)] transition-all">
                  <Building size={24} className="mx-auto mb-3 text-primary/30" />
                  <h4 className="font-['Montserrat'] font-semibold text-xs text-primary">{p.name}</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider font-semibold">{p.partner_type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          10. TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"><img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" /></div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
              <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-white">{hp.testimonials_heading || 'Stories of Transformation'}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.slice(0, 2).map((t: any) => (
                <div key={t.id || t.name} className="bg-white/[0.05] backdrop-blur-sm border border-white/8 rounded-xl p-6">
                  <div className="flex gap-1 mb-2">{[...Array(t.stars||5)].map((_,i)=><Star key={i} size={13} className="text-accent fill-accent" />)}</div>
                  <blockquote className="text-white/70 leading-relaxed text-sm italic mb-4">"{t.quote}"</blockquote>
                  <div className="border-t border-white/8 pt-3"><div className="font-['Montserrat'] font-semibold text-white text-sm">{t.name}</div><div className="text-white/35 text-xs mt-0.5">{t.role} — {t.location}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          11. CTA — Can't find what you're looking for?
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-primary mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">Reach out to us for any inquiries, partnership opportunities, or more information about our work.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/contact')} className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all">Contact Us</button>
            <button onClick={() => navigate('/volunteer')} className="px-6 py-3 rounded-lg border-2 border-outline-variant hover:border-primary text-primary font-semibold text-sm transition-all">Get Involved</button>
          </div>
        </div>
      </section>
    </div>
  );
}
