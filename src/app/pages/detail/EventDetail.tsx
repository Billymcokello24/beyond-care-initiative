import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react";
import { api } from "@/lib/api";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [e, setE] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.eventDetail(Number(id)).then(setE).catch(()=>navigate('/events')).finally(()=>setLoading(false)); }, [id]);
  if (loading) return <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)'}}>Loading...</div>;
  if (!e) return null;

  const img = e.resolved_image || e.image_url || '';
  const imgSrc = img || '';
  const d = new Date(e.event_date);

  return (
    <div>
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=400&fit=crop)',backgroundSize:'cover'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-white/80">Event</span>
          <h1 className="font-['Montserrat'] font-extrabold text-2xl md:text-4xl text-white leading-tight max-w-3xl mx-auto">{e.title}</h1>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <button onClick={()=>navigate('/events')} className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:text-accent transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Events
          </button>

          {/* Date banner */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 mb-8 flex flex-wrap items-center gap-6">
            <div className="text-center px-5 py-3 bg-primary rounded-xl">
              <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">{d.toLocaleDateString('en-US',{month:'short'})}</div>
              <div className="font-['Montserrat'] font-extrabold text-white text-3xl">{d.getDate()}</div>
              <div className="text-white/40 text-[10px]">{d.getFullYear()}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-1"><Clock size={14}/> {e.event_time}</div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant"><MapPin size={14}/> {e.location}</div>
            </div>
            {e.type && <span className="ml-auto px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent">{e.type}</span>}
          </div>

          {imgSrc && (
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img src={imgSrc} alt={e.title} className="w-full object-cover" style={{maxHeight:'400px'}}/>
            </div>
          )}

          <div className="text-on-surface-variant leading-relaxed text-base whitespace-pre-line mb-10" style={{lineHeight:'1.9'}}>
            {e.description || 'No additional details available for this event.'}
          </div>

          <div className="p-6 bg-surface border border-outline-variant rounded-2xl text-center">
            <h3 className="font-['Montserrat'] font-bold text-lg text-primary mb-2">Interested in attending?</h3>
            <p className="text-sm text-on-surface-variant mb-4">Contact us for more information or to confirm your participation.</p>
            <button onClick={()=>navigate('/contact')} className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-all shadow-md shadow-accent/20">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}
