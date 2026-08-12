import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Building, HandHeart, Star } from "lucide-react";
import { api } from "@/lib/api";

export default function PartnersPage() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.partners().then(setPartners).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">With Support From</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Partners & Donors</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Our work is made possible through generous support.</p></div></section>
      <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((p:any)=>(<div key={p.id} className="bg-surface border border-outline-variant rounded-xl p-6 text-center hover:shadow-[0_8px_24px_rgba(0,17,58,0.08)] hover:-translate-y-1 transition-all group"><div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10"><Building size={22} className="text-primary/60" /></div><h4 className="font-['Montserrat'] font-semibold text-sm text-primary mb-1">{p.name}</h4><span className="inline-block text-[10px] text-secondary font-semibold uppercase tracking-wider mb-2">{p.partner_type}</span><p className="text-xs text-on-surface-variant">{p.description}</p></div>))}
      </div>
      <div className="bg-surface border border-outline-variant rounded-2xl p-10 mt-10 text-center"><div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6"><HandHeart size={28} className="text-accent" /></div><h2 className="font-['Montserrat'] font-bold text-2xl text-primary mb-4">Become a Partner</h2><p className="text-on-surface-variant mb-8">Join our network and help us expand our reach.</p><div className="flex flex-wrap justify-center gap-3"><button onClick={()=>navigate("/contact")} className="px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm">Partner With Us</button><button onClick={()=>navigate("/donate")} className="px-7 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm">Make a Donation</button></div></div></div></section>
      <section className="py-16 md:py-20 bg-primary"><div className="max-w-[1280px] mx-auto px-4 md:px-10 text-center"><Star size={28} className="text-accent mx-auto mb-4" /><h3 className="font-['Montserrat'] font-semibold text-xl text-white mb-3">With Sincere Gratitude</h3><p className="text-white/50 max-w-lg mx-auto text-sm">To every partner and supporter — your contributions make our work possible.</p></div></section>
    </div>
  );
}
