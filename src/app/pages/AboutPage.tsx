import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, Shield, Zap, Users, Leaf, Globe, Eye, Target, HandHeart, Check } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const iconMap: Record<string, any> = { Heart, Shield, Zap, Users, Leaf, Globe, Eye, Target, HandHeart, Check };

export default function AboutPage() {
  const navigate = useNavigate();
  const [aboutStory, setAboutStory] = useState<any>(null);
  const [visionMission, setVisionMission] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  const [focusAreas, setFocusAreas] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [tab, setTab] = useState<"vision"|"mission"|"values">("vision");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.aboutStory(), api.visionMission(), api.values(), api.focusAreas(), api.timeline(), api.team()])
      .then(([story, vm, v, fa, tl, tm]) => { setAboutStory(story); setVisionMission(vm); setValues(v); setFocusAreas(fa); setTimeline(tl); setTeam(tm||[]); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const vision = visionMission.find((v: any) => v.type === 'vision');
  const mission = visionMission.find((v: any) => v.type === 'mission');

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.12]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Who We Are</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">About Us</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">A community-based organization driven by passion, rooted in Bungoma County.</p></div></section>

      {/* Story */}
      {aboutStory && (
        <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid lg:grid-cols-2 gap-16 items-center"><div className="relative"><div className="rounded-2xl overflow-hidden"><img src={aboutStory.image_url || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&auto=format"} alt="" className="w-full h-[400px] object-cover" /></div></div><div><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary">Our Story</span><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight mb-6">{aboutStory.heading}</h2><p className="text-on-surface-variant text-lg leading-relaxed mb-4">{aboutStory.content_paragraph1}</p><p className="text-on-surface-variant leading-relaxed mb-4">{aboutStory.content_paragraph2}</p><div className="flex gap-6 mt-8"><div className="text-center"><div className="font-['Montserrat'] font-extrabold text-3xl text-primary">{aboutStory.stat1_value}</div><div className="text-xs text-on-surface-variant mt-1">{aboutStory.stat1_label}</div></div><div className="text-center"><div className="font-['Montserrat'] font-extrabold text-3xl text-secondary">{aboutStory.stat2_value}</div><div className="text-xs text-on-surface-variant mt-1">{aboutStory.stat2_label}</div></div><div className="text-center"><div className="font-['Montserrat'] font-extrabold text-3xl text-accent">{aboutStory.stat3_value}</div><div className="text-xs text-on-surface-variant mt-1">{aboutStory.stat3_label}</div></div></div></div></div></div></section>
      )}

      {/* Vision / Mission / Values tabs */}
      <section className="py-20 md:py-28 bg-surface-container-low"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="flex justify-center mb-12"><div className="inline-flex gap-1 p-1.5 bg-surface-container rounded-xl border border-outline-variant">{(["vision","mission","values"] as const).map(t=>(<button key={t} onClick={()=>setTab(t)} className={clx("px-6 py-3 rounded-lg text-sm font-semibold transition-all",tab===t?"bg-surface text-primary shadow-sm border border-outline-variant":"text-on-surface-variant hover:text-on-surface")}>{t==="vision"?"🔭 Our Vision":t==="mission"?"🎯 Our Mission":"💎 Core Values"}</button>))}</div></div>
        {tab==="vision"&&vision&&<div className="max-w-3xl mx-auto"><div className="bg-surface border border-outline-variant rounded-2xl p-10 text-center"><div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"><Eye size={28} className="text-primary" /></div><blockquote className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-primary leading-relaxed mb-4">"{vision.statement}"</blockquote></div></div>}
        {tab==="mission"&&mission&&<div className="max-w-3xl mx-auto"><div className="bg-surface border border-outline-variant rounded-2xl p-10 text-center"><div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6"><Target size={28} className="text-secondary" /></div><blockquote className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-primary leading-relaxed mb-4">"{mission.statement}"</blockquote></div></div>}
        {tab==="values"&&<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{values.map(({label,description,icon}:any)=>{const I=iconMap[icon]||Shield;return(<div key={label} className="bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,17,58,0.08)] hover:-translate-y-1 transition-all text-center group"><div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4"><I size={20} className="text-primary" /></div><h4 className="font-['Montserrat'] font-semibold text-sm text-primary mb-2">{label}</h4><p className="text-xs text-on-surface-variant">{description}</p></div>)})}</div>}
      </div></section>

      {/* Focus Areas */}
      {focusAreas.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="text-center mb-14"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary">Our Work</span><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Core Focus Areas</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{focusAreas.map(({title,description,icon,color}:any)=>{const I=iconMap[icon]||Heart;return(<div key={title} className="bg-surface border border-outline-variant rounded-xl p-6 flex gap-4 group hover:shadow-[0_8px_24px_rgba(0,17,58,0.08)] transition-all"><div className={clx("w-11 h-11 rounded-xl flex items-center justify-center shrink-0",color)}><I size={20} className="text-white" /></div><div><h4 className="font-['Montserrat'] font-semibold text-sm text-primary mb-1">{title}</h4><p className="text-xs text-on-surface-variant">{description}</p></div></div>)})}</div></div></section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-low"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="text-center mb-14"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary">Our Journey</span><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Milestones & Achievements</h2></div><div className="max-w-3xl mx-auto">{timeline.map(({year,title,description}:any,i:number)=>(<div key={year} className="flex gap-6 pb-10 last:pb-0"><div className="flex flex-col items-center"><div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20"><span className="font-['Montserrat'] font-extrabold text-white text-sm">{year}</span></div>{i<timeline.length-1&&<div className="w-0.5 flex-1 bg-outline-variant mt-3" />}</div><div className="pt-3"><h4 className="font-['Montserrat'] font-semibold text-lg text-primary mb-1">{title}</h4><p className="text-sm text-on-surface-variant leading-relaxed">{description}</p></div></div>))}</div></div></section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary">Our Team</span>
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Meet the People Behind the Work</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((m: any) => {
                const photo = m.resolved_image || m.photo || m.photo_url || '';
                const photoSrc = photo || '';
                return (
                  <div key={m.id} onClick={() => navigate(`/team/${m.id}`)} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,17,58,0.08)] hover:-translate-y-1 transition-all text-center cursor-pointer">
                    <div className="h-56 bg-surface-container-low overflow-hidden">
                      {photoSrc ? (
                        <img src={photoSrc} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">👤</div>
                      )}
                    </div>
                    <div className="p-5">
                      <h4 className="font-['Montserrat'] font-bold text-sm text-primary">{m.name}</h4>
                      <p className="text-xs text-secondary font-semibold mt-1">{m.role}</p>
                      {m.bio && <p className="text-xs text-on-surface-variant mt-2 leading-relaxed line-clamp-3">{m.bio}</p>}
                      {m.email && <p className="text-[10px] text-on-surface-variant mt-2">{m.email}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
