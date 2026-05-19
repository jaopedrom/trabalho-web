This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Sistema de Aluguel de Imóveis

Plataforma web para gerenciamento e reserva de imóveis, construída com Next.js 15 e TypeScript. Anfitriões cadastram propriedades e controlam disponibilidade; hóspedes navegam e reservam o que estiver livre.

## Sobre o Projeto

Projeto acadêmico que implementa um marketplace de locação temporária de imóveis, com referência ao modelo do Airbnb. O foco foi em autenticação persistente, gerenciamento de estado global e uma interface que funciona bem em diferentes tamanhos de tela.

## Funcionalidades

### Autenticação e Autorização

- Login e cadastro de usuários
- Sessão persistente via Context API e LocalStorage
- Proteção de rotas privadas

### Gerenciamento de Usuários

- Dashboard individual por usuário
- Edição de dados pessoais
- Histórico de hospedagens
- Sidebar de navegação contextual

### Gestão de Imóveis

- **CRUD completo**: cadastro, visualização, edição e dashboard do anfitrião
- **Status**: Livre, Ocupado, Manutenção
- **Campos**: título, foto, localização, diária

### Área Pública

- Listagem de imóveis disponíveis, com propriedades ocupadas ou em manutenção ocultadas automaticamente
- **Busca por datas**: filtra imóveis cruzando o intervalo selecionado com as reservas ativas
- Página de detalhes de cada imóvel
- Grid adaptativo e cards com status visual

### Interface

- Design minimalista
- Componentes com shadcn/ui e Base UI
- Tailwind CSS
- Tema claro/escuro via variáveis CSS
- Animações e transições

## 🛠️ Tecnologias Utilizadas

### Core
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[React 18](https://react.dev/)** - Biblioteca de interface

### Formulários e Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração RHF + Zod

### UI/UX
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes React acessíveis
- **[react-tailwindcss-datepicker](https://react-tailwindcss-datepicker.vercel.app/)** - Componente de calendário/datepicker
- **[dayjs](https://day.js.org/)** - Biblioteca para manipulação de datas, requisito do react-tailwindcss-datepicker
- **[Base UI](https://base-ui.netlify.app/)** - Componentes headless
- **[Phosphor Icons](https://phosphoricons.com/)** - Biblioteca de ícones
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes

### Estado e Roteamento
- **Context API** - Gerenciamento de estado global
- **Next.js App Router** - Roteamento dinâmico
- **LocalStorage** - Persistência de dados do cliente

## 📁 Estrutura do Projeto

```bash
src
├── app # App Router do Next.js
│   ├── autenticacao # Fluxos de login e cadastro
│   │   ├── cadastro
│   │   │   └── page.tsx
│   │   └── login
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── gerenciamento-usuario
│   │   └── page.tsx
│   ├── globals.css
│   ├── imovel
│   │   └── [slug]
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── usuario
│       ├── layout.tsx
│       ├── page.tsx
│       └── [perfil] # Área privada do usuário
│           ├── historico # Histórico de reservas
│           │   └── page.tsx
│           ├── imovel-usuario # Gestão de imóveis
│           │   ├── novo # Cadastro de imóvel
│           │   │   └── page.tsx 
│           │   ├── page.tsx 
│           │   └── [slug]
│           │       ├── editor # Edição do imóvel
│           │       │   └── page.tsx
│           │       └── page.tsx
│           └── page.tsx  # Dashboard do usuário
├── contexts # Context API
│   └── AuthContext.tsx  # Contexto de autenticação
├── modules 
│   ├── components # Componentes reutilizáveis
│   │   ├── autenticacao.tsx # Modal de login/cadastro
│   │   ├── button.tsx
│   │   ├── cadastro-form.tsx # Formulário de cadastro
│   │   ├── card-imoveis.tsx # Card de exibição
│   │   ├── card-usuario.tsx
│   │   ├── imoveis # Tipos e mocks de imóveis
│   │   │   ├── mocks
│   │   │   │   └── imoveisMock.ts
│   │   │   └── types
│   │   │       └── imoveisType.ts
│   │   ├── login-form.tsx # Formulário de login
│   │   ├── navbar-geral.tsx # Navbar principal
│   │   ├── navbar-usuario.tsx # Sidebar do usuário
│   │   ├── pessoa
│   │   │   └── types
│   │   │       └── pessoaType.ts
│   │   ├── reserva # Tipos de reserva
│   │   │   └── reserva-type.ts
│   │   ├── tabela-historico.tsx
│   │   └── usuario # Tipos e mocks de usuário
│   │       ├── mock
│   │       │   └── mockUsuario.ts
│   │       └── type
│   │           └── usuarioType.ts
│   └── imovel-form.tsx # Formulário de imóvel
└── public
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd nome-do-projeto

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
# Crie o build otimizado
npm run build

# Inicie o servidor de produção
npm run start
```

## Dados de Teste

O projeto utiliza mocks para desenvolvimento. Usuários de teste:

```typescript
// CPF: 111.111.111-11 | Senha: password123
// CPF: 222.222.222-22 | Senha: password456
// CPF: 333.333.333-33 | Senha: password789
```

## Autor

**João Pedro**  
Estudante de Ciência da Computação - UTFPR Santa Helena

---
## Tipagem e Arquitetura de Dados

A modelagem usa uma única entidade para todos os usuários: `Usuario`. Não há 
distinção entre "hóspede" e "locador".

O perfil é uma página só. Nela aparecem os dados pessoais, o histórico de 
reservas e os imóveis cadastrados. Usuário sem imóvel? O campo `imoveis` vem 
vazio (`[]`).

### 1. Interface `UsuarioType`

Reúne os dados de cadastro, credenciais de acesso e a lista de propriedades do usuário.

| Campo | Tipo |
| --- | --- |
| id | `string` |
| nome | `string` |
| email | `string` |
| telefone | `string` |
| senha | `string` |
| cpf | `string` |
| imoveis | `ImovelType[]` |

**2. Interface de Imóvel (`ImovelType`)** Representa a propriedade a ser 
anunciada e alugada. Contém uma chave estrangeira simulada (`usuarioId`) 
para garantir a ligação bidirecional, certificando-se de que o imóvel 
está atrelado ao seu respectivo usuário dono, evitando registros órfãos 
no sistema.

| Campo | Tipo |
| --- | --- |
| id | `string` |
| usuarioId | `string` |
| titulo | `string` |
| foto | `string` |
| localizacao | `string` |
| valorDiaria | `number` |
| status | `'livre' \| 'ocupado' \| 'manutencao'` |

**3. Interface de Reserva (`ReservaType`)** Representa a reserva de um imóvel 
por um usuário.

| Campo | Tipo |
| --- | --- |
| id | `string` |
| usuarioId | `string` |
| imovelId | `string` |
| dataCheckIn | `string` |
| dataCheckOut | `string` |
| valorTotal | `number` |
| status | `'pendente' \| 'confirmada' \| 'cancelada' \| 'concluida'` |

---

## Mapeamento de Rotas

As páginas se dividem em dois grupos: públicas e privadas. Rotas privadas são 
protegidas no lado do cliente via `AuthContext`. Se alguém tentar acessar uma 
URL protegida sem sessão, o `useEffect` da página detecta e chama `router.push` 
redirecionando para a home ou login antes de qualquer coisa ser renderizada.

### Rotas Públicas

Sem requisito de sessão. Qualquer visitante acessa.

- **`/`** — Página inicial com a listagem de imóveis e o modal de acesso.
- **`/autenticacao/login`** — Formulário de login.
- **`/autenticacao/cadastro`** — Formulário de criação de conta.

### Rotas Privadas

Exigem `estaAutenticado === true` no contexto. Acesso direto pela URL sem sessão 
ativa resulta em redirecionamento imediato.

- **`/usuario`** — Rota raiz privada que automaticamente redireciona o usuário 
para seu painel individual.
- **`/usuario/[perfil]`** — Dashboard com os dados pessoais do usuário, menu de navegação e atalhos rápidos.
- **`/usuario/[perfil]/historico`** — Histórico de reservas (concluídas, futuras, 
canceladas).
- **`/usuario/[perfil]/imovel-usuario`** — Área do proprietário: lista os imóveis 
do usuário, com sub-rotas para criar um anúncio (`.../novo`) e editar um existente (`.../[slug]/editor`).
---

### Arquitetura: Fluxo de Cadastro

**Padrão:** Smart Components (páginas) vs. Dumb Components (formulários). 
O formulário só sabe validar e exibir; a lógica de negócio fica na página.

### Atores

1. **`cadastro-form.tsx` (filho)** — UI e validação de formato com Zod + 
React Hook Form.
2. **`src/app/autenticacao/cadastro/page.tsx` (pai)** — regra de negócio, 
mock e roteamento.

### Fluxo

**1. Inicialização**

A página pai injeta `processarCadastro` no filho via prop `aoEnviar`. O formulário 
não sabe o que essa função faz, só sabe que vai chamá-la quando os dados 
estiverem prontos.

**2. Interação do usuário**

O usuário preenche Nome, E-mail, Telefone, CPF e Senha e clica em "Cadastrar".

**3. Validação (Zod)**

O React Hook Form valida contra o schema Zod antes de qualquer coisa. 
E-mail sem `@`, senha curta; o fluxo para e os erros aparecem no formulário. 
Se passar, segue.

**4. Callback**

O filho chama `aoEnviar(dados_limpos)`. O formulário saiu do fluxo. Os dados 
estão com o pai.

**5. Regra de negócio**

`processarCadastro` consulta o `hospedesMock` pelo CPF:
- CPF já existe emite alerta de duplicidade, encerra.
- CPF novo gera `id` único e monta o objeto `HospedeType`.

**6. Persistência e feedback**

Salva no `localStorage`, confirma o sucesso para o usuário e redireciona 
para `/autenticacao/login`.
---

## Lógica de Autenticação e Fluxo do Usuário

O projeto é só front-end, não há backend real. A autenticação usa uma sessão 
simulada via `AuthContext` (Context API) e `localStorage`.

### 1. `AuthContext.tsx`

O contexto central da sessão. Na inicialização, verifica se há usuário salvo 
no `localStorage`. Expõe `usuarioLogado`, `estaAutenticado`, `login()` 
e `logout()` para qualquer componente via `useAuth()`.

### 2. `NavbarGeral`

A navbar se adapta ao status da sessão, mas tem um problema para contornar 
primeiro: o Next.js renderiza no servidor, onde `localStorage` não existe, 
e isso causaria hydration mismatch. A solução é um estado `montado` 
via `useEffect(() => setMontado(true), [])` o componente só exibe o estado 
correto depois que o cliente monta.

Depois disso: `estaAutenticado === false` mostra "Acessar Conta"; `true` 
mostra "Painel do Usuário" com link para `/usuario/[perfil]`.

### 3. `autenticacao.tsx`

"Acessar Conta" abre um modal que alterna entre `login-form.tsx` e 
`cadastro-form.tsx`. Os dois usam React Hook Form + Zod. CPF incompleto 
ou e-mail inválido bloqueiam o envio e exibem os erros na hora, sem recarregar nada.

No login, os dados batem contra `mockUsuario.ts` via `.find()`. CPF e senha 
corretos: `login()` é chamado, os dados vão para o `localStorage`, o modal 
fecha e a navbar atualiza.

### 4. Proteção de Rotas

Páginas em `/usuario/...` têm um `useEffect` monitorando `estaAutenticado`. 
Sem sessão ativa, `router.push("/")` ou `router.push("/autenticacao/login")` 
dispara antes de qualquer dado ser exibido.

### 5. Painel do Usuário e Sidebar

A rota `/usuario` tem um layout aninhado (`/usuario/layout.tsx`) compartilhado 
pelas páginas filhas. Nele fica a `navbar-usuario.tsx`: sidebar fixa à esquerda 
com links para "Perfil", "Histórico de Hospedagens" e "Imóveis" (com dropdown 
em cascata).

Nas páginas dinâmicas como `/usuario/[perfil]/page.tsx`, o ID vem da URL. 
Como o Next.js moderno expõe `params` como Promise, o acesso é feito com 
`React.use(params)`.

"Sair" chama `logout()`, limpa o `localStorage` e redireciona para a home.

---
## Lógica de Busca e Filtragem de Reservas

A disponibilidade é calculada inteira no front-end, sem chamada a nenhum backend.

1. **Filtro por status:** A Home começa ocultando tudo que não tem 
`status === 'livre'`. Imóveis em manutenção ou ocupados saem da lista 
antes de qualquer busca.
2. **Seleção de datas:** Check-in e check-out vêm do 
`react-tailwindcss-datepicker`. O componente precisou de uma 
compatibilização manual com o Tailwind CSS v4 — resolvida via diretivas 
no `globals.css`.
3. **Cruzamento com reservas:** Datas selecionadas? O sistema cruza os IDs 
dos imóveis com `reservasMock`.
4. **Regra de sobreposição:** Reservas `canceladas` ou `concluidas` são ignoradas. 
O imóvel é marcado como indisponível quando 
`Check-in Selecionado < Check-out da Reserva` **e** 
`Check-out Selecionado > Check-in da Reserva` — a condição clássica de overlap 
de intervalos. Se bater, some da listagem.