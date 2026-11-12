document.addEventListener('DOMContentLoaded', () => {
  const { icon, storage, escapeHtml, formatDate, formatMoney } = window.CrudApp;
  document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
  const data = { studies: storage.get('estudos'), courses: storage.get('cursos'), payments: storage.get('pagamentos'), users: storage.get('usuarios') };
  const paymentTotal = data.payments.reduce((sum, item) => sum + (Number(String(item.valor || '').replace(',', '.')) || 0), 0);
  document.querySelector('#studiesTotal').textContent = data.studies.length;
  document.querySelector('#coursesTotal').textContent = data.courses.length;
  document.querySelector('#paymentsTotal').textContent = formatMoney(paymentTotal);
  document.querySelector('#usersTotal').textContent = data.users.length;
  if (data.studies.length) document.querySelector('#studiesMeta').textContent = `${data.studies.length} registro${data.studies.length > 1 ? 's' : ''} no total`;
  if (data.courses.length) document.querySelector('#coursesMeta').textContent = `${data.courses.length} registro${data.courses.length > 1 ? 's' : ''} no total`;
  if (data.payments.length) document.querySelector('#paymentsMeta').textContent = `${data.payments.length} pagamento${data.payments.length > 1 ? 's' : ''}`;
  if (data.users.length) document.querySelector('#usersMeta').textContent = `${data.users.length} usuário${data.users.length > 1 ? 's' : ''} no total`;
  renderDistribution(); renderRecentUsers(); renderStudyChart();

  document.querySelector('#globalSearch').addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const term = event.currentTarget.value.trim(); if (!term) return;
    const targets = [['../Usuarios/index.html', data.users], ['../Cursos/index.html', data.courses], ['../Estudantes/index.html', data.studies], ['../Pagamentos/index.html', data.payments]];
    const target = targets.find(([, records]) => records.some(record => Object.values(record).some(value => String(value).toLowerCase().includes(term.toLowerCase()))));
    window.location.href = `${target?.[0] || '../Usuarios/index.html'}?search=${encodeURIComponent(term)}`;
  });
  function renderDistribution() {
    const values = [data.studies.length, data.courses.length, data.payments.length, data.users.length], labels = ['Estudos', 'Cursos', 'Pagamentos', 'Usuários'], colors = ['#ffc107', '#ffd95c', '#ffe9a2', '#e4e5e8'], total = values.reduce((a,b) => a+b, 0);
    document.querySelector('#distributionTotal').textContent = total; let current = 0;
    const stops = values.map((value, i) => { const start = current; current += total ? value / total * 360 : 0; return `${colors[i]} ${start}deg ${current}deg`; });
    document.querySelector('.donut').style.background = total ? `conic-gradient(${stops.join(',')})` : '#eff0f2';
    document.querySelector('#distributionLegend').innerHTML = labels.map((label, i) => `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span><span>${label}: ${values[i]}${total ? ` (${Math.round(values[i]/total*100)}%)` : ''}</span></div>`).join('');
  }
  function renderRecentUsers() {
    const root = document.querySelector('#recentUsers'), recent = [...data.users].sort((a,b) => new Date(b.createdAt || 0)-new Date(a.createdAt || 0)).slice(0,5);
    if (!recent.length) { root.innerHTML = `<div class="empty-state">${icon('inbox')}<div><strong>Nenhum usuário cadastrado</strong><span>Os usuários recentes aparecerão aqui.</span></div></div>`; return; }
    root.innerHTML = `<table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Cadastro</th></tr></thead><tbody>${recent.map(user => `<tr><td class="cell-main">${escapeHtml(user.nome)}</td><td>${escapeHtml(user.email)}</td><td><span class="badge ${user.perfil === 'Administrador' ? 'badge-yellow' : ''}">${escapeHtml(user.perfil)}</span></td><td>${formatDate((user.createdAt || '').slice(0,10))}</td></tr>`).join('')}</tbody></table>`;
  }
  function renderStudyChart() {
    const canvas = document.querySelector('#studiesChart'), empty = document.querySelector('#chartEmpty');
    if (!data.studies.length) { canvas.hidden = true; empty.hidden = false; return; }
    const grouped = new Map(); data.studies.forEach(study => { const raw = study.data || (study.createdAt || '').slice(0,10), date = raw ? new Date(`${raw}T12:00:00`) : new Date(), key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`; grouped.set(key,(grouped.get(key)||0)+1); });
    const entries = [...grouped.entries()].sort(([a],[b]) => a.localeCompare(b)).slice(-6), ctx = canvas.getContext('2d'), tooltip = document.querySelector('#chartTooltip'); let chartPoints = [];
    const draw = () => { const dpr = devicePixelRatio || 1, width = canvas.clientWidth, height = canvas.clientHeight; canvas.width=width*dpr; canvas.height=height*dpr; ctx.scale(dpr,dpr); const styles=getComputedStyle(document.documentElement), accent=styles.getPropertyValue('--yellow').trim()||'#ffc107', muted=styles.getPropertyValue('--muted').trim()||'#707381', line=styles.getPropertyValue('--line').trim()||'#e7e8ec', surface=styles.getPropertyValue('--surface').trim()||'#fff', pad={l:35,r:18,t:20,b:35}, chartW=width-pad.l-pad.r, chartH=height-pad.t-pad.b, max=Math.max(...entries.map(([,v])=>v),1); ctx.font='11px Inter'; ctx.strokeStyle=line; ctx.lineWidth=1;
      for(let i=0;i<=4;i++){const y=pad.t+chartH*i/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(width-pad.r,y);ctx.stroke();ctx.fillStyle=muted;ctx.fillText(String(Math.round(max*(4-i)/4)),4,y+4)}
      const points=entries.map(([key,value],i)=>({x:pad.l+(entries.length===1?chartW/2:chartW*i/(entries.length-1)),y:pad.t+chartH-value/max*chartH,key,value})); chartPoints=points; const gradient=ctx.createLinearGradient(0,pad.t,0,height-pad.b);gradient.addColorStop(0,`${accent}47`);gradient.addColorStop(1,`${accent}00`);ctx.beginPath();ctx.moveTo(points[0].x,height-pad.b);points.forEach(p=>ctx.lineTo(p.x,p.y));ctx.lineTo(points.at(-1).x,height-pad.b);ctx.closePath();ctx.fillStyle=gradient;ctx.fill();ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle=accent;ctx.lineWidth=3;ctx.stroke();points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fillStyle=surface;ctx.fill();ctx.strokeStyle=accent;ctx.stroke();const [year,month]=p.key.split('-');ctx.fillStyle=muted;ctx.textAlign='center';ctx.fillText(new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(new Date(year,month-1)).replace('.',''),p.x,height-10)});
    }; draw(); addEventListener('resize',draw,{passive:true});
    canvas.addEventListener('mousemove', event => { const rect=canvas.getBoundingClientRect(), x=event.clientX-rect.left, nearest=chartPoints.reduce((best,point)=>Math.abs(point.x-x)<Math.abs(best.x-x)?point:best,chartPoints[0]); if(!nearest||Math.abs(nearest.x-x)>35){tooltip.hidden=true;return;} const [year,month]=nearest.key.split('-'); tooltip.textContent=`${new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric'}).format(new Date(year,month-1))}: ${nearest.value}`; tooltip.style.left=`${nearest.x}px`; tooltip.style.top=`${nearest.y}px`; tooltip.hidden=false; });
    canvas.addEventListener('mouseleave',()=>{tooltip.hidden=true;});
  }
});
