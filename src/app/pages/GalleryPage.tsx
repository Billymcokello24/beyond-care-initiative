import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.gallery().then(setItems).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Moments</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Gallery</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Photos from our programs, events, and activities.</p></div></section>
      <section className="py-12 md:py-20 bg-primary"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
        {items.map((g:any)=>(
          <div key={g.id} className={clx("relative rounded-xl overflow-hidden group cursor-pointer", g.span_class)}><img src={g.image_url} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4"><span className="text-white text-sm font-semibold">{g.title}</span><span className="text-white/60 text-[10px] uppercase">{g.category}</span></div></div>
        ))}
      </div></div></section>
    </div>
  );
}
