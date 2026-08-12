import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { api } from "@/lib/api";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [a, setA] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.newsDetail(Number(id)).then(setA).catch(()=>navigate('/news')).finally(()=>setLoading(false)); }, [id]);
  if (loading) return <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)'}}>Loading...</div>;
  if (!a) return null;

  const img = a.resolved_image || a.image_url || '';
  const imgSrc = img || '';

  return (
    <div>
      {/* Header */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&h=400&fit=crop)',backgroundSize:'cover'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-white/80">News Article</span>
          <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-4xl text-white leading-tight max-w-3xl mx-auto">{a.title}</h1>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <button onClick={()=>navigate('/news')} className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:text-accent transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to News
          </button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-outline-variant">
            {a.tag && <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{background:a.tag_color||'rgba(0,17,58,0.08)',color:'var(--bc-primary)'}}>{a.tag}</span>}
            <span className="flex items-center gap-1.5 text-sm text-on-surface-variant"><Calendar size={14}/> {new Date(a.published_at).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
            <span className="flex items-center gap-1.5 text-sm text-on-surface-variant"><User size={14}/> {a.author}</span>
          </div>

          {/* Featured Image */}
          {imgSrc && (
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
              <img src={imgSrc} alt={a.title} className="w-full object-cover" style={{maxHeight:'450px'}}/>
            </div>
          )}

          {/* Content */}
          <div className="text-on-surface-variant leading-relaxed text-base whitespace-pre-line" style={{lineHeight:'1.9'}}>
            {a.content || a.excerpt}
          </div>

          {/* Share / CTA */}
          <div className="mt-12 p-6 bg-surface border border-outline-variant rounded-2xl text-center">
            <h3 className="font-['Montserrat'] font-bold text-lg text-primary mb-2">Enjoyed this article?</h3>
            <p className="text-sm text-on-surface-variant mb-4">Stay updated with our latest news and community stories.</p>
            <button onClick={()=>navigate('/news')} className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all">View More Articles</button>
          </div>
        </div>
      </section>
    </div>
  );
}
