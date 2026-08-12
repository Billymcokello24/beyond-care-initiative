import PublicLayout from '@/components/PublicLayout';
import pool from '@/lib/db';
import Link from 'next/link';

async function getData() {
  const [programs, events, news] = await Promise.all([
    pool.query('SELECT * FROM programs WHERE published = true ORDER BY sort_order LIMIT 3'),
    pool.query('SELECT * FROM events WHERE published = true ORDER BY event_date LIMIT 3'),
    pool.query('SELECT * FROM news WHERE published = true ORDER BY published_at DESC LIMIT 3'),
    pool.query('SELECT * FROM settings'),
  ]);
  const settings: Record<string,string> = {};
  (await pool.query('SELECT * FROM settings')).rows.forEach((r:any) => { settings[r.key] = r.value; });
  return { programs: programs.rows, events: events.rows, news: news.rows, settings };
}

export default async function HomePage() {
  const { programs, events, news, settings } = await getData();

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background:'var(--primary)', padding:'120px 0 80px', textAlign:'center', color:'white', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.08, backgroundImage:'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop)', backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <span style={{ display:'inline-block', fontSize:12, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', padding:'4px 16px', borderRadius:20, background:'rgba(255,255,255,0.1)', marginBottom:16 }}>
            {settings.org_type || 'Community-Based Organization'}
          </span>
          <h1 style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:56, lineHeight:1.1, marginBottom:16 }}>
            {settings.site_name || 'Beyond Care Initiative CBO'}
          </h1>
          <p style={{ fontSize:20, opacity:0.6, maxWidth:600, margin:'0 auto 32px' }}>
            {settings.site_slogan || '"Rethink, Reshape and Restart Our Pathways."'}
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/programs" className="btn btn-accent">Our Programs</Link>
            <Link href="/about" className="btn btn-outline" style={{ borderColor:'rgba(255,255,255,0.3)', color:'white' }}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      {programs.length > 0 && (
        <section style={{ padding:'80px 0', background:'var(--surface-container-lowest)' }}>
          <div className="container">
            <h2 style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:32, textAlign:'center', marginBottom:40, color:'var(--primary)' }}>What We Do</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:20 }}>
              {programs.map((p: any) => (
                <div key={p.id} className="card" style={{ transition:'all 0.3s', cursor:'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 40px rgba(0,17,58,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
                  {p.image_url && <img src={p.image_url} alt={p.title} style={{ width:'100%', height:180, objectFit:'cover', borderRadius:8, marginBottom:16 }} />}
                  <h3 style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:18, color:'var(--primary)', marginBottom:8 }}>{p.title}</h3>
                  <p style={{ fontSize:14, color:'var(--on-surface-variant)', lineHeight:1.6 }}>{p.description?.slice(0, 120)}...</p>
                  {p.stat_label && <span style={{ display:'inline-block', marginTop:12, fontSize:12, fontWeight:600, padding:'4px 10px', borderRadius:12, background:'rgba(0,17,58,0.08)', color:'var(--primary)' }}>{p.stat_label}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section style={{ padding:'80px 0', background:'var(--surface-container-low)' }}>
          <div className="container">
            <h2 style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:32, textAlign:'center', marginBottom:40, color:'var(--primary)' }}>Upcoming Events</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(350px,1fr))', gap:16 }}>
              {events.map((e: any) => (
                <div key={e.id} className="card" style={{ borderLeft:`4px solid ${e.accent_color || 'var(--accent)'}` }}>
                  <span style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', padding:'2px 8px', borderRadius:8, background:'rgba(230,81,0,0.1)', color:'var(--accent)' }}>{e.type}</span>
                  <h3 style={{ fontFamily:'Montserrat', fontWeight:700, margin:'8px 0', color:'var(--primary)' }}>{e.title}</h3>
                  <p style={{ fontSize:13, color:'var(--on-surface-variant)' }}>📅 {new Date(e.event_date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })} — {e.event_time}</p>
                  <p style={{ fontSize:13, color:'var(--on-surface-variant)' }}>📍 {e.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section style={{ padding:'80px 0', background:'var(--surface-container-lowest)' }}>
          <div className="container">
            <h2 style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:32, textAlign:'center', marginBottom:40, color:'var(--primary)' }}>Latest News</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:20 }}>
              {news.map((n: any) => (
                <div key={n.id} className="card">
                  {n.image_url && <img src={n.image_url} alt={n.title} style={{ width:'100%', height:180, objectFit:'cover', borderRadius:8, marginBottom:16 }} />}
                  <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:12, background: n.tag_color || 'rgba(0,17,58,0.08)', color:'var(--primary)' }}>{n.tag}</span>
                  <h3 style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:16, color:'var(--primary)', margin:'8px 0' }}>{n.title}</h3>
                  <p style={{ fontSize:13, color:'var(--on-surface-variant)', lineHeight:1.6 }}>{n.excerpt?.slice(0, 150)}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
