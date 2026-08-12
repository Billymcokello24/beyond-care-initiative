import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, BookOpen, Shield, Zap, Users, Leaf, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

const iconMap: Record<string, any> = { Heart, BookOpen, Shield, Zap, Users, Leaf };

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.programs().then(setPrograms).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  const resolveImg = (obj: any) => {
    const img = obj?.resolved_image || obj?.image || obj?.image_url || '';
    if (!img) return '';
    return img.startsWith('http') ? img : `http://localhost:8000${img}`;
  };

  return (
    <div>
      {/* Header */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop)',backgroundSize:'cover',backgroundPosition:'center'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/8 text-white/70 border border-white/6">What We Do</span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">Our Programs</h1>
          <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto">Comprehensive, community-driven programs addressing the most pressing challenges across Bungoma County.</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {programs.map((p: any) => {
              const Icon = iconMap[p.icon] || Heart;
              const imgSrc = resolveImg(p);
              const highlights: string[] = Array.isArray(p.highlights) ? p.highlights.slice(0, 3) : [];

              return (
                <article key={p.id}
                  onClick={() => navigate(`/programs/${p.id}`)}
                  className="group bg-surface border border-outline-variant rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_12px_40px_rgba(0,17,58,0.10)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  
                  {/* Image area */}
                  <div className="relative h-52 overflow-hidden bg-surface-container-low">
                    {imgSrc ? (
                      <img src={imgSrc} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{background: p.color?.replace('bg-','') || '#00113a'}}>
                          <Icon size={24} className="text-white"/>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"/>
                    {/* Icon badge */}
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                      style={{background: p.color?.replace('bg-','') || '#00113a'}}>
                      <Icon size={16} className="text-white"/>
                    </div>
                    {/* Stat badge */}
                    {p.stat_label && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white">
                        {p.stat_label}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-['Montserrat'] font-bold text-base text-primary mb-2 group-hover:text-primary-container transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="text-xs text-on-surface-variant font-medium mb-2">{p.subtitle}</p>
                    )}
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {p.description}
                    </p>

                    {/* Tags */}
                    {highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-outline-variant">
                        {highlights.map((h: string) => (
                          <span key={h} className="text-[10px] px-2 py-1 rounded-full bg-primary/4 text-primary/60 font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:text-accent transition-colors">
                      Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 md:py-18 bg-primary text-center">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white mb-3">Ready to Make a Difference?</h2>
          <p className="text-white/45 text-sm mb-8 max-w-md mx-auto">Join us in delivering life-changing programs across Bungoma County.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={()=>navigate('/volunteer')} className="px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all">
              Volunteer With Us
            </button>
            <button onClick={()=>navigate('/donate')} className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-all shadow-lg shadow-accent/20 hover:-translate-y-0.5">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
