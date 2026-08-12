import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { api } from "@/lib/api";

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.programDetail(Number(id)).then(setP).catch(()=>navigate('/programs')).finally(()=>setLoading(false)); }, [id]);
  if (loading) return <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)'}}>Loading...</div>;
  if (!p) return null;

  const img = p.resolved_image || p.image_url || '';
  const imgSrc = img ? (img.startsWith('http') ? img : `http://localhost:8000${img}`) : '';
  const highlights: string[] = Array.isArray(p.highlights) ? p.highlights : [];

  return (
    <div>
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=400&fit=crop)',backgroundSize:'cover'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-white/80">Program</span>
          <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-4xl text-white leading-tight max-w-3xl mx-auto">{p.title}</h1>
          {p.subtitle && <p className="text-white/50 text-lg mt-2">{p.subtitle}</p>}
        </div>
      </section>

      <section className="py-10 md:py-16 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <button onClick={()=>navigate('/programs')} className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:text-accent transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Programs
          </button>

          {imgSrc && (
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
              <img src={imgSrc} alt={p.title} className="w-full object-cover" style={{maxHeight:'450px'}}/>
            </div>
          )}

          {p.stat_label && (
            <div className="inline-block mb-6 px-4 py-2 rounded-full text-xs font-bold bg-primary/8 text-primary">{p.stat_label}</div>
          )}

          <div className="text-on-surface-variant leading-relaxed text-base whitespace-pre-line mb-10" style={{lineHeight:'1.9'}}>
            {p.description}
          </div>

          {highlights.length > 0 && (
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-['Montserrat'] font-bold text-lg text-primary mb-4">Program Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h:string) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <Check size={16} className="text-secondary shrink-0 mt-0.5"/>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 text-center hover:shadow-[0_8px_24px_rgba(0,17,58,0.06)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3"><Heart size={20} className="text-primary"/></div>
              <h4 className="font-['Montserrat'] font-bold text-sm text-primary mb-1">Support This Program</h4>
              <p className="text-xs text-on-surface-variant mb-4">Your donation helps us reach more people.</p>
              <button onClick={()=>navigate('/donate')} className="px-5 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-xs transition-all">Donate Now</button>
            </div>
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 text-center hover:shadow-[0_8px_24px_rgba(0,17,58,0.06)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3"><Check size={20} className="text-secondary"/></div>
              <h4 className="font-['Montserrat'] font-bold text-sm text-primary mb-1">Get Involved</h4>
              <p className="text-xs text-on-surface-variant mb-4">Volunteer your time and skills.</p>
              <button onClick={()=>navigate('/volunteer')} className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs transition-all">Volunteer</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
