import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MapPin, Clock } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.events().then(setEvents).catch(console.error).finally(()=>setLoading(false)); }, []);
  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Join Us</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Upcoming Events</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">Community gatherings, trainings, and outreach activities.</p></div></section>

      <section className="py-20 md:py-28 bg-surface-container-lowest"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="space-y-6">
        {events.map((e:any) => {
          const d = new Date(e.event_date);
          const month = d.toLocaleDateString('en-US',{month:'short'}).toUpperCase();
          const day = d.getDate();
          const year = d.getFullYear();
          const accent = e.accent_color || 'border-l-accent';
          const tagClass = e.type === 'Training' ? 'bg-secondary/10 text-secondary' : e.type === 'Advocacy' ? 'bg-accent/10 text-accent' : e.type === 'Health' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent';
          return (
            <div key={e.id} onClick={() => navigate(`/events/${e.id}`)} className={clx("bg-surface border border-outline-variant rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-[0_8px_24px_rgba(0,17,58,0.08)] transition-all group border-l-4 cursor-pointer", accent)}>
              <div className="md:w-40 shrink-0 bg-surface-container-low p-6 flex md:flex-col items-center md:justify-center gap-3 border-b md:border-b-0 md:border-r border-outline-variant"><div className="text-center"><div className="text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider">{month}</div><div className="font-['Montserrat'] font-extrabold text-3xl text-primary">{day}</div><div className="text-[10px] text-on-surface-variant">{year}</div></div></div>
              <div className="flex-grow p-6 flex flex-col md:flex-row gap-6 items-start"><div className="flex-grow"><span className={clx("inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full mb-2", tagClass)}>{e.type}</span><h3 className="font-['Montserrat'] font-semibold text-lg text-primary mb-3">{e.title}</h3><div className="flex flex-wrap gap-4 text-xs text-on-surface-variant"><span className="flex items-center gap-1.5"><MapPin size={13} />{e.location}</span><span className="flex items-center gap-1.5"><Clock size={13} />{e.event_time}</span></div></div>{e.image_url&&<div className="shrink-0 w-full md:w-40 h-32 rounded-xl overflow-hidden"><img src={e.image_url} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}</div>
            </div>
          );
        })}
      </div></div></section>

      <section className="py-16 md:py-20 bg-primary text-center"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white mb-4">Want to Host an Event?</h2><p className="text-white/55 mb-8">Partner with Beyond Care for community events.</p><button onClick={()=>navigate("/contact")} className="px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm">Get in Touch</button></div></section>
    </div>
  );
}
