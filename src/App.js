import { useState } from 'react';


const COLORS = {
  green: { bg: '#E1F5EE', border: '#9FE1CB', text: '#085041', accent: '#1D9E75', dark: '#0F6E56' },
  blue:  { bg: '#E6F1FB', border: '#B5D4F4', text: '#185FA5' },
  purple:{ bg: '#EEEDFE', border: '#CECBF6', text: '#534AB7' },
  amber: { bg: '#FAEEDA', border: '#FAC775', text: '#854F0B' },
  gray:  { bg: '#F1EFE8', border: '#D3D1C7', text: '#5F5E5A' },
  lime:  { bg: '#EAF3DE', border: '#C0DD97', text: '#3B6D11' },
  warn:  { bg: '#FFF8EC', border: '#FAC775', text: '#854F0B' },
};

const s = {
  portal: { display:'flex', flexDirection:'column', minHeight:'100vh', background:'#f5f5f3' },
  topbar: { background:'#fff', borderBottom:'0.5px solid #e0ddd5', padding:'0 24px', height:54, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 },
  topLeft: { display:'flex', alignItems:'center', gap:10 },
  logoMark: { display:'flex', alignItems:'center' },
  logoText: { fontSize:13, fontWeight:700, color:'#1a1a1a', letterSpacing:'0.12em' },
  divider: { width:1, height:16, background:'#e0ddd5' },
  portalLabel: { fontSize:12, color:'#888' },
  topRight: { display:'flex', alignItems:'center', gap:10 },
  tierBadge: { fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, background:COLORS.green.bg, color:COLORS.green.text, border:`0.5px solid ${COLORS.green.border}` },
  partnerName: { fontSize:12, color:'#888' },
  avatar: { width:30, height:30, borderRadius:'50%', background:COLORS.green.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600, color:COLORS.green.dark },
  layout: { display:'flex', flex:1 },
  sidebar: { width:196, minWidth:196, background:'#fff', borderRight:'0.5px solid #e0ddd5', padding:'18px 0', position:'sticky', top:54, height:'calc(100vh - 54px)', overflowY:'auto' },
  navGroup: { marginBottom:20 },
  navGroupLabel: { fontSize:10, fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase', color:'#aaa', padding:'0 16px', marginBottom:4, display:'block' },
  navItem: (active) => ({ display:'flex', alignItems:'center', gap:9, padding:'7px 16px', cursor:'pointer', fontSize:13, color: active ? COLORS.green.dark : '#666', borderLeft: active ? `2px solid ${COLORS.green.accent}` : '2px solid transparent', background: active ? COLORS.green.bg : 'transparent', fontWeight: active ? 600 : 400, transition:'all 0.1s' }),
  navDot: (color) => ({ width:6, height:6, borderRadius:'50%', flexShrink:0, background:color }),
  navCount: { marginLeft:'auto', fontSize:10, background:COLORS.blue.bg, color:COLORS.blue.text, borderRadius:10, padding:'1px 6px', fontWeight:600 },
  main: { flex:1, padding:26, overflowY:'auto' },
  pageHeader: { marginBottom:22 },
  pageTitle: { fontSize:17, fontWeight:600, color:'#1a1a1a' },
  pageSub: { fontSize:13, color:'#888', marginTop:3 },
  statsRow: { display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:10, marginBottom:22 },
  stat: { background:'#f0ede6', borderRadius:8, padding:'13px 15px' },
  statLabel: { fontSize:11, color:'#888', fontWeight:600, marginBottom:5 },
  statValue: { fontSize:21, fontWeight:600, color:'#1a1a1a' },
  statSub: { fontSize:11, color:'#aaa', marginTop:2 },
  card: { background:'#fff', border:'0.5px solid #e0ddd5', borderRadius:12, overflow:'hidden', marginBottom:18 },
  cardHeader: { padding:'13px 18px', borderBottom:'0.5px solid #e0ddd5', display:'flex', alignItems:'center', justifyContent:'space-between' },
  cardTitle: { fontSize:13, fontWeight:600, color:'#1a1a1a' },
  table: { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th: { textAlign:'left', padding:'9px 18px', fontSize:10, fontWeight:600, letterSpacing:'0.05em', textTransform:'uppercase', color:'#888', background:'#f8f7f4', borderBottom:'0.5px solid #e0ddd5' },
  td: { padding:'11px 18px', borderBottom:'0.5px solid #e0ddd5', color:'#1a1a1a', verticalAlign:'top' },
  badge: (type) => {
    const map = { new: COLORS.blue, active: COLORS.green, won: COLORS.lime, pending: COLORS.amber, paid: COLORS.lime, processing: COLORS.warn, scheduled: COLORS.gray };
    const c = map[type] || COLORS.gray;
    return { display:'inline-flex', alignItems:'center', fontSize:11, fontWeight:600, padding:'2px 9px', borderRadius:20, background:c.bg, color:c.text, border:`0.5px solid ${c.border}` };
  },
  prodTag: (prod) => {
    const map = { lynx: COLORS.blue, ds: COLORS.purple, api: COLORS.amber, cpdf: COLORS.green };
    const c = map[prod] || COLORS.gray;
    return { display:'inline-block', fontSize:11, padding:'2px 8px', borderRadius:4, fontWeight:600, background:c.bg, color:c.text };
  },
  btn: { display:'inline-flex', alignItems:'center', gap:5, padding:'6px 13px', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer', border:'0.5px solid #ccc', background:'#fff', color:'#1a1a1a', fontFamily:'inherit' },
  btnPrimary: { background:COLORS.green.accent, borderColor:COLORS.green.accent, color:'#fff' },
  btnSm: { padding:'4px 10px', fontSize:11 },
  formGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, padding:18 },
  formGroup: { display:'flex', flexDirection:'column', gap:5 },
  formLabel: { fontSize:12, fontWeight:600, color:'#888' },
  formInput: { height:34, padding:'0 11px', borderRadius:8, border:'0.5px solid #ccc', background:'#fff', color:'#1a1a1a', fontSize:13, fontFamily:'inherit', outline:'none' },
  formFooter: { padding:'14px 18px', borderTop:'0.5px solid #e0ddd5', display:'flex', justifyContent:'flex-end', gap:8 },
  provBlock: { background:'#f8f7f4', borderRadius:8, padding:14, margin:'0 18px 18px' },
  provTitle: { fontSize:11, fontWeight:600, color:'#888', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' },
  infoNote: (color) => ({ display:'flex', gap:9, alignItems:'flex-start', background:color.bg, border:`0.5px solid ${color.border}`, borderRadius:8, padding:'11px 13px', margin:'0 18px 18px', fontSize:12, color:color.text, lineHeight:1.55 }),
  successBanner: { display:'flex', alignItems:'center', gap:9, background:COLORS.green.bg, border:`0.5px solid ${COLORS.green.border}`, borderRadius:8, padding:'11px 14px', marginBottom:16, fontSize:13, color:COLORS.green.dark },
  tabs: { display:'flex', borderBottom:'0.5px solid #e0ddd5', marginBottom:18 },
  tab: (active) => ({ padding:'9px 14px', fontSize:12, cursor:'pointer', color: active ? COLORS.green.dark : '#888', borderBottom: active ? `2px solid ${COLORS.green.accent}` : '2px solid transparent', marginBottom:-0.5, fontWeight: active ? 600 : 400 }),
  progressWrap: { background:'#e0ddd5', borderRadius:4, height:5, marginTop:6, overflow:'hidden' },
  progressBar: (pct) => ({ height:'100%', borderRadius:4, background:COLORS.green.accent, width:`${pct}%` }),
  methodCard: (primary) => ({ border: primary ? `0.5px solid ${COLORS.green.accent}` : '0.5px solid #e0ddd5', borderRadius:12, padding:'16px 18px', marginBottom:14, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, background:'#fff' }),
  methodIcon: (bg) => ({ width:36, height:36, borderRadius:8, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }),
  scheduleGrid: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:18 },
  scheduleItem: { background:'#f0ede6', borderRadius:8, padding:'12px 14px' },
  payHistRow: { display:'flex', alignItems:'center', padding:'11px 18px', borderBottom:'0.5px solid #e0ddd5', fontSize:13, gap:12 },
  matRow: { display:'flex', alignItems:'center', padding:'10px 18px', borderBottom:'0.5px solid #e0ddd5', fontSize:13, gap:10 },
  matIcon: (bg) => ({ width:28, height:28, borderRadius:6, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }),
  resGrid: { display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:14 },
  resCard: { background:'#fff', border:'0.5px solid #e0ddd5', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column' },
  spRow: { display:'flex', gap:8, marginBottom:9, fontSize:12, color:'#1a1a1a', lineHeight:1.5 },
  sectionDivider: { fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', color:'#aaa', padding:'14px 0 8px' },
};

const PROD_NAMES = { lynx:'LynxPDF', ds:'DottedSign Business', api:'DottedSign API', cpdf:'ComPDFKit' };

const initialLeads = [
  { id:1, contact:'Sarah Chen', title:'Dir. of Operations', company:'Meridian Health Group', prod:'ds', value:4200, status:'new', date:'Dec 3' },
  { id:2, contact:'Tyler Moss', title:'IT Manager', company:'GreenPath Logistics', prod:'lynx', value:7800, status:'new', date:'Nov 30' },
  { id:3, contact:'Amanda Reyes', title:'VP of Engineering', company:'StructurePoint LLC', prod:'lynx', value:12000, status:'active', date:'Nov 18' },
  { id:4, contact:'David Wu', title:'CTO', company:'Northgate Software', prod:'cpdf', value:3600, status:'won', date:'Oct 22' },
];

const initialDeals = [
  { id:1, company:'StructurePoint LLC', prod:'lynx', value:12000, close:'Dec 20, 2025', status:'active', notes:'Demo scheduled' },
  { id:2, company:'FirmBridge Legal', prod:'api', value:8500, close:'Dec 15, 2025', status:'pending', notes:'Awaiting KDAN API config' },
  { id:3, company:'Orbis Analytics', prod:'cpdf', value:4200, close:'Nov 15, 2025', status:'won', notes:'Closed, commission paid' },
];

const commissions = [
  { company:'Hartland Insurance', prod:'ds', deal:16000, rate:20, comm:3200, status:'processing', date:'Dec 1, 2025' },
  { company:'Orbis Analytics', prod:'cpdf', deal:4200, rate:20, comm:840, status:'paid', paidDate:'Nov 15', date:'Nov 15, 2025' },
  { company:'Northgate Software', prod:'cpdf', deal:3600, rate:20, comm:720, status:'paid', paidDate:'Oct 15', date:'Oct 22, 2025' },
  { company:'ClearPath Realty', prod:'lynx', deal:19400, rate:20, comm:3880, status:'paid', paidDate:'Sep 15', date:'Sep 8, 2025' },
];

const payHistory = [
  { date:'Nov 15, 2025', desc:'Commission payout · 2 deals (Oct)', amount:'$1,560', status:'paid' },
  { date:'Oct 15, 2025', desc:'Commission payout · 1 deal (Sep)', amount:'$3,880', status:'paid' },
  { date:'Sep 15, 2025', desc:'Commission payout · 1 deal (Aug)', amount:'$720', status:'paid' },
  { date:'Aug 15, 2025', desc:'Commission payout · 1 deal (Jul)', amount:'$480', status:'paid' },
];

const materials = [
  { prod:'lynx', icon:'📄', name:'LynxPDF vs. Adobe — Competitive battle card', desc:'Key objection handlers and feature comparison for enterprise sales', type:'PDF · 2 p.' },
  { prod:'lynx', icon:'📊', name:'LynxPDF enterprise pricing guide', desc:'Volume tier pricing, bundle options, and partner margin structure', type:'PDF · 4 p.' },
  { prod:'lynx', icon:'🖥', name:'LynxPDF product overview deck', desc:'Partner-facing slide deck for first enterprise meetings', type:'PPTX · 18 sl.' },
  { prod:'ds',   icon:'📄', name:'DottedSign vs. DocuSign — Battle card', desc:'Cost comparison and objection handling for DocuSign displacement', type:'PDF · 2 p.' },
  { prod:'ds',   icon:'🖥', name:'DottedSign Business demo deck', desc:'Walk-through deck for enterprise demos, including workflow examples', type:'PPTX · 22 sl.' },
  { prod:'api',  icon:'📋', name:'DottedSign API integration guide', desc:'Technical overview for ISV and SaaS partner conversations', type:'PDF · 8 p.' },
  { prod:'ds',   icon:'📊', name:'DottedSign ROI calculator (partner version)', desc:'Excel model for estimating client savings vs. DocuSign', type:'XLSX' },
  { prod:'cpdf', icon:'📄', name:'ComPDFKit vs. PDFTron — Competitive brief', desc:'Technical and commercial comparison for developer-led evaluations', type:'PDF · 3 p.' },
  { prod:'cpdf', icon:'💻', name:'ComPDFKit quick-start code samples', desc:'iOS, Android, Web, and Desktop starter code for developer evaluations', type:'ZIP' },
  { prod:'cpdf', icon:'🖥', name:'ComPDFKit technical overview deck', desc:'Architecture and feature walk-through for IT and developer audiences', type:'PPTX · 14 sl.' },
];

function ProdTag({ prod }) {
  return <span style={s.prodTag(prod)}>{PROD_NAMES[prod]}</span>;
}

function Badge({ type, label }) {
  const labels = { new:'New', active:'In progress', won:'Won', pending:'Pending', paid:'Paid', processing:'Processing', scheduled:'Scheduled' };
  return <span style={s.badge(type)}>{label || labels[type]}</span>;
}

function Btn({ children, primary, sm, onClick, style: sx }) {
  return (
    <button style={{ ...s.btn, ...(primary ? s.btnPrimary : {}), ...(sm ? s.btnSm : {}), ...sx }} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ title, action, children }) {
  return (
    <div style={s.card}>
      {title && <div style={s.cardHeader}><span style={s.cardTitle}>{title}</span>{action}</div>}
      <div>{children}</div>
    </div>
  );
}

function NavItem({ label, page, color, count, active, onClick }) {
  return (
    <div style={s.navItem(active)} onClick={() => onClick(page)}>
      <div style={s.navDot(color)} />
      {label}
      {count !== undefined && <span style={s.navCount}>{count}</span>}
    </div>
  );
}

// ── PAGES ──────────────────────────────────────────────────────────────────

function Dashboard({ leads, deals, goTo }) {
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Welcome back, BoxCollider</div><div style={s.pageSub}>Your partner activity at a glance</div></div>
      <div style={s.statsRow}>
        <div style={s.stat}><div style={s.statLabel}>Open leads</div><div style={s.statValue}>{leads.filter(l=>l.status==='new').length}</div><div style={s.statSub}>from KDAN</div></div>
        <div style={s.stat}><div style={s.statLabel}>Registered deals</div><div style={s.statValue}>{deals.length}</div><div style={s.statSub}>in pipeline</div></div>
        <div style={s.stat}><div style={s.statLabel}>YTD commission</div><div style={{...s.statValue,color:COLORS.green.dark}}>$8,640</div><div style={s.statSub}>4 closed deals</div></div>
        <div style={s.stat}><div style={s.statLabel}>Next payout</div><div style={s.statValue}>$3,200</div><div style={s.statSub}>Jan 15, 2026</div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:18}}>
        <Card title="Tier progress">
          <div style={{padding:'14px 18px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
              <span style={{fontSize:12,color:'#888'}}>Silver → Gold</span>
              <span style={{fontSize:12,fontWeight:600}}>$8,640 / $15,000</span>
            </div>
            <div style={s.progressWrap}><div style={s.progressBar(57.6)} /></div>
            <div style={{fontSize:11,color:'#aaa',marginTop:6}}>$6,360 more to Gold tier (25% commission rate)</div>
          </div>
        </Card>
        <Card title="Upcoming payout">
          <div style={{padding:'14px 18px'}}>
            <div style={{fontSize:21,fontWeight:600,color:COLORS.green.dark,marginBottom:4}}>$3,200</div>
            <div style={{fontSize:12,color:'#888',marginBottom:8}}>Via PayPal · Jan 15, 2026</div>
            <div style={{fontSize:12,color:'#888'}}>1 deal pending approval · <span style={{color:COLORS.amber.text}}>1 processing</span></div>
          </div>
        </Card>
      </div>
      <Card title="Recent activity" action={<Btn sm onClick={() => goTo('leads')}>All leads</Btn>}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Company</th><th style={s.th}>Product</th><th style={s.th}>Type</th><th style={s.th}>Status</th><th style={s.th}>Date</th></tr></thead>
          <tbody>
            <tr><td style={s.td}>Meridian Health</td><td style={s.td}><ProdTag prod="ds"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Inbound lead</td><td style={s.td}><Badge type="new"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Dec 3</td></tr>
            <tr><td style={s.td}>StructurePoint LLC</td><td style={s.td}><ProdTag prod="lynx"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Deal registered</td><td style={s.td}><Badge type="active"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Nov 28</td></tr>
            <tr><td style={s.td}>Orbis Analytics</td><td style={s.td}><ProdTag prod="cpdf"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Commission paid</td><td style={s.td}><Badge type="paid"/></td><td style={{...s.td,color:'#888',fontSize:12}}>Nov 15</td></tr>
            <tr><td style={{...s.td,borderBottom:'none'}}>FirmBridge Legal</td><td style={{...s.td,borderBottom:'none'}}><ProdTag prod="api"/></td><td style={{...s.td,borderBottom:'none',color:'#888',fontSize:12}}>Pending setup</td><td style={{...s.td,borderBottom:'none'}}><Badge type="pending"/></td><td style={{...s.td,borderBottom:'none',color:'#888',fontSize:12}}>Nov 10</td></tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Leads({ leads, setLeads }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? leads : leads.filter(l => filter === 'closed' ? l.status === 'won' : l.status === filter);
  const accept = (id) => setLeads(prev => prev.map(l => l.id === id ? {...l, status:'active'} : l));
  const decline = (id) => setLeads(prev => prev.filter(l => l.id !== id));
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Leads from KDAN</div><div style={s.pageSub}>Opportunities passed to your team. Accept to register and protect your deal.</div></div>
      <div style={s.tabs}>
        {['all','new','active','closed'].map(f => (
          <div key={f} style={s.tab(filter===f)} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)} ({f==='all'?leads.length:f==='closed'?leads.filter(l=>l.status==='won').length:leads.filter(l=>l.status===f).length})
          </div>
        ))}
      </div>
      <Card>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Contact</th><th style={s.th}>Company</th><th style={s.th}>Product</th><th style={s.th}>Est. value</th><th style={s.th}>Status</th><th style={s.th}>Passed</th><th style={s.th}></th></tr></thead>
          <tbody>
            {filtered.map((l,i) => (
              <tr key={l.id}>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}><strong>{l.contact}</strong><br/><span style={{fontSize:11,color:'#888'}}>{l.title}</span></td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}>{l.company}</td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}><ProdTag prod={l.prod}/></td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}>${l.value.toLocaleString()}</td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}><Badge type={l.status}/></td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined,color:'#888',fontSize:12}}>{l.date}</td>
                <td style={{...s.td,borderBottom:i===filtered.length-1?'none':undefined}}>
                  {l.status==='new' && <div style={{display:'flex',gap:6}}><Btn sm primary onClick={()=>accept(l.id)}>Accept</Btn><Btn sm onClick={()=>decline(l.id)}>Decline</Btn></div>}
                  {l.status==='active' && <Btn sm>Update status</Btn>}
                  {l.status==='won' && <span style={{fontSize:12,color:'#aaa'}}>Closed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function RegisterDeal({ deals, setDeals }) {
  const [form, setForm] = useState({ co:'', ct:'', em:'', prod:'', val:'', cl:'', notes:'' });
  const [success, setSuccess] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const submit = () => {
    if (!form.co || !form.ct || !form.prod || !form.val || !form.cl) { alert('Please complete all required fields.'); return; }
    setDeals(prev => [{ id: Date.now(), company:form.co, prod:form.prod, value:parseInt(form.val), close:form.cl, status:'active', notes:form.notes||'Just registered' }, ...prev]);
    setForm({ co:'', ct:'', em:'', prod:'', val:'', cl:'', notes:'' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const showProv = !!form.prod;
  const Prov = ({ children, title }) => (
    <div style={s.provBlock}>
      <div style={s.provTitle}>{title}</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11}}>{children}</div>
    </div>
  );
  const FG = ({ label, children }) => <div style={s.formGroup}><label style={s.formLabel}>{label}</label>{children}</div>;
  const FI = (props) => <input style={s.formInput} {...props}/>;
  const FS = ({ children, ...props }) => <select style={s.formInput} {...props}>{children}</select>;

  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Register a deal</div><div style={s.pageSub}>Protect your opportunity and start the commission clock</div></div>
      {success && <div style={s.successBanner}><span>✓</span> Deal registered. Your partner manager will confirm within 1 business day.</div>}
      <Card title="Deal details">
        <div style={s.formGrid}>
          <FG label="Client company"><FI type="text" placeholder="Acme Corp" value={form.co} onChange={e=>set('co',e.target.value)}/></FG>
          <FG label="Primary contact"><FI type="text" placeholder="Jane Smith" value={form.ct} onChange={e=>set('ct',e.target.value)}/></FG>
          <FG label="Contact email"><FI type="email" placeholder="jane@acme.com" value={form.em} onChange={e=>set('em',e.target.value)}/></FG>
          <FG label="Product line">
            <FS value={form.prod} onChange={e=>set('prod',e.target.value)}>
              <option value="">Select product...</option>
              <option value="lynx">LynxPDF</option>
              <option value="ds">DottedSign Business</option>
              <option value="api">DottedSign API</option>
              <option value="cpdf">ComPDFKit</option>
            </FS>
          </FG>
          <FG label="Estimated value (USD)"><FI type="number" placeholder="5000" value={form.val} onChange={e=>set('val',e.target.value)}/></FG>
          <FG label="Expected close date"><FI type="date" value={form.cl} onChange={e=>set('cl',e.target.value)}/></FG>
          <div style={{...s.formGroup,gridColumn:'1/-1'}}><label style={s.formLabel}>Notes for KDAN (optional)</label><FI type="text" placeholder="Any context that helps us support this deal" value={form.notes} onChange={e=>set('notes',e.target.value)}/></div>
        </div>

        {showProv && (
          <>
            {form.prod==='lynx' && (
              <>
                <Prov title="LynxPDF provisioning">
                  <FG label="Number of licenses"><FI type="number" placeholder="e.g. 25"/></FG>
                  <FG label="Account type"><FS><option>Admin</option><option>User</option><option>Mixed</option></FS></FG>
                </Prov>
                <div style={s.infoNote(COLORS.blue)}><span>ℹ</span><div><strong>Perpetual license.</strong> Free admin console included on all accounts — no additional charge. Key differentiator vs. Adobe Acrobat.</div></div>
              </>
            )}
            {form.prod==='ds' && (
              <Prov title="DottedSign Business provisioning">
                <FG label="Number of accounts"><FI type="number" placeholder="min. 10"/></FG>
                <FG label="Account authority"><FS><option>Mixed</option><option>Admin only</option><option>User only</option></FS></FG>
                <FG label="Signing tasks / month"><FI type="number" placeholder="e.g. 500"/></FG>
                <FG label="Templates"><FI type="number" placeholder="e.g. 50"/></FG>
                <FG label="Subscription period"><FS><option>12 months</option><option>24 months</option><option>36 months</option></FS></FG>
                <FG label="Number of admins"><FI type="number" placeholder="e.g. 3"/></FG>
              </Prov>
            )}
            {form.prod==='api' && (
              <>
                <Prov title="DottedSign API provisioning">
                  <FG label="Number of accounts"><FI type="number" placeholder="e.g. 10"/></FG>
                  <FG label="Account authority"><FS><option>Mixed</option><option>Admin only</option><option>User only</option></FS></FG>
                  <FG label="Signing tasks / month"><FI type="number" placeholder="e.g. 2000"/></FG>
                  <FG label="Templates"><FI type="number" placeholder="e.g. 100"/></FG>
                  <FG label="Subscription period"><FS><option>12 months</option><option>24 months</option><option>36 months</option></FS></FG>
                  <FG label="Number of admins"><FI type="number" placeholder="e.g. 2"/></FG>
                </Prov>
                <div style={s.infoNote(COLORS.amber)}><span>⏳</span><div><strong>API provisioning is fulfilled manually by KDAN.</strong> After deal close, your partner manager will configure the environment and deliver credentials within 3–5 business days.</div></div>
              </>
            )}
            {form.prod==='cpdf' && (
              <Prov title="ComPDFKit provisioning">
                <FG label="License type"><FS><option>SDK — Desktop</option><option>SDK — Mobile</option><option>SDK — Web</option><option>SDK — Server</option><option>Multi-platform bundle</option></FS></FG>
                <FG label="Developer seats"><FI type="number" placeholder="e.g. 5"/></FG>
              </Prov>
            )}
          </>
        )}
        <div style={s.formFooter}>
          <Btn onClick={() => setForm({ co:'',ct:'',em:'',prod:'',val:'',cl:'',notes:'' })}>Clear</Btn>
          <Btn primary onClick={submit}>Register deal</Btn>
        </div>
      </Card>
    </div>
  );
}

function MyDeals({ deals }) {
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>My deals</div><div style={s.pageSub}>All registered deals and their current status</div></div>
      <Card>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Client</th><th style={s.th}>Product</th><th style={s.th}>Value</th><th style={s.th}>Close date</th><th style={s.th}>Status</th><th style={s.th}>Notes</th></tr></thead>
          <tbody>
            {deals.map((d,i) => (
              <tr key={d.id}>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined}}><strong>{d.company}</strong></td>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined}}><ProdTag prod={d.prod}/></td>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined}}>${d.value.toLocaleString()}</td>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined,fontSize:12,color:'#888'}}>{d.close}</td>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined}}><Badge type={d.status}/></td>
                <td style={{...s.td,borderBottom:i===deals.length-1?'none':undefined,fontSize:12,color:'#888'}}>{d.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Commissions() {
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Commission tracker</div><div style={s.pageSub}>Deal-level earnings and payout status</div></div>
      <div style={s.statsRow}>
        <div style={s.stat}><div style={s.statLabel}>Earned (YTD)</div><div style={{...s.statValue,color:COLORS.green.dark}}>$8,640</div><div style={s.statSub}>4 closed deals</div></div>
        <div style={s.stat}><div style={s.statLabel}>Pending payout</div><div style={s.statValue}>$3,200</div><div style={s.statSub}>Jan 15, 2026</div></div>
        <div style={s.stat}><div style={s.statLabel}>Commission rate</div><div style={s.statValue}>20%</div><div style={s.statSub}>Silver tier</div></div>
        <div style={s.stat}><div style={s.statLabel}>Gold tier in</div><div style={s.statValue}>$6,360</div><div style={s.statSub}>for 25% rate</div></div>
      </div>
      <Card>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Client</th><th style={s.th}>Product</th><th style={s.th}>Deal value</th><th style={s.th}>Rate</th><th style={s.th}>Commission</th><th style={s.th}>Payout status</th><th style={s.th}>Close date</th></tr></thead>
          <tbody>
            {commissions.map((c,i) => (
              <tr key={i}>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined}}><strong>{c.company}</strong></td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined}}><ProdTag prod={c.prod}/></td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined}}>${c.deal.toLocaleString()}</td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined}}>{c.rate}%</td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined,fontWeight:600,color:COLORS.green.dark}}>${c.comm.toLocaleString()}</td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined}}><Badge type={c.status} label={c.status==='paid'?`Paid ${c.paidDate}`:undefined}/></td>
                <td style={{...s.td,borderBottom:i===commissions.length-1?'none':undefined,fontSize:12,color:'#888'}}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div style={{fontSize:12,color:'#888',padding:'4px 0'}}>Payouts processed on the 15th of each month for deals closed in the prior month. Silver: 20%. Gold: 25%.</div>
    </div>
  );
}

function Payouts() {
  const [methods, setMethods] = useState([
    { id:1, type:'paypal', label:'PayPal', sub:'payments@boxcollider.com', icon:'💳', iconBg:COLORS.blue.bg, primary:true },
    { id:2, type:'ach', label:'Bank transfer (ACH)', sub:'Chase Bank ···· 4821 · USD', icon:'🏦', iconBg:COLORS.green.bg, primary:false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [nmType, setNmType] = useState('');
  const setPrimary = (id) => setMethods(prev => prev.map(m => ({...m, primary: m.id===id})));
  const removeMethod = (id) => setMethods(prev => prev.filter(m => m.id!==id));
  const addMethod = () => {
    if (!nmType) { alert('Select a method type.'); return; }
    const labels = { paypal:'PayPal', ach:'Bank transfer (ACH)', wire:'International wire' };
    const icons = { paypal:'💳', ach:'🏦', wire:'🌐' };
    const bgs = { paypal:COLORS.blue.bg, ach:COLORS.green.bg, wire:COLORS.amber.bg };
    setMethods(prev => [...prev, { id:Date.now(), type:nmType, label:labels[nmType], sub:'Newly added', icon:icons[nmType], iconBg:bgs[nmType], primary:false }]);
    setNmType(''); setShowAdd(false);
  };

  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Payouts &amp; settings</div><div style={s.pageSub}>Manage how and when you receive commission payments</div></div>
      <div style={s.sectionDivider}>Payout schedule</div>
      <div style={s.scheduleGrid}>
        <div style={s.scheduleItem}><div style={{fontSize:11,color:'#888',marginBottom:4}}>Payout cycle</div><div style={{fontSize:14,fontWeight:600}}>Monthly</div></div>
        <div style={s.scheduleItem}><div style={{fontSize:11,color:'#888',marginBottom:4}}>Processing date</div><div style={{fontSize:14,fontWeight:600}}>15th of month</div></div>
        <div style={s.scheduleItem}><div style={{fontSize:11,color:'#888',marginBottom:4}}>Minimum payout</div><div style={{fontSize:14,fontWeight:600}}>$100 USD</div></div>
      </div>
      <div style={s.sectionDivider}>Payment methods</div>
      {methods.map(m => (
        <div key={m.id} style={s.methodCard(m.primary)}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={s.methodIcon(m.iconBg)}>{m.icon}</div>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{m.label}</div>
              <div style={{fontSize:12,color:'#888',marginTop:3}}>{m.sub}{m.primary && <span style={{marginLeft:8,fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20,background:COLORS.green.bg,color:COLORS.green.dark,border:`0.5px solid ${COLORS.green.border}`}}>Primary</span>}</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {!m.primary && <Btn sm primary onClick={()=>setPrimary(m.id)}>Set primary</Btn>}
            <Btn sm>Edit</Btn>
            {!m.primary && <Btn sm onClick={()=>removeMethod(m.id)}>Remove</Btn>}
          </div>
        </div>
      ))}
      <div style={{marginBottom:18}}>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add payment method</Btn>
      </div>
      {showAdd && (
        <Card title="Add payment method">
          <div style={s.formGrid}>
            <div style={{...s.formGroup,gridColumn:'1/-1'}}>
              <label style={s.formLabel}>Method type</label>
              <select style={s.formInput} value={nmType} onChange={e=>setNmType(e.target.value)}>
                <option value="">Select type...</option>
                <option value="paypal">PayPal</option>
                <option value="ach">Bank transfer (ACH)</option>
                <option value="wire">International wire</option>
              </select>
            </div>
            {nmType==='paypal' && <div style={{...s.formGroup,gridColumn:'1/-1'}}><label style={s.formLabel}>PayPal email address</label><input style={s.formInput} type="email" placeholder="payments@yourcompany.com"/></div>}
            {nmType==='ach' && <>
              <div style={s.formGroup}><label style={s.formLabel}>Account holder name</label><input style={s.formInput} type="text"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>Routing number</label><input style={s.formInput} type="text" placeholder="9 digits"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>Account number</label><input style={s.formInput} type="text"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>Account type</label><select style={s.formInput}><option>Checking</option><option>Savings</option></select></div>
            </>}
            {nmType==='wire' && <>
              <div style={s.formGroup}><label style={s.formLabel}>Bank name</label><input style={s.formInput} type="text"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>SWIFT / BIC</label><input style={s.formInput} type="text"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>IBAN / Account number</label><input style={s.formInput} type="text"/></div>
              <div style={s.formGroup}><label style={s.formLabel}>Currency</label><select style={s.formInput}><option>USD</option><option>EUR</option><option>GBP</option><option>TWD</option></select></div>
            </>}
          </div>
          <div style={s.formFooter}><Btn onClick={()=>setShowAdd(false)}>Cancel</Btn><Btn primary onClick={addMethod}>Save method</Btn></div>
        </Card>
      )}
      <div style={s.sectionDivider}>Payout history</div>
      <Card>
        <div style={{display:'flex',alignItems:'center',padding:'9px 18px',background:'#f8f7f4',borderBottom:'0.5px solid #e0ddd5',fontSize:10,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',color:'#888',gap:12}}>
          <span style={{width:100,flexShrink:0}}>Date</span><span style={{flex:1}}>Description</span><span style={{width:80,textAlign:'right'}}>Amount</span><span style={{width:90,textAlign:'right'}}>Status</span>
        </div>
        {payHistory.map((p,i) => (
          <div key={i} style={{...s.payHistRow,borderBottom:i===payHistory.length-1?'none':undefined}}>
            <span style={{width:100,flexShrink:0,fontSize:12,color:'#888'}}>{p.date}</span>
            <span style={{flex:1}}>{p.desc}</span>
            <span style={{width:80,textAlign:'right',fontWeight:600}}>{p.amount}</span>
            <span style={{width:90,textAlign:'right'}}><Badge type={p.status}/></span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Resources({ goTo }) {
  const cards = [
    { prod:'lynx', title:'Enterprise PDF viewer', desc:'Competes with Adobe Acrobat. Self-hosted, perpetual license.', points:['Free admin console on all accounts. Adobe charges separately. Lead with this.','Self-hosted deployment — ideal for regulated industries.','30–50% lower TCO vs. Adobe at enterprise scale.','Perpetual model — no annual renewal risk for IT buyers.'], btns:['Battle card','Pricing'] },
    { prod:'ds', title:'e-Signature for teams', desc:'Competes with DocuSign. 10+ seat enterprise focus.', points:['Up to 60% lower cost per seat vs. DocuSign Business Pro.','Flexible signing task and template provisions.','Strong fit for real estate, HR, legal, and healthcare.','Enterprise admin console with centralized management.'], btns:['Battle card','Demo deck'] },
    { prod:'api', title:'Embedded e-signature API', desc:'For SaaS vendors embedding signing into their platform.', points:['White-label capable — partners can brand the experience.','RESTful API with webhook support.','Best fit: PropTech, LegalTech, HRTech, FinTech.','API provisioning handled by KDAN (3–5 days post-close).'], btns:['API docs','Use cases'] },
  ];
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Product resources</div><div style={s.pageSub}>Selling points and competitive positioning per product</div></div>
      <div style={s.resGrid}>
        {cards.map(c => (
          <div key={c.prod} style={s.resCard}>
            <div style={{padding:'15px 18px 12px',borderBottom:'0.5px solid #e0ddd5'}}>
              <ProdTag prod={c.prod}/>
              <div style={{fontSize:14,fontWeight:600,marginTop:5}}>{c.title}</div>
              <div style={{fontSize:12,color:'#888',marginTop:3,lineHeight:1.5}}>{c.desc}</div>
            </div>
            <div style={{padding:'13px 18px',flex:1}}>
              {c.points.map((p,i) => <div key={i} style={s.spRow}><span style={{color:COLORS.green.accent,flexShrink:0}}>✓</span><span>{p}</span></div>)}
            </div>
            <div style={{padding:'11px 18px',borderTop:'0.5px solid #e0ddd5',display:'flex',gap:7,flexWrap:'wrap'}}>
              {c.btns.map(b => <Btn key={b} sm>{b}</Btn>)}
              <Btn sm onClick={() => goTo('materials')}>All materials</Btn>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:14}}>
        <div style={s.resCard}>
          <div style={{padding:'15px 18px 12px',borderBottom:'0.5px solid #e0ddd5',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div><ProdTag prod="cpdf"/><div style={{fontSize:14,fontWeight:600,marginTop:5}}>PDF SDK for developers</div><div style={{fontSize:12,color:'#888',marginTop:3}}>Cross-platform. Competes with PDFTron/Apryse.</div></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:11,color:'#888'}}>Avg. deal size</div><div style={{fontSize:15,fontWeight:600}}>$4,000</div></div>
          </div>
          <div style={{padding:'13px 18px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 20px'}}>
            {['Comparable feature set to PDFTron at 40–60% lower cost.','Single SDK across all major platforms.','Full annotation, form fill, and digital signature support.','Best fit: SaaS companies embedding PDF, enterprise dev teams.'].map((p,i) => (
              <div key={i} style={s.spRow}><span style={{color:COLORS.green.accent,flexShrink:0}}>✓</span><span>{p}</span></div>
            ))}
          </div>
          <div style={{padding:'11px 18px',borderTop:'0.5px solid #e0ddd5',display:'flex',gap:7}}>
            <Btn sm>Technical overview</Btn><Btn sm>Sample code</Btn><Btn sm>Competitive brief</Btn><Btn sm onClick={() => goTo('materials')}>All materials</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Materials() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? materials : materials.filter(m => m.prod === filter || (filter==='ds' && m.prod==='api'));
  const prodBg = { lynx:COLORS.blue.bg, ds:COLORS.purple.bg, api:COLORS.amber.bg, cpdf:COLORS.green.bg };
  return (
    <div>
      <div style={s.pageHeader}><div style={s.pageTitle}>Marketing library</div><div style={s.pageSub}>Sales and marketing materials from KDAN's product teams. Download and use in your pipeline.</div></div>
      <div style={s.tabs}>
        {['all','lynx','ds','cpdf'].map(f => {
          const labels = { all:'All materials', lynx:'LynxPDF', ds:'DottedSign', cpdf:'ComPDFKit' };
          const counts = { all: materials.length, lynx: materials.filter(m=>m.prod==='lynx').length, ds: materials.filter(m=>m.prod==='ds'||m.prod==='api').length, cpdf: materials.filter(m=>m.prod==='cpdf').length };
          return <div key={f} style={s.tab(filter===f)} onClick={() => setFilter(f)}>{labels[f]} ({counts[f]})</div>;
        })}
      </div>
      <Card>
        {filtered.map((m,i) => (
          <div key={i} style={{...s.matRow,borderBottom:i===filtered.length-1?'none':undefined}}>
            <div style={s.matIcon(prodBg[m.prod] || '#f0ede6')}>{m.icon}</div>
            <div style={{flex:1}}>
              <strong>{m.name}</strong>
              <div style={{fontSize:11,color:'#888',marginTop:2}}>{m.desc}</div>
            </div>
            <ProdTag prod={m.prod}/>
            <span style={{fontSize:11,color:'#888',width:80,textAlign:'right'}}>{m.type}</span>
            <Btn sm>Download</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── LOGO SVG ─────────────────────────────────────────────────────────────────

// Official KDAN logo from KDAN's public CDN
const KDAN_LOGO_URL = 'https://www.kdan.com/images/company/img-kdan-logo.svg';

function KdanLogoMark({ size = 32 }) {
  return (
    <img
      src={KDAN_LOGO_URL}
      alt="KDAN"
      style={{ height: size, width: 'auto', display: 'block' }}
    />
  );
}

// ── ONBOARDING FIELD HELPERS (defined outside Onboarding to prevent remount) ─

function OFG({ label, full, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5, ...(full ? { gridColumn:'1/-1' } : {}) }}>
      <label style={{ fontSize:12, fontWeight:600, color:'#888' }}>{label}</label>
      {children}
    </div>
  );
}
const ofi = { height:34, padding:'0 11px', borderRadius:8, border:'0.5px solid #ccc', background:'#fff', color:'#1a1a1a', fontSize:13, fontFamily:'inherit', outline:'none', width:'100%' };
function OFI(props) { return <input style={ofi} {...props} />; }
function OFS({ children, ...props }) { return <select style={ofi} {...props}>{children}</select>; }

// ── ONBOARDING ─────────────────────────────────────────────────────────────

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    company: '', firstName: '', lastName: '', email: '', phone: '', website: '',
    vertical: '', region: '', partnerType: '',
    payMethod: '', payEmail: '', payBank: '', payRouting: '', payAccount: '',
    agreed: false,
  });
  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const steps = [
    { num: 1, label: 'Company info' },
    { num: 2, label: 'Partner profile' },
    { num: 3, label: 'Payout setup' },
    { num: 4, label: 'Agreement' },
  ];

  const canAdvance = () => {
    if (step === 1) return form.company && form.firstName && form.lastName && form.email;
    if (step === 2) return form.vertical && form.region && form.partnerType;
    if (step === 3) return form.payMethod && (form.payMethod === 'paypal' ? form.payEmail : form.payBank);
    if (step === 4) return form.agreed;
    return true;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', display: 'flex', flexDirection: 'column' }}>
      {/* Minimal topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0ddd5', padding: '0 32px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <KdanLogoMark size={36} />
          <div style={{ width: 1, height: 16, background: '#e0ddd5' }} />
          <span style={{ fontSize: 12, color: '#888' }}>Partner Portal</span>
        </div>
        <span style={{ fontSize: 12, color: '#888' }}>New partner setup</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 600 }}>

          {/* Step 1 intro card (shown only on step 1) */}
          {step === 1 && (
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <KdanLogoMark size={48} />
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginTop: 16 }}>Welcome to KDAN Partner Portal</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8, lineHeight: 1.6 }}>
                Let's get your partner account set up. It takes about 3 minutes.<br/>
                You'll be able to track leads, register deals, and receive commission payouts.
              </div>
            </div>
          )}

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            {steps.map((st, i) => (
              <div key={st.num} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    background: step === st.num ? '#1D9E75' : step > st.num ? '#E1F5EE' : '#f0ede6',
                    color: step === st.num ? '#fff' : step > st.num ? '#0F6E56' : '#aaa',
                    border: step > st.num ? '1.5px solid #9FE1CB' : 'none',
                  }}>
                    {step > st.num ? '✓' : st.num}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: step === st.num ? 600 : 400, color: step === st.num ? '#1a1a1a' : '#aaa', whiteSpace: 'nowrap' }}>{st.label}</span>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: step > st.num ? '#9FE1CB' : '#e0ddd5', margin: '0 10px' }} />}
              </div>
            ))}
          </div>

          {/* Step cards */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardTitle}>
                {step === 1 && 'Company information'}
                {step === 2 && 'Partner profile'}
                {step === 3 && 'Payout setup'}
                {step === 4 && 'Review & agree'}
              </span>
              <span style={{ fontSize: 12, color: '#aaa' }}>Step {step} of 4</span>
            </div>

            {step === 1 && (
              <div style={s.formGrid}>
                <OFG label="Company name" full><OFI type="text" placeholder="BoxCollider Inc." value={form.company} onChange={e => setField('company', e.target.value)} /></OFG>
                <OFG label="First name"><OFI type="text" placeholder="Jane" value={form.firstName} onChange={e => setField('firstName', e.target.value)} /></OFG>
                <OFG label="Last name"><OFI type="text" placeholder="Smith" value={form.lastName} onChange={e => setField('lastName', e.target.value)} /></OFG>
                <OFG label="Work email" full><OFI type="email" placeholder="jane@yourcompany.com" value={form.email} onChange={e => setField('email', e.target.value)} /></OFG>
                <OFG label="Phone (optional)"><OFI type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setField('phone', e.target.value)} /></OFG>
                <OFG label="Company website (optional)"><OFI type="url" placeholder="https://yourcompany.com" value={form.website} onChange={e => setField('website', e.target.value)} /></OFG>
              </div>
            )}

            {step === 2 && (
              <div style={s.formGrid}>
                <OFG label="Partner type" full>
                  <OFS value={form.partnerType} onChange={e => setField('partnerType', e.target.value)}>
                    <option value="">Select type...</option>
                    <option value="var">Value-added reseller (VAR)</option>
                    <option value="msp">Managed service provider (MSP)</option>
                    <option value="si">Systems integrator (SI)</option>
                    <option value="isv">ISV / SaaS platform</option>
                    <option value="dist">Distributor</option>
                    <option value="ref">Referral partner</option>
                  </OFS>
                </OFG>
                <OFG label="Primary vertical">
                  <OFS value={form.vertical} onChange={e => setField('vertical', e.target.value)}>
                    <option value="">Select vertical...</option>
                    <option>Legal</option>
                    <option>Healthcare</option>
                    <option>Finance &amp; insurance</option>
                    <option>Real estate</option>
                    <option>Technology / SaaS</option>
                    <option>Government</option>
                    <option>Education</option>
                    <option>Other</option>
                  </OFS>
                </OFG>
                <OFG label="Primary region">
                  <OFS value={form.region} onChange={e => setField('region', e.target.value)}>
                    <option value="">Select region...</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Latin America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                    <option>Other</option>
                  </OFS>
                </OFG>
                <div style={{ gridColumn: '1/-1', background: '#f8f7f4', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Which products do you plan to sell?</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {['LynxPDF', 'DottedSign Business', 'DottedSign API', 'ComPDFKit'].map(p => (
                      <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: '#1D9E75' }} /> {p}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
                  Commissions are paid monthly on the 15th for deals closed in the prior month. Minimum payout is $100 USD.
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  {[{ val: 'paypal', label: '💳 PayPal', desc: 'Any PayPal email' }, { val: 'ach', label: '🏦 Bank (ACH)', desc: 'US bank accounts' }, { val: 'wire', label: '🌐 Wire transfer', desc: 'International' }].map(m => (
                    <div key={m.val} onClick={() => setField('payMethod', m.val)} style={{ flex: 1, border: form.payMethod === m.val ? '1.5px solid #1D9E75' : '0.5px solid #e0ddd5', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', background: form.payMethod === m.val ? '#E1F5EE' : '#fff', transition: 'all 0.1s' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: form.payMethod === m.val ? '#085041' : '#1a1a1a' }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{m.desc}</div>
                    </div>
                  ))}
                </div>
                {form.payMethod === 'paypal' && (
                  <OFG label="PayPal email address"><OFI type="email" placeholder="payments@yourcompany.com" value={form.payEmail} onChange={e => setField('payEmail', e.target.value)} /></OFG>
                )}
                {form.payMethod === 'ach' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <OFG label="Account holder name" full><OFI type="text" value={form.payBank} onChange={e => setField('payBank', e.target.value)} /></OFG>
                    <OFG label="Routing number"><OFI type="text" placeholder="9 digits" value={form.payRouting} onChange={e => setField('payRouting', e.target.value)} /></OFG>
                    <OFG label="Account number"><OFI type="text" value={form.payAccount} onChange={e => setField('payAccount', e.target.value)} /></OFG>
                  </div>
                )}
                {form.payMethod === 'wire' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <OFG label="Bank name" full><OFI type="text" value={form.payBank} onChange={e => setField('payBank', e.target.value)} /></OFG>
                    <OFG label="SWIFT / BIC"><OFI type="text" /></OFG>
                    <OFG label="IBAN / Account number"><OFI type="text" /></OFG>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div style={{ padding: 18 }}>
                <div style={{ background: '#f8f7f4', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account summary</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 13 }}>
                    {[
                      ['Company', form.company || '—'],
                      ['Contact', `${form.firstName} ${form.lastName}`.trim() || '—'],
                      ['Email', form.email || '—'],
                      ['Partner type', form.partnerType || '—'],
                      ['Vertical', form.vertical || '—'],
                      ['Region', form.region || '—'],
                      ['Payout method', form.payMethod === 'paypal' ? 'PayPal' : form.payMethod === 'ach' ? 'Bank (ACH)' : form.payMethod === 'wire' ? 'Wire transfer' : '—'],
                    ].map(([label, val]) => (
                      <div key={label}><span style={{ color: '#888' }}>{label}:</span> <strong>{val}</strong></div>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#fff', border: '0.5px solid #e0ddd5', borderRadius: 10, padding: '14px 16px', marginBottom: 20, fontSize: 12, color: '#666', lineHeight: 1.8, maxHeight: 140, overflowY: 'auto' }}>
                  <strong style={{ color: '#1a1a1a' }}>KDAN Partner Agreement (Summary)</strong><br/>
                  By joining the KDAN Partner Program, you agree to: represent KDAN products accurately and ethically; maintain confidentiality of pricing, roadmap, and customer data shared by KDAN; register deals through this portal before customer engagement to qualify for commission; comply with applicable export laws and regional regulations; and not engage in practices that conflict with KDAN's direct sales efforts. Commission rates are determined by partner tier and are subject to change with 30 days notice. Full terms available on request.
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                  <input type="checkbox" checked={form.agreed} onChange={e => setField('agreed', e.target.checked)} style={{ marginTop: 2, accentColor: '#1D9E75', flexShrink: 0 }} />
                  <span>I have read and agree to the KDAN Partner Program terms and conditions.</span>
                </label>
              </div>
            )}

            <div style={{ ...s.formFooter, justifyContent: 'space-between' }}>
              <div>
                {step > 1 && <Btn onClick={() => setStep(prev => prev - 1)}>← Back</Btn>}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {!canAdvance() && <span style={{ fontSize: 11, color: '#aaa' }}>Complete required fields to continue</span>}
                {step < 4
                  ? <Btn primary onClick={() => { if (canAdvance()) setStep(prev => prev + 1); }} style={{ opacity: canAdvance() ? 1 : 0.5 }}>Continue →</Btn>
                  : <Btn primary onClick={() => { if (canAdvance()) onComplete(form); }} style={{ opacity: canAdvance() ? 1 : 0.5 }}>Complete setup →</Btn>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState({ company: 'BoxCollider Inc.', initials: 'BC' });
  const [page, setPage] = useState('dashboard');
  const [leads, setLeads] = useState(initialLeads);
  const [deals, setDeals] = useState(initialDeals);

  const handleOnboardingComplete = (form) => {
    const initials = ((form.firstName[0] || '') + (form.lastName[0] || '')).toUpperCase() || 'P';
    setPartnerInfo({ company: form.company || 'Your Company', initials });
    setOnboarded(true);
  };

  if (!onboarded) return <Onboarding onComplete={handleOnboardingComplete} />;

  const nav = (p) => setPage(p);
  const newLeads = leads.filter(l => l.status === 'new').length;

  const navGroups = [
    { label:'Overview', items:[{ label:'Dashboard', page:'dashboard', color:'#1D9E75' }] },
    { label:'Pipeline', items:[
      { label:'Leads from KDAN', page:'leads', color:'#378ADD', count: newLeads },
      { label:'Register a deal', page:'register', color:'#7F77DD' },
      { label:'My deals', page:'mydeals', color:'#534AB7', count: deals.length },
    ]},
    { label:'Earnings', items:[
      { label:'Commission tracker', page:'commissions', color:'#639922' },
      { label:'Payouts & settings', page:'payouts', color:'#3B6D11' },
    ]},
    { label:'Resources', items:[
      { label:'Product resources', page:'resources', color:'#BA7517' },
      { label:'Marketing library', page:'materials', color:'#993C1D' },
    ]},
  ];

  const pages = {
    dashboard: <Dashboard leads={leads} deals={deals} goTo={nav}/>,
    leads: <Leads leads={leads} setLeads={setLeads}/>,
    register: <RegisterDeal deals={deals} setDeals={setDeals}/>,
    mydeals: <MyDeals deals={deals}/>,
    commissions: <Commissions/>,
    payouts: <Payouts/>,
    resources: <Resources goTo={nav}/>,
    materials: <Materials/>,
  };

  return (
    <div style={s.portal}>
      <div style={s.topbar}>
        <div style={s.topLeft}>
          <KdanLogoMark size={36} />
          <div style={s.divider}/>
          <span style={s.portalLabel}>Partner Portal</span>
        </div>
        <div style={s.topRight}>
          <span style={s.tierBadge}>Silver Partner</span>
          <span style={s.partnerName}>{partnerInfo.company}</span>
          <div style={s.avatar}>{partnerInfo.initials}</div>
        </div>
      </div>
      <div style={s.layout}>
        <div style={s.sidebar}>
          {navGroups.map(g => (
            <div key={g.label} style={s.navGroup}>
              <span style={s.navGroupLabel}>{g.label}</span>
              {g.items.map(item => (
                <NavItem key={item.page} {...item} active={page===item.page} onClick={nav}/>
              ))}
            </div>
          ))}
        </div>
        <div style={s.main}>
          {pages[page]}
        </div>
      </div>
    </div>
  );
}
