# CRUD Operations

Um dashboard administrativo responsivo para organizar usuários, estudos, cursos e pagamentos em uma única interface. O projeto foi construído com HTML, CSS e JavaScript puros, com foco em uma experiência visual moderna, acessível e fácil de manter.

> Status: projeto front-end em evolução. **Ainda não há backend, banco de dados ou API integrada.**

## O que é possível fazer

- Consultar indicadores no dashboard: estudos, cursos, pagamentos e usuários.
- Cadastrar, pesquisar, visualizar, editar e excluir registros de usuários, estudos, cursos e pagamentos.
- Usar paginação configurável nas tabelas.
- Personalizar aparência: tema claro/escuro, cor principal, tamanho de fonte e menu lateral compacto.
- Atualizar nome, e-mail e foto de perfil no navegador.
- Exportar os dados cadastrados em CSV.
- Acessar o sistema em desktop, tablet e celular.

## Como executar

O projeto não precisa de instalação de dependências. Basta iniciar um servidor estático a partir da raiz:

```powershell
python -m http.server 4173
```

Depois, abra no navegador:

```text
http://127.0.0.1:4173/Home/index.html
```

## Dados e limitações atuais

Os registros CRUD e as preferências visuais são guardados no `localStorage` do navegador. Isso permite testar a aplicação sem infraestrutura adicional, mas implica que:

- Os dados existem apenas no navegador e dispositivo usados.
- Limpar os dados do navegador remove os registros cadastrados.
- Os dados não são compartilhados entre usuários ou dispositivos.
- Não há autenticação real, sessões seguras ou controle de permissões no servidor.
- A alteração de senha não é concluída, pois depende de um endpoint seguro de autenticação no backend.

Para uma versão de produção, o próximo passo é criar uma API com autenticação segura, persistência em banco de dados, validação no servidor e regras de autorização.

## Estrutura do projeto

```text
assets/          Estilos, ícones, preferências globais e utilitários compartilhados
Home/            Dashboard e indicadores
Usuarios/        Gestão de usuários
Estudantes/      Gestão de estudos
Cursos/          Gestão de cursos
Pagamentos/      Gestão de pagamentos
Configuracoes/   Perfil, aparência, notificações, exportação e sistema
Login/           Tela de acesso local
Cadastrar/       Tela de cadastro local
```

## Tecnologias

- HTML5
- CSS3 com variáveis CSS e layout responsivo
- JavaScript moderno (ES6+)
- `localStorage` para persistência local

## Contribuição

Sugestões e melhorias são bem-vindas. Ao adicionar recursos, mantenha o padrão de componentes compartilhados em `assets/` e evite introduzir dependências quando HTML, CSS e JavaScript nativos forem suficientes.
