import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, Users, Zap, Send, Star, Check } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const iconMap: Record<string, any> = { Heart, Users, Zap };

export default function VolunteerPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([api.volunteerRoles(), api.volunteerBenefits()]).then(([r,b])=>{setRoles(r);setBenefits(b)}).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.12]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Get Involved</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Volunteer / Join Us</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Your time, skills, and passion can make a lasting difference.</p></div></section>

      <section className="py-20 md:py-28 bg-primary relative overflow-hidden"><div className="absolute inset-0"><div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl" /><div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl" /></div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        {roles.map((r:any)=>{const I=iconMap[r.icon]||Heart;return(<div key={r.id} className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.10] transition-all"><div className={clx("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-opacity-20",r.color||'bg-accent')}><I size={24} className="text-white" /></div><h3 className="font-['Montserrat'] font-semibold text-xl text-white mb-3">{r.title}</h3><p className="text-white/50 text-sm leading-relaxed">{r.description}</p></div>)})}
      </div></div></section>

      {benefits.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="text-center mb-14"><h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-primary leading-tight">Why Volunteer?</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{benefits.map((b:any)=>(<div key={b.id} className="bg-surface border border-outline-variant rounded-2xl p-6 text-center hover:shadow-[0_8px_24px_rgba(0,17,58,0.08)] transition-all"><div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4"><Check size={18} className="text-secondary" /></div><h4 className="font-['Montserrat'] font-semibold text-sm text-primary mb-2">{b.title}</h4><p className="text-xs text-on-surface-variant">{b.description}</p></div>))}</div></div></section>
      )}

      <section className="py-20 md:py-28 bg-surface-container-low"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"><div><div className="bg-surface border border-outline-variant rounded-2xl p-8"><div className="flex gap-1 mb-4">{[...Array(5)].map((_,i)=><Star key={i} size={16} className="text-accent fill-accent" />)}</div><blockquote className="text-on-surface-variant leading-relaxed mb-5 italic">"Volunteering with Beyond Care has been one of the most rewarding experiences of my life."</blockquote><div className="border-t border-outline-variant pt-4"><div className="font-['Montserrat'] font-semibold text-primary text-sm">Faith N.</div><div className="text-xs text-on-surface-variant mt-0.5">Volunteer since 2022 · Kanduyi</div></div></div></div>
      <div><h3 className="font-['Montserrat'] font-bold text-2xl text-primary mb-4">Ready to Join?</h3><p className="text-on-surface-variant text-sm mb-6">Fill out the form and we'll get back to you.</p><div className="space-y-4"><input placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" /><input placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" /><select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm"><option>I want to volunteer</option><option>I want to join as member</option><option>I want to partner</option></select><textarea rows={3} placeholder="Tell us about yourself..." className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface text-sm resize-none" /><button className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-2">Submit Application <Send size={14} /></button></div></div></div></div></section>
    </div>
  );
}
