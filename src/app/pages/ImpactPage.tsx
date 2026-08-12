import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Quote, Star } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function ImpactPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([api.projects(), api.successStories(), api.stats()]).then(([p,s,st])=>{setProjects(p);setStories(s)}).catch(console.error).finally(()=>setLoading(false)); }, []);

  const resolveImg = (obj: any) => {
    const img = obj?.resolved_image || obj?.image || obj?.image_url || '';
    if (!img) return '';
    return img;
  };

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Our Reach</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Projects & Impact</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Measurable change across Bungoma County.</p></div></section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="text-center mb-14"><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Ongoing Initiatives</h2></div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p:any)=>(
            <div key={p.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(0,17,58,0.10)] transition-all group">
              {resolveImg(p) && <div className="relative h-48 overflow-hidden"><img src={resolveImg(p)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{p.beneficiaries}</span></div>}
              <div className="p-6"><h3 className="font-['Montserrat'] font-semibold text-lg text-primary mb-2">{p.title}</h3><p className="text-sm text-on-surface-variant mb-4">{p.description}</p><div className="space-y-2"><div className="flex justify-between text-xs"><span>Progress</span><span className="font-bold text-primary">{p.progress_pct}%</span></div><div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden"><div className={clx("h-full rounded-full", p.color||'bg-primary')} style={{width:`${p.progress_pct}%`}} /></div></div></div>
            </div>
          ))}
        </div></div></section>
      )}

      {/* Success Stories */}
      {stories.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-low"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="text-center mb-14"><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Success Stories</h2></div><div className="grid md:grid-cols-3 gap-6">
          {stories.map((s:any)=>(
            <div key={s.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-[0_12px_40px_rgba(0,17,58,0.10)] transition-all">
              {resolveImg(s) && <div className="h-56 overflow-hidden"><img src={resolveImg(s)} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
              <div className="p-6"><Quote size={20} className="text-primary/20 mb-2" /><p className="text-sm text-on-surface-variant leading-relaxed mb-4 italic">"{s.story}"</p><div className="font-['Montserrat'] font-semibold text-primary text-sm">{s.name}</div><div className="text-xs text-on-surface-variant mt-0.5">{s.location}</div></div>
            </div>
          ))}
        </div></div></section>
      )}

      <section className="py-16 md:py-20 bg-primary text-center"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white mb-4">Help Us Create More Impact</h2><p className="text-white/55 mb-8">Your support enables us to reach more communities.</p><button onClick={()=>navigate("/donate")} className="px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm">Donate Now</button></div></section>
    </div>
  );
}
