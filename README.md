# Sistema de Aluguel de Imóveis (Fullstack)

Uma plataforma web moderna para gerenciamento e reserva de imóveis, 
desenvolvida com **Next.js 15**, **Fastify**, **Prisma** e **SQLite**. O sistema permite que anfitriões 
cadastrem suas propriedades e gerenciem disponibilidade, enquanto hóspedes 
podem navegar e visualizar imóveis disponíveis para locação.

## Sobre o Projeto

Este é um projeto acadêmico de desenvolvimento web que implementa um sistema 
completo de marketplace de imóveis para locação temporária, similar a 
plataformas como Airbnb. Recentemente, o projeto evoluiu de uma solução 
baseada em *mocks* no client-side para uma arquitetura **Fullstack**, implementando
um backend robusto com banco de dados relacional e autenticação segura via cookies.

## Funcionalidades

### 🔐 Autenticação e Autorização (Backend)
- Sistema completo de login e cadastro integrado ao banco de dados.
- Autenticação segura utilizando **JWT (JSON Web Tokens)** e **HttpOnly Cookies**.
- Proteção de rotas privadas no frontend e backend.
- Gerenciamento de sessão persistente e seguro.

### 👥 Gerenciamento de Usuários
- Dashboard personalizado para cada usuário.
- Visualização e edição de dados pessoais.
- Remoção de conta (com deleção em cascata dos imóveis e reservas associadas).
- Histórico de hospedagens.

### 🏠 Gestão de Imóveis
- **CRUD Completo**:
  - Cadastro de novos imóveis atrelados ao usuário logado.
  - Visualização detalhada de propriedades.
  - Edição de informações e status.
  - Exclusão de imóveis.
  - Dashboard de imóveis do anfitrião.
- **Controle de Status**: Livre, Ocupado, Manutenção.

### 🌐 Área Pública
- Listagem de todos os imóveis disponíveis.
- Página de detalhes públicos de cada propriedade.
- Interface responsiva em grid adaptativo.

### 📜 Documentação da API
- Documentação interativa e automatizada com **Swagger/OpenAPI**.
- Definição rigorosa de schemas e validação de requisições com **Zod**.

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend (Client)
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router.
- **[React 19](https://react.dev/)** - Biblioteca de interface.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first.
- **[shadcn/ui](https://ui.shadcn.com/)** & **[Base UI](https://base-ui.netlify.app/)** - Componentes de interface.
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** - Gerenciamento e validação de formulários.
- **Context API** - Gerenciamento de estado global.

### ⚙️ Backend (Server)
- **[Fastify](https://fastify.dev/)** - Framework web ultrarrápido para Node.js.
- **[Prisma ORM](https://www.prisma.io/)** - Mapeamento objeto-relacional (ORM).
- **[SQLite](https://sqlite.org/)** - Banco de dados embutido e leve.
- **[@fastify/jwt](https://github.com/fastify/fastify-jwt)** & **[@fastify/cookie](https://github.com/fastify/fastify-cookie)** - Autenticação segura.
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** - Documentação da API.

---

## 📁 Estrutura do Projeto

```bash
src
├── app               # Frontend: Next.js App Router (Páginas, Layouts)
│   ├── autenticacao  # Fluxos de login e cadastro
│   ├── imovel        # Área pública de imóveis
│   └── usuario       # Área privada protegida
├── contexts          # Frontend: Context API (AuthContext, etc)
├── modules           # Frontend: Componentes reutilizáveis
├── plugins           # Backend: Plugins Fastify (Swagger, Zod, Logger)
├── prisma            # Backend: Schema do banco de dados (schema.prisma)
├── routes            # Backend: Rotas da API Fastify
├── schemas           # Backend/Frontend: Schemas de validação globais (Zod)
├── services          # Frontend/Backend: Camada de comunicação de dados
└── server.ts         # Backend: Ponto de entrada do servidor Fastify
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd trabalho-web

# Instale as dependências
npm install
```

### Configuração do Banco de Dados (Prisma)

Antes de iniciar o projeto, certifique-se de que o banco de dados SQLite está atualizado:

```bash
# Sincroniza o schema do Prisma com o banco de dados
npx prisma db push --schema=src/prisma/schema.prisma

# (Opcional) Popula o banco com dados iniciais se houver seed
npx prisma db seed
```

### Iniciando a Aplicação (Servidor e Client)

Como a aplicação se tornou Fullstack, é necessário rodar o servidor Fastify e o frontend Next.js simultaneamente (em terminais separados):

**Terminal 1: Rodando o Backend (Fastify)**
```bash
npx tsx src/server.ts
```
> O servidor rodará em `http://localhost:3333` e a documentação Swagger estará disponível em `http://localhost:3333/docs`.

**Terminal 2: Rodando o Frontend (Next.js)**
```bash
npm run dev
```
> Acesse o frontend através de `http://localhost:3000`.

### Explorando o Banco de Dados
Você pode visualizar e manipular os dados do banco facilmente utilizando o Prisma Studio:
```bash
npx prisma studio --schema=src/prisma/schema.prisma
```

---

## 🗄️ Arquitetura de Dados (Prisma Models)

A aplicação conta com três entidades principais inter-relacionadas no SQLite:

**1. Usuario (`tb_usuario`)**
Contém os dados essenciais de cadastro e credenciais de acesso. Relaciona-se no modelo 1:N com Imóveis e Reservas.

**2. Imovel (`tb_imoveis`)**
Representa a propriedade a ser anunciada e alugada. Possui ligação bidirecional (foreign key) com o Usuário dono para garantir que não haja registros órfãos.

**3. Reserva (`tb_reserva`)**
Entidade que cruza as informações entre Hóspede (Usuário), Imóvel e as datas da locação.

---

## 🔒 Lógica de Autenticação Atualizada (Backend + Cookies)

A aplicação evoluiu de mocks no `localStorage` para um robusto fluxo JWT backend:

1. **Login:** Ao fazer requisição para `/api/login`, o Fastify verifica no banco via Prisma. Estando correto, gera um token JWT e o injeta como um **HttpOnly Cookie**.
2. **Sessão Segura:** O frontend (Next.js) não tem acesso direto ao cookie via JavaScript. Todas as requisições subsequentes ao backend levam o cookie de sessão de forma automática (`credentials: 'include'`).
3. **Validação e Contexto:** O `AuthContext` do React no carregamento faz uma requisição `/api/me` no backend para descobrir se há uma sessão válida, e recupera apenas dados públicos do usuário (sem devolver a senha).
4. **Proteção:**
   - **Frontend:** Redirecionamento de rotas protegidas pelo Contexto/Hooks.
   - **Backend:** Uso do hook `onRequest` do Fastify JWT para proteger rotas críticas (como criação e exclusão de imóveis).

---

## Autor

**João Pedro**  
Estudante de Ciência da Computação - UTFPR Santa Helena