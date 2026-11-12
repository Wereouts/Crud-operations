document.addEventListener('DOMContentLoaded', () => {
  const page = new CrudApp.CrudPage({ key: 'estudos', primaryField: 'titulo', newLabel: 'Novo estudo', columns: [{ key:'titulo', primary:true }, { key:'curso' }, { key:'status', type:'badge' }, { key:'data', type:'date' }] });
  const params = new URLSearchParams(location.search), search = params.get('search');
  if (search) { const input=document.querySelector('[data-search]'); input.value=search; input.dispatchEvent(new Event('input')); }
  if (params.get('action') === 'new') page.open();
});
