import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Calendar, ArrowRight, User } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function NewsPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.news().then(setArticles).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Updates</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">News & Blog</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Stories of change from our community work.</p></div></section>
      <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a:any)=>(
          <article key={a.id} onClick={() => navigate(`/news/${a.id}`)} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden flex flex-col group hover:shadow-[0_12px_40px_rgba(0,17,58,0.10)] transition-all cursor-pointer">
            {a.image_url&&<div className="h-52 relative overflow-hidden"><img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className={clx("absolute top-4 left-4 text-[10px] font-semibold px-2.5 py-1 rounded-full", a.tag_color||'bg-primary/10 text-primary')}>{a.tag}</span></div>}
            <div className="p-6 flex flex-col flex-grow"><div className="flex items-center gap-3 text-xs text-outline mb-3"><span className="flex items-center gap-1"><Calendar size={11} />{new Date(a.published_at).toLocaleDateString()}</span><span className="flex items-center gap-1"><User size={11} />{a.author}</span></div><h3 className="font-['Montserrat'] font-semibold text-base text-primary leading-snug mb-3 line-clamp-2">{a.title}</h3><p className="text-sm text-on-surface-variant leading-relaxed mb-5 flex-grow">{a.excerpt}</p><button className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container transition-colors">Read article <ArrowRight size={12} /></button></div>
          </article>
        ))}
      </div></div></section>
    </div>
  );
}
