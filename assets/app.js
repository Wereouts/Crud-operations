(function () {
  'use strict';

  const icons = {
    logo: '<path d="M7 7h4v10H7zM13 4h4v16h-4z"/><path d="M3 12 12 3l9 9-9 9z"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    studies: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    courses: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    payments: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M16 15h2"/>',
    reports: '<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.07 14H3v-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.02A1.7 1.7 0 0 0 10 3.07V3h4v.09A1.7 1.7 0 0 0 15 4.65a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.02A1.7 1.7 0 0 0 20.93 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    chart: '<path d="M3 3v18h18M7 16v-5M12 16V7M17 16v-8"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>',
    inbox: '<path d="M4 4h16l2 10v6H2v-6z"/><path d="M2 14h5l2 3h6l2-3h5"/>'
    ,profile: '<path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>'
    ,palette: '<circle cx="13.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".7" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".7" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".7" fill="currentColor" stroke="none"/><path d="M12 2a10 10 0 0 0 0 20h1.7a2.3 2.3 0 0 0 1.7-3.9 2.3 2.3 0 0 1 1.7-3.9h1A3.9 3.9 0 0 0 22 10.3 8.3 8.3 0 0 0 12 2z"/>'
    ,shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="m9 12 2 2 4-4"/>'
    ,bell: '<path d="M10.3 21h3.4"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>'
    ,database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'
    ,download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'
    ,type: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>'
    ,sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.42"/>'
    ,moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'
    ,table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>'
    ,check: '<path d="m5 12 4 4L19 6"/>'
    ,image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>'
  };

  function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
  }

  const pages = [
    ['dashboard', 'Dashboard', '../Home/index.html', 'dashboard'],
    ['usuarios', 'Usuários', '../Usuarios/index.html', 'users'],
    ['estudos', 'Estudos', '../Estudantes/index.html', 'studies'],
    ['cursos', 'Cursos', '../Cursos/index.html', 'courses'],
    ['pagamentos', 'Pagamentos', '../Pagamentos/index.html', 'payments'],
    ['relatorios', 'Relatórios', '../Home/index.html#relatorios', 'reports'],
    ['configuracoes', 'Configurações', '../Configuracoes/index.html#aparencia', 'settings']
  ];

  const defaultPreferences = { theme: 'light', accent: '#ffc107', compact: false, fontSize: 'medium', tableRows: 10, notifications: { general: true, users: true, payments: true, system: true } };

  function getPreferences() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('crudops:preferences')) || {}; } catch { saved = {}; }
    return { ...defaultPreferences, ...saved, notifications: { ...defaultPreferences.notifications, ...(saved.notifications || {}) } };
  }

  function applyPreferences(preferences = getPreferences()) {
    const root = document.documentElement;
    root.dataset.theme = preferences.theme;
    root.dataset.fontSize = preferences.fontSize;
    root.style.setProperty('--yellow', preferences.accent);
    root.style.setProperty('--yellow-strong', preferences.accent);
    document.body?.classList.toggle('compact-sidebar', Boolean(preferences.compact));
  }

  function mountShell() {
    const current = document.body.dataset.page || '';
    const sidebar = document.querySelector('[data-sidebar]');
    if (!sidebar) return;
    const profileData = storage.getObject('profile', { name: 'Guilherme', email: 'guc193577@gmail.com', role: 'Administrador', photo: '../Home/imagens/eu.jpg' });
    sidebar.innerHTML = `
      <div class="brand"><span class="brand-mark">${icon('logo')}</span><span>CRUD Operations</span></div>
      <div class="profile">
        <img src="${escapeHtml(profileData.photo || '../Home/imagens/eu.jpg')}" alt="Foto de ${escapeHtml(profileData.name)}">
        <div><strong>${escapeHtml(profileData.name)}</strong><span>${escapeHtml(profileData.role)}</span></div>
      </div>
      <nav class="nav" aria-label="Navegação principal">
        ${pages.map(([id, label, href, iconName]) => `<a class="nav-link ${current === id ? 'active' : ''}" href="${href}">${icon(iconName)}<span>${label}</span></a>`).join('')}
      </nav>
      <a class="logout" href="../Login/index.html">${icon('logout')}<span>Sair</span></a>`;

    const menu = document.querySelector('[data-menu-toggle]');
    const overlay = document.querySelector('[data-sidebar-overlay]');
    const closeSidebar = () => document.body.classList.remove('sidebar-open');
    menu?.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
    overlay?.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeSidebar));
  }

  const storage = {
    get(key) {
      try { return JSON.parse(localStorage.getItem(`crudops:${key}`)) || []; }
      catch { return []; }
    },
    set(key, value) { localStorage.setItem(`crudops:${key}`, JSON.stringify(value)); },
    getObject(key, fallback = {}) {
      try { return { ...fallback, ...(JSON.parse(localStorage.getItem(`crudops:${key}`)) || {}) }; }
      catch { return { ...fallback }; }
    }
  };

  function toast(message, type = 'success') {
    let region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    const item = document.createElement('div');
    item.className = `toast ${type === 'error' ? 'error' : ''}`;
    item.textContent = message;
    region.appendChild(item);
    setTimeout(() => item.remove(), 3200);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  }

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('pt-BR').format(date);
  }

  function formatMoney(value) {
    const number = Number(String(value ?? '').replace(',', '.'));
    return Number.isFinite(number) ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number) : 'R$ 0,00';
  }

  class CrudPage {
    constructor(config) {
      this.config = config;
      this.records = storage.get(config.key);
      this.filtered = [...this.records];
      this.editingId = null;
      this.page = 1;
      this.perPage = Number(getPreferences().tableRows) || 10;
      this.bind();
      this.render();
    }

    bind() {
      this.dialog = document.querySelector('#recordDialog');
      this.form = document.querySelector('#recordForm');
      document.querySelector('[data-add]')?.addEventListener('click', () => this.open());
      document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => this.dialog.close()));
      document.querySelector('[data-search]')?.addEventListener('input', event => {
        const term = event.target.value.trim().toLocaleLowerCase('pt-BR');
        this.filtered = this.records.filter(record => Object.values(record).some(value => String(value).toLocaleLowerCase('pt-BR').includes(term)));
        this.page = 1;
        this.render();
      });
      this.form?.addEventListener('submit', event => this.save(event));
      this.dialog?.addEventListener('click', event => { if (event.target === this.dialog) this.dialog.close(); });
    }

    open(record = null, readonly = false) {
      this.editingId = record?.id || null;
      this.form.reset();
      this.form.querySelectorAll('[name]').forEach(input => {
        input.disabled = readonly;
        input.value = record?.[input.name] ?? '';
      });
      document.querySelector('[data-modal-title]').textContent = readonly ? 'Detalhes do registro' : record ? 'Editar registro' : this.config.newLabel;
      document.querySelector('[data-submit]').hidden = readonly;
      this.dialog.showModal();
    }

    save(event) {
      event.preventDefault();
      if (!this.form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(this.form).entries());
      if (this.editingId) {
        this.records = this.records.map(record => record.id === this.editingId ? { ...record, ...data, updatedAt: new Date().toISOString() } : record);
      } else {
        this.records.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`, ...data, createdAt: new Date().toISOString() });
      }
      storage.set(this.config.key, this.records);
      this.filtered = [...this.records];
      this.dialog.close();
      this.render();
      toast(this.editingId ? 'Registro atualizado com sucesso.' : 'Registro adicionado com sucesso.');
    }

    remove(record) {
      if (!window.confirm(`Excluir ${record[this.config.primaryField] || 'este registro'}? Esta ação não pode ser desfeita.`)) return;
      this.records = this.records.filter(item => item.id !== record.id);
      storage.set(this.config.key, this.records);
      this.filtered = this.filtered.filter(item => item.id !== record.id);
      this.render();
      toast('Registro excluído com sucesso.');
    }

    render() {
      const tbody = document.querySelector('[data-table-body]');
      const empty = document.querySelector('[data-empty]');
      const table = document.querySelector('[data-table]');
      const count = document.querySelector('[data-count]');
      const pagesTotal = Math.max(1, Math.ceil(this.filtered.length / this.perPage));
      this.page = Math.min(this.page, pagesTotal);
      const visible = this.filtered.slice((this.page - 1) * this.perPage, this.page * this.perPage);
      count.textContent = `${this.filtered.length} ${this.filtered.length === 1 ? 'registro' : 'registros'}`;
      table.hidden = !visible.length;
      empty.hidden = !!visible.length;
      tbody.innerHTML = visible.map(record => `<tr>${this.config.columns.map(column => `<td>${this.cell(record, column)}</td>`).join('')}<td><div class="actions"><button class="icon-btn" data-view="${record.id}" aria-label="Visualizar">${icon('eye')}</button><button class="icon-btn" data-edit="${record.id}" aria-label="Editar">${icon('edit')}</button><button class="icon-btn danger" data-delete="${record.id}" aria-label="Excluir">${icon('trash')}</button></div></td></tr>`).join('');
      tbody.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => this.open(this.records.find(record => record.id === button.dataset.view), true)));
      tbody.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => this.open(this.records.find(record => record.id === button.dataset.edit))));
      tbody.querySelectorAll('[data-delete]').forEach(button => button.addEventListener('click', () => this.remove(this.records.find(record => record.id === button.dataset.delete))));
      this.renderPagination(pagesTotal);
    }

    cell(record, column) {
      let value = record[column.key];
      if (column.type === 'date') value = formatDate(value);
      if (column.type === 'money') value = formatMoney(value);
      if (column.type === 'badge') return `<span class="badge ${value === 'Administrador' || value === 'Concluído' || value === 'Pago' ? 'badge-yellow' : ''}">${escapeHtml(value || '—')}</span>`;
      return `<span class="${column.primary ? 'cell-main' : ''}">${escapeHtml(value || '—')}</span>`;
    }

    renderPagination(total) {
      const wrap = document.querySelector('[data-pagination]');
      wrap.innerHTML = Array.from({ length: total }, (_, index) => `<button class="${this.page === index + 1 ? 'active' : ''}" data-page="${index + 1}">${index + 1}</button>`).join('');
      wrap.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { this.page = Number(button.dataset.page); this.render(); }));
    }
  }

  window.CrudApp = { icon, icons, storage, toast, escapeHtml, formatDate, formatMoney, CrudPage, getPreferences, applyPreferences, defaultPreferences };
  applyPreferences();
  document.addEventListener('DOMContentLoaded', () => { applyPreferences(); mountShell(); });
})();
