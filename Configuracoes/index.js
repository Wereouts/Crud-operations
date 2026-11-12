document.addEventListener('DOMContentLoaded', () => {
  const { icon, storage, toast, getPreferences, applyPreferences } = window.CrudApp;
  const defaultProfile = { name: 'Guilherme', email: 'guc193577@gmail.com', role: 'Administrador', photo: '../Home/imagens/eu.jpg' };
  let savedPreferences = getPreferences();
  let draftPreferences = structuredClone(savedPreferences);
  let savedProfile = storage.getObject('profile', defaultProfile);
  let draftProfile = { ...savedProfile };

  document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
  const tabs = [...document.querySelectorAll('[data-section]')];
  const panels = [...document.querySelectorAll('[data-panel]')];

  function openSection(section, updateHash = true) {
    const valid = panels.some(panel => panel.dataset.panel === section) ? section : 'aparencia';
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.section === valid));
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== valid; });
    if (updateHash && location.hash !== `#${valid}`) history.pushState(null, '', `#${valid}`);
  }
  tabs.forEach(tab => tab.addEventListener('click', () => openSection(tab.dataset.section)));
  addEventListener('hashchange', () => openSection(location.hash.slice(1), false));
  openSection(location.hash.slice(1) || 'aparencia', false);

  function fillForm() {
    document.querySelector(`[name="theme"][value="${draftPreferences.theme}"]`).checked = true;
    document.querySelector('#compactMenu').checked = Boolean(draftPreferences.compact);
    document.querySelector('#fontSize').value = draftPreferences.fontSize;
    document.querySelector('#tableRows').value = String(draftPreferences.tableRows);
    document.querySelectorAll('[data-notification]').forEach(input => { input.checked = Boolean(draftPreferences.notifications[input.dataset.notification]); });
    document.querySelectorAll('[data-color]').forEach(button => button.classList.toggle('active', button.dataset.color.toLowerCase() === draftPreferences.accent.toLowerCase()));
    document.querySelector('#profileName').value = draftProfile.name;
    document.querySelector('#profileEmail').value = draftProfile.email;
    document.querySelector('#profileRole').textContent = draftProfile.role;
    document.querySelector('#profilePreview').src = draftProfile.photo || defaultProfile.photo;
    updatePreview();
  }

  function previewPreferences() {
    applyPreferences(draftPreferences);
    updatePreview();
  }

  function updatePreview() {
    const preview = document.querySelector('#dashboardPreview');
    preview.dataset.theme = draftPreferences.theme;
    preview.style.setProperty('--yellow', draftPreferences.accent);
    const counts = [storage.get('estudos').length, storage.get('cursos').length, storage.get('usuarios').length];
    preview.querySelectorAll('.preview-stat strong').forEach((element, index) => { element.textContent = counts[index] || '—'; });
  }

  document.querySelectorAll('[name="theme"]').forEach(input => input.addEventListener('change', event => { draftPreferences.theme = event.target.value; previewPreferences(); }));
  document.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => { draftPreferences.accent = button.dataset.color; fillForm(); previewPreferences(); }));
  document.querySelector('#compactMenu').addEventListener('change', event => { draftPreferences.compact = event.target.checked; previewPreferences(); });
  document.querySelector('#fontSize').addEventListener('change', event => { draftPreferences.fontSize = event.target.value; previewPreferences(); });
  document.querySelector('#tableRows').addEventListener('change', event => { draftPreferences.tableRows = Number(event.target.value); });
  document.querySelectorAll('[data-notification]').forEach(input => input.addEventListener('change', event => { draftPreferences.notifications[event.target.dataset.notification] = event.target.checked; }));
  document.querySelector('#profileName').addEventListener('input', event => { draftProfile.name = event.target.value; });
  document.querySelector('#profileEmail').addEventListener('input', event => { draftProfile.email = event.target.value; });

  document.querySelector('#profilePhoto').addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast('Escolha uma imagem JPG, PNG ou WebP.', 'error'); event.target.value = ''; return; }
    if (file.size > 1_500_000) { toast('A foto deve ter no máximo 1,5 MB.', 'error'); event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => { draftProfile.photo = reader.result; document.querySelector('#profilePreview').src = reader.result; };
    reader.onerror = () => toast('Não foi possível carregar a imagem.', 'error');
    reader.readAsDataURL(file);
  });

  function validateProfile() {
    const name = draftProfile.name.trim(), email = draftProfile.email.trim();
    if (name.length < 2) { openSection('perfil'); document.querySelector('#profileName').focus(); toast('Informe um nome válido.', 'error'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { openSection('perfil'); document.querySelector('#profileEmail').focus(); toast('Informe um e-mail válido.', 'error'); return false; }
    draftProfile.name = name; draftProfile.email = email;
    return true;
  }

  function validatePasswordAttempt() {
    const current = document.querySelector('#currentPassword').value;
    const next = document.querySelector('#newPassword').value;
    const confirmation = document.querySelector('#confirmPassword').value;
    const error = document.querySelector('#passwordError');
    error.textContent = '';
    // Gerenciadores de senha podem preencher somente a senha atual automaticamente.
    // Isso não representa uma solicitação de troca e não deve mudar a aba ativa.
    if (!next && !confirmation) {
      if (current) document.querySelector('#currentPassword').value = '';
      return true;
    }
    openSection('seguranca');
    if (!current || !next || !confirmation) { error.textContent = 'Preencha os três campos de senha.'; return false; }
    if (next.length < 8) { error.textContent = 'A nova senha deve conter pelo menos 8 caracteres.'; return false; }
    if (next !== confirmation) { error.textContent = 'A confirmação não corresponde à nova senha.'; return false; }
    error.textContent = 'A alteração depende de um endpoint seguro no backend e não foi realizada.';
    return false;
  }

  document.querySelector('#saveSettings').addEventListener('click', () => {
    if (!validateProfile() || !validatePasswordAttempt()) return;
    try {
      localStorage.setItem('crudops:preferences', JSON.stringify(draftPreferences));
      storage.set('profile', draftProfile);
      savedPreferences = structuredClone(draftPreferences);
      savedProfile = { ...draftProfile };
      toast('Alterações salvas com sucesso.');
      setTimeout(() => location.reload(), 450);
    } catch {
      toast('Não foi possível salvar. Verifique o espaço disponível no navegador.', 'error');
    }
  });

  document.querySelector('#cancelSettings').addEventListener('click', () => {
    draftPreferences = structuredClone(savedPreferences);
    draftProfile = { ...savedProfile };
    document.querySelector('#profilePhoto').value = '';
    ['currentPassword', 'newPassword', 'confirmPassword'].forEach(id => { document.querySelector(`#${id}`).value = ''; });
    document.querySelector('#passwordError').textContent = '';
    applyPreferences(savedPreferences); fillForm(); toast('Alterações não salvas foram descartadas.');
  });

  document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', () => exportCsv(button.dataset.export)));
  function exportCsv(key) {
    if (key === 'pagamentos' && draftProfile.role !== 'Administrador') { toast('Seu perfil não possui permissão para exportar pagamentos.', 'error'); return; }
    const records = storage.get(key);
    if (!records.length) { toast('Não há registros para exportar.', 'error'); return; }
    const excluded = new Set(['id']);
    const headers = [...new Set(records.flatMap(record => Object.keys(record).filter(field => !excluded.has(field))))];
    const safeCell = value => {
      let text = String(value ?? '');
      if (/^[=+\-@]/.test(text)) text = `'${text}`;
      return `"${text.replace(/"/g, '""')}"`;
    };
    const csv = '\uFEFF' + [headers.map(safeCell).join(';'), ...records.map(record => headers.map(header => safeCell(record[header])).join(';'))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${key}-${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    toast(`Exportação de ${key} concluída.`);
  }

  fillForm();
});
