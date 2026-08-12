import { useState } from "react";
import { MapPin, Mail, Phone, Globe, Facebook, Twitter, Instagram, Youtube, Send, Clock } from "lucide-react";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'General Inquiry', message:'' });
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await api.submitContact(form);
    if (ok) { setSent(true); setForm({ name:'', email:'', subject:'General Inquiry', message:'' }); }
  };

  return (
    <div>
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-[0.10]" /><div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary to-primary" /></div><div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 text-center"><span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Reach Out</span><h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-4">Contact Us</h1><p className="text-white/55 text-lg max-w-2xl mx-auto">We would love to hear from you.</p></div></section>

      <section className="py-20 md:py-28 bg-surface-container-low"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[{icon:MapPin,label:"Head Office",value:"Kanduyi Sub-County, Bungoma County, Kenya"},{icon:Mail,label:"Email",value:"beyondcareinitiative@gmail.com"},{icon:Phone,label:"Phone",value:"+254 792 469 299"},{icon:Globe,label:"Area",value:"Bungoma County, Kenya"},{icon:Clock,label:"Hours",value:"Mon–Fri, 8AM–5PM"}].map(({icon:I,label,value})=>(<div key={label} className="flex gap-4"><div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center shrink-0"><I size={18} className="text-primary" /></div><div><div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">{label}</div><div className="text-sm text-primary font-medium">{value}</div></div></div>))}
          <div className="pt-5 border-t border-outline-variant"><div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Follow Us</div><div className="flex gap-2">{[Facebook,Twitter,Instagram,Youtube].map((I,i)=><a key={i} href="#" className="w-10 h-10 rounded-xl bg-primary/6 hover:bg-primary flex items-center justify-center transition-colors group"><I size={16} className="text-primary group-hover:text-white transition-colors" /></a>)}</div></div>
        </div>

        <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-2xl p-6 md:p-10">
          <h3 className="font-['Montserrat'] font-bold text-xl text-primary mb-6">Send Us a Message</h3>
          {sent && <div style={{background:'#ecfdf5',color:'#006d3d',padding:'12px 16px',borderRadius:8,marginBottom:16,fontWeight:600,fontSize:14}}>✅ Message sent successfully! We'll get back to you soon.</div>}
          <form onSubmit={submit}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="text-xs font-semibold text-on-surface-variant block mb-1.5">Full Name *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" /></div>
              <div><label className="text-xs font-semibold text-on-surface-variant block mb-1.5">Email *</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" required className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" /></div>
            </div>
            <div className="mb-4"><label className="text-xs font-semibold text-on-surface-variant block mb-1.5">Subject *</label><select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"><option>General Inquiry</option><option>Partnership</option><option>Volunteer</option><option>Donation</option><option>Media & Press</option></select></div>
            <div className="mb-6"><label className="text-xs font-semibold text-on-surface-variant block mb-1.5">Message *</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={6} required className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none" /></div>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2">Send Message <Send size={15} /></button>
          </form>
        </div>
      </div></div></section>

      <section className="bg-surface-container-lowest pb-20 md:pb-28"><div className="max-w-[1280px] mx-auto px-4 md:px-10"><div className="rounded-2xl overflow-hidden h-[350px] bg-surface border border-outline-variant relative"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1280&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-60" /><div className="absolute inset-0 flex items-center justify-center"><div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-5 text-center shadow-xl"><MapPin size={24} className="text-primary mx-auto mb-2" /><div className="font-['Montserrat'] font-bold text-primary text-lg">Kanduyi Sub-County</div><div className="text-sm text-on-surface-variant">Bungoma County, Kenya</div></div></div></div></div></section>
    </div>
  );
}
