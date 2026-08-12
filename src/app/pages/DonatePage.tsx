import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, Users, Award, Check, Send, Phone, Smartphone } from "lucide-react";
import { api } from "@/lib/api";

const clx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const iconMap: Record<string, any> = { Heart, Users, Award };

export default function DonatePage() {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState<any[]>([]);
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // M-Pesa form
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaAmount, setMpesaAmount] = useState('');
  const [mpesaSending, setMpesaSending] = useState(false);
  const [mpesaResult, setMpesaResult] = useState<any>(null);

  useEffect(() => {
    Promise.all([api.donationTiers(), api.donationMethods()])
      .then(([t, m]) => { setTiers(t); setMethods(m); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const sendStkPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPhone || !mpesaAmount) return;
    setMpesaSending(true);
    setMpesaResult(null);
    try {
      const res = await fetch('/api/mpesa-stkpush/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mpesaPhone, amount: mpesaAmount }),
      });
      const data = await res.json();
      setMpesaResult(data);
    } catch (err: any) {
      setMpesaResult({ error: 'Network error. Try again.' });
    }
    setMpesaSending(false);
  };

  if (loading) return <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--on-surface-variant)',fontSize:18}}>Loading...</div>;

  return (
    <div>
      {/* Header */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=600&fit=crop)',backgroundSize:'cover'}}/>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full bg-white/8 text-white/70 border border-white/6">Support Us</span>
          <h1 className="font-['Montserrat'] font-extrabold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">Make a Donation</h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">Every contribution helps us create lasting change in Bungoma County.</p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 md:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-primary">Choose Your Impact</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
            {tiers.map((t: any) => {
              const I = iconMap[t.icon] || Heart;
              return (
                <div key={t.id} className={clx("relative bg-surface border rounded-2xl p-7 text-center transition-all group hover:shadow-[0_12px_36px_rgba(0,17,58,0.08)] hover:-translate-y-1",
                  t.is_popular ? "border-secondary shadow-lg shadow-secondary/5" : "border-outline-variant")}>
                  {t.is_popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">Most Popular</div>}
                  <div className={clx("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4", t.is_popular ? "bg-secondary/10" : "bg-primary/5")}>
                    <I size={22} className={t.is_popular ? "text-secondary" : "text-primary"}/>
                  </div>
                  <div className="font-['Montserrat'] font-extrabold text-2xl text-primary mb-1">{t.amount}</div>
                  <div className="text-xs text-secondary font-semibold uppercase tracking-wider mb-3">{t.label}</div>
                  <p className="text-sm text-on-surface-variant mb-5">{t.description}</p>
                  <button onClick={() => setMpesaAmount(t.amount.replace(/[^0-9]/g,''))}
                    className={clx("w-full py-2.5 rounded-xl font-semibold text-sm transition-all",
                      t.is_popular ? "bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20" : "bg-primary hover:bg-primary/90 text-white")}>
                    Donate {t.amount}
                  </button>
                </div>
              );
            })}
          </div>

          {/* M-Pesa STK Push Form */}
          <div className="max-w-lg mx-auto">
            <div className="bg-surface border-2 border-secondary/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Smartphone size={22} className="text-green-600"/>
                </div>
                <div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-primary">M-Pesa Donation</h3>
                  <p className="text-xs text-on-surface-variant">Enter your M-Pesa number and amount. You'll receive a prompt to complete.</p>
                </div>
              </div>

              <form onSubmit={sendStkPush} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">M-Pesa Phone Number</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                    <Phone size={15} className="text-on-surface-variant shrink-0"/>
                    <input value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)}
                      placeholder="0712 345 678" required
                      className="w-full bg-transparent outline-none text-sm"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">Amount (KSh)</label>
                  <input value={mpesaAmount} onChange={e => setMpesaAmount(e.target.value)}
                    type="number" min="1" placeholder="500" required
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"/>
                </div>
                <button type="submit" disabled={mpesaSending}
                  className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-md shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-2">
                  {mpesaSending ? 'Sending...' : <><Send size={15}/> Pay with M-Pesa</>}
                </button>
              </form>

              {mpesaResult && (
                <div className={clx("mt-4 p-4 rounded-xl text-sm",
                  mpesaResult.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200")}>
                  {mpesaResult.message || mpesaResult.error || 'Unknown response'}
                  {mpesaResult.success && (
                    <p className="text-xs mt-1 opacity-70">Check your phone and enter your M-Pesa PIN to complete the payment.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Payment Methods */}
      {methods.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mx-auto bg-surface border border-outline-variant rounded-2xl p-6 md:p-10">
              <h3 className="font-['Montserrat'] font-bold text-xl text-primary text-center mb-8">Other Ways to Give</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {methods.map((m: any) => (
                  <div key={m.id} className="bg-surface-container-low rounded-xl p-5 text-center">
                    <span className="text-2xl mb-3 block">{m.icon}</span>
                    <div className="font-['Montserrat'] font-semibold text-sm text-primary mb-3">{m.title}</div>
                    {Array.isArray(m.details) && m.details.map((d: string) => (
                      <div key={d} className="text-xs text-on-surface-variant flex items-center justify-center gap-1.5">
                        <Check size={10} className="text-secondary"/>{d}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-on-surface-variant">
                For inquiries, <button onClick={()=>navigate("/contact")} className="text-primary font-semibold underline hover:text-accent">contact us</button>.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Impact */}
      <section className="py-16 md:py-20 bg-secondary text-white text-center">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl mb-3">Your Donation Changes Lives</h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm">100% of donations go directly to our community programs across Bungoma County.</p>
        </div>
      </section>
    </div>
  );
}
