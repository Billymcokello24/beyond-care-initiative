import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Heart, Menu, X, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const NAV_GROUPS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { label: "Our Work", children: [
    { path: "/programs", label: "Programs" },
    { path: "/impact", label: "Projects & Impact" },
  ]},
  { label: "News & Media", children: [
    { path: "/events", label: "Events" },
    { path: "/news", label: "News & Blog" },
    { path: "/gallery", label: "Gallery" },
  ]},
  { label: "Get Involved", children: [
    { path: "/volunteer", label: "Volunteer / Join Us" },
    { path: "/partners", label: "Partners & Donors" },
    { path: "/donate", label: "Donate" },
  ]},
  { path: "/contact", label: "Contact Us" },
];

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [branding, setBranding] = useState<any>({});
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { api.branding().then(setBranding).catch(()=>{}); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { setMenuOpen(false); setOpenDropdown(null); window.scrollTo(0,0); }, [location.pathname]);

  const isActive = (p: string) => p==="/" ? location.pathname==="/" : location.pathname.startsWith(p);
  const isGroupActive = (g: any) => g.children ? g.children.some((c:any)=>isActive(c.path)) : isActive(g.path);
  const logoUrl = branding.logo_url ? (branding.logo_url.startsWith('http')?branding.logo_url:`http://localhost:8000${branding.logo_url}`) : null;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col" style={{fontFamily:"'Inter',sans-serif"}}>
      <style>{`
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#00113a;border-radius:3px}
        @keyframes ddIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
        .dd-enter{animation:ddIn .15s ease-out}
      `}</style>

      {/* Top bar */}
      <div className="hidden md:block bg-[#000a1a] text-white/35 text-[11px] border-b border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-10 h-7 flex items-center justify-between">
          <span className="tracking-wide">A Community-Based Organization · Kanduyi, Bungoma County, Kenya</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail size={10}/>beyondcareinitiative@gmail.com</span>
            <span className="text-white/10">|</span>
            {[Facebook,Twitter,Instagram,Youtube].map((I,i)=><a key={i} href="#" className="hover:text-white/50 transition-colors"><I size={11}/></a>)}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header ref={dropdownRef} className={clx("sticky top-0 z-50 transition-all duration-300", scrolled?"bg-primary/98 backdrop-blur-lg shadow-lg shadow-primary/10":"bg-primary")}>
        <div className="max-w-[1280px] mx-auto px-8 lg:px-10">
          <div className="flex items-center justify-between h-[62px]">
            {/* Logo */}
            <button onClick={()=>navigate("/")} className="flex items-center gap-3 group shrink-0 mr-6">
              <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center group-hover:bg-white/12 transition-all overflow-hidden">
                {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover"/> : <Heart size={18} className="text-white fill-white"/>}
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <div className="font-['Montserrat'] font-extrabold text-white text-[15px] tracking-tight">Beyond Care Initiative</div>
                <div className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold">CBO · Bungoma County</div>
              </div>
            </button>

            {/* Nav */}
            <nav className="hidden lg:flex items-center">
              {NAV_GROUPS.map(item => {
                if (!item.children) return (
                  <button key={item.path} onClick={()=>navigate(item.path!)}
                    className={clx("relative px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                      isActive(item.path!)? "text-white":"text-white/55 hover:text-white/80")}>
                    {item.label}
                    {isActive(item.path!) && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-accent rounded-full"/>}
                  </button>
                );
                return (
                  <div key={item.label} className="relative">
                    <button onClick={()=>setOpenDropdown(openDropdown===item.label?null:item.label)}
                      className={clx("relative flex items-center gap-1 px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                        isGroupActive(item)||openDropdown===item.label? "text-white":"text-white/55 hover:text-white/80")}>
                      {item.label}<ChevronDown size={12} className={clx("transition-transform",openDropdown===item.label&&"rotate-180")}/>
                      {(isGroupActive(item)||openDropdown===item.label) && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-accent rounded-full"/>}
                    </button>
                    {openDropdown===item.label && (
                      <div className="dd-enter absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-outline-variant py-1.5 z-50">
                        {item.children.map((c:any)=>(
                          <button key={c.path} onClick={()=>{navigate(c.path);setOpenDropdown(null)}}
                            className={clx("w-full text-left px-4 py-2.5 text-sm transition-colors",
                              isActive(c.path)?"text-primary font-semibold bg-primary/5":"text-on-surface-variant hover:text-primary hover:bg-surface-container-low")}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={()=>navigate("/donate")} className="px-5 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-[13px] font-semibold transition-all shadow-md shadow-accent/20 hover:-translate-y-0.5">Donate Now</button>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <button onClick={()=>navigate("/donate")} className="px-3 py-1.5 rounded-md bg-accent text-white text-[11px] font-semibold">Donate</button>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="p-2 text-white hover:bg-white/8 rounded-lg"><Menu size={20}/></button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={clx("lg:hidden overflow-hidden transition-all duration-300",menuOpen?"max-h-[85vh] border-t border-white/6":"max-h-0")}>
          <div className="px-4 py-3 flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto">
            {NAV_GROUPS.map(item=>{
              if(!item.children) return (
                <button key={item.path} onClick={()=>navigate(item.path!)}
                  className={clx("text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3",
                    isActive(item.path!)? "bg-white/10 text-white":"text-white/55 hover:text-white hover:bg-white/4")}>
                  <span className={clx("w-1.5 h-1.5 rounded-full",isActive(item.path!)? "bg-accent":"bg-white/15")}/>{item.label}
                </button>
              );
              const exp = mobileExpanded===item.label;
              return <div key={item.label}>
                <button onClick={()=>setMobileExpanded(exp?null:item.label)}
                  className={clx("w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3",
                    isGroupActive(item)||exp?"bg-white/10 text-white":"text-white/55 hover:text-white hover:bg-white/4")}>
                  <span className={clx("w-1.5 h-1.5 rounded-full",isGroupActive(item)?"bg-accent":"bg-white/15")}/>{item.label}
                  <ChevronDown size={14} className={clx("ml-auto transition-transform",exp&&"rotate-180")}/>
                </button>
                {exp&&<div className="ml-7 border-l border-white/8 pl-3">{item.children.map((c:any)=>(
                  <button key={c.path} onClick={()=>navigate(c.path)}
                    className={clx("w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2",
                      isActive(c.path)?"text-white":"text-white/45 hover:text-white")}>
                    <span className={clx("w-1 h-1 rounded-full",isActive(c.path)?"bg-accent":"bg-white/15")}/>{c.label}
                  </button>
                ))}</div>}
              </div>;
            })}
          </div>
        </div>
      </header>

      <main className="flex-grow"><Outlet/></main>

      {/* Footer */}
      <FooterContent logoUrl={logoUrl} branding={branding} navigate={navigate} />
    </div>
  );
}

function FooterContent({ logoUrl, branding, navigate }: any) {
  const [subEmail, setSubEmail] = useState('');
  const [subName, setSubName] = useState('');
  const [subMsg, setSubMsg] = useState('');
  const [subSending, setSubSending] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setSubSending(true);
    try {
      const res = await fetch('http://localhost:8000/api/newsletter-subscribe/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail, name: subName }),
      });
      const data = await res.json();
      setSubMsg(data.message || 'Subscribed!');
      setSubEmail(''); setSubName('');
    } catch { setSubMsg('Error. Try again.'); }
    setSubSending(false);
    setTimeout(() => setSubMsg(''), 4000);
  };

  return (
    <footer className="bg-primary text-white pt-14 pb-5 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center overflow-hidden">{logoUrl?<img src={logoUrl} alt="" className="w-full h-full object-cover"/>:<Heart size={16} className="text-white fill-white"/>}</div>
                <div><div className="font-['Montserrat'] font-bold text-white text-sm">Beyond Care Initiative</div><div className="text-[10px] text-white/25 uppercase tracking-wider">CBO · Kenya</div></div>
              </div>
              <p className="text-white/30 text-xs leading-relaxed mb-3">{branding.footer_description||'Building healthy, empowered, and resilient communities.'}</p>
              <div className="flex gap-1.5">{[Facebook,Twitter,Instagram,Youtube].map((I,i)=><a key={i} href="#" className="w-7 h-7 rounded-lg bg-white/6 hover:bg-accent flex items-center justify-center transition-all"><I size={12} className="text-white"/></a>)}</div>
            </div>
            <div><h4 className="font-['Montserrat'] font-semibold text-white/80 text-xs uppercase tracking-wider mb-3">Quick Links</h4><div className="space-y-1.5">{["/","/about","/programs","/events","/news"].map(p=><button key={p} onClick={()=>navigate(p)} className="block text-white/30 hover:text-white/60 text-xs transition-colors">{NAV_GROUPS.find(n=>n.path===p)?.label||p}</button>)}</div></div>
            <div><h4 className="font-['Montserrat'] font-semibold text-white/80 text-xs uppercase tracking-wider mb-3">Programs</h4><div className="space-y-1.5">{["HIV/AIDS & SRHR","Mental Health","GBV Prevention","Youth Empowerment","Community Health","Economic Empowerment"].map(p=><button key={p} onClick={()=>navigate("/programs")} className="block text-white/30 hover:text-white/60 text-xs transition-colors">{p}</button>)}</div></div>
            <div><h4 className="font-['Montserrat'] font-semibold text-white/80 text-xs uppercase tracking-wider mb-3">Contact</h4><div className="space-y-2 text-white/30 text-xs"><p className="flex gap-2"><MapPin size={12} className="shrink-0 mt-0.5 text-white/15"/>Kanduyi, Bungoma County</p><p className="flex gap-2"><Mail size={12} className="text-white/15"/>beyondcareinitiative@gmail.com</p><p className="flex gap-2"><Phone size={12} className="text-white/15"/>+254 792 469 299</p></div></div>
            {/* Newsletter */}
            <div>
              <h4 className="font-['Montserrat'] font-semibold text-white/80 text-xs uppercase tracking-wider mb-3">Newsletter</h4>
              <p className="text-white/30 text-xs mb-3">Get updates on new programs, events, and stories.</p>
              <form onSubmit={subscribe} className="space-y-2">
                <input value={subName} onChange={e=>setSubName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/8 text-white text-xs placeholder:text-white/20 outline-none focus:border-accent/50 transition-colors"/>
                <input value={subEmail} onChange={e=>setSubEmail(e.target.value)} type="email" placeholder="your@email.com" required className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/8 text-white text-xs placeholder:text-white/20 outline-none focus:border-accent/50 transition-colors"/>
                <button type="submit" disabled={subSending} className="w-full py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-semibold transition-all disabled:opacity-50">
                  {subSending ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subMsg && <p className="text-xs mt-2 text-green-400">{subMsg}</p>}
            </div>
          </div>
          <div className="border-t border-white/5 pt-4 text-center text-white/15 text-[10px]">&copy; {new Date().getFullYear()} Beyond Care Initiative CBO. All rights reserved.</div>
        </div>
      </footer>
  );
}
