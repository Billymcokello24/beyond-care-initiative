import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { api } from "@/lib/api";

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [m, setM] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.teamMember(Number(id)).then(setM).catch(()=>navigate('/about')).finally(()=>setLoading(false)); }, [id]);
  if (loading) return <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)'}}>Loading...</div>;
  if (!m) return null;

  const photo = m.resolved_image || m.photo || m.photo_url || '';
  const photoSrc = photo || '';

  return (
    <div>
      {/* Header */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=400&fit=crop)',backgroundSize:'cover'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full bg-white/10 text-white/80">Team Member</span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl text-white leading-tight mb-2">{m.name}</h1>
          <p className="text-white/50 text-lg">{m.role}</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <button onClick={()=>navigate('/about')} className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-10 hover:text-accent transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to About
          </button>
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Photo */}
            <div className="md:col-span-2">
              <div className="rounded-2xl overflow-hidden bg-surface-container-low shadow-lg" style={{aspectRatio:'3/4'}}>
                {photoSrc ? <img src={photoSrc} alt={m.name} className="w-full h-full object-cover"/> :
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-15">👤</div>}
              </div>
            </div>
            {/* Info */}
            <div className="md:col-span-3">
              <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-primary mb-1">{m.name}</h2>
              <p className="text-secondary font-semibold text-lg mb-6">{m.role}</p>
              {m.bio && <p className="text-on-surface-variant leading-relaxed text-base whitespace-pre-line mb-8">{m.bio}</p>}
              <div className="space-y-3 p-6 bg-surface border border-outline-variant rounded-2xl">
                <h4 className="font-['Montserrat'] font-semibold text-sm text-primary mb-3">Contact Information</h4>
                {m.email && <div className="flex items-center gap-3 text-sm text-on-surface-variant"><Mail size={16} className="text-primary/50"/>{m.email}</div>}
                {m.phone && <div className="flex items-center gap-3 text-sm text-on-surface-variant"><Phone size={16} className="text-primary/50"/>{m.phone}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
