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

Uma plataforma web moderna para gerenciamento e reserva de imóveis, 
desenvolvida com Next.js 15 e TypeScript. O sistema permite que anfitriões 
cadastrem suas propriedades e gerenciem disponibilidade, enquanto hóspedes 
podem navegar e visualizar imóveis disponíveis para locação.

## Sobre o Projeto

Este é um projeto acadêmico de desenvolvimento web que implementa um sistema 
completo de marketplace de imóveis para locação temporária, similar a 
plataformas como Airbnb. O foco está em criar uma experiência de usuário 
fluida com autenticação persistente, gerenciamento de estado global e 
interface responsiva.

## Funcionalidades

### Autenticação e Autorização
- Sistema completo de login e cadastro
- Autenticação persistente com Context API e LocalStorage
- Proteção de rotas privadas
- Gerenciamento de sessão do usuário

### Gerenciamento de Usuários
- Dashboard personalizado para cada usuário
- Visualização e edição de dados pessoais
- Histórico de hospedagens
- Sidebar de navegação contextual

### Gestão de Imóveis
- **CRUD Completo**:
  - Cadastro de novos imóveis
  - Visualização detalhada de propriedades
  - Edição de informações e status
  - Dashboard de imóveis do anfitrião
- **Controle de Status**: Livre, Ocupado, Manutenção
- **Informações**: Título, foto, localização, valor da diária

### Área Pública
- Listagem de todos os imóveis disponíveis
- Página de detalhes públicos de cada propriedade
- Interface responsiva em grid adaptativo
- Cards informativos com status visual

### Interface do Usuário
- Design moderno e minimalista
- Componentes reutilizáveis com shadcn/ui e Base UI
- Sistema de design com Tailwind CSS
- Tema claro/escuro (variáveis CSS)
- Animações e transições suaves

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
**Estrutura de Tipagem e Arquitetura de Dados:**

Na modelagem de dados da plataforma, optamos por uma arquitetura simplificada e 
unificada. Percebemos que não há necessidade de criar diferenciações ou separar 
os usuários em perfis distintos (como "hóspede" ou "locador"). Na nossa 
aplicação, todos são tratados centralmente através de uma única entidade: 
**`Usuario`**.

A regra de negócio e a interface seguem um fluxo direto: existe apenas uma 
página de perfil de usuário. Nela, o usuário pode visualizar todas as suas 
informações pessoais, o histórico de suas reservas e a lista de seus imóveis 
cadastrados.

A estrutura do banco de dados (mock) reflete essa simplicidade. Se um usuário 
não possui imóveis para alugar, o campo `imoveis` será apenas um array vazio 
(`[]`), sem necessidade de criar lógicas complexas de permissão ou visões 
diferentes na plataforma.

**1. Interface de Usuário (`UsuarioType`)** Contém todos os dados essenciais de
cadastro, credenciais de acesso e a relação de propriedades do usuário 
(caso tenha).

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
| status | `'livre' | 'ocupado' | 'manutencao'` |

---
## Mapeamento de Rotas (Públicas e Privadas)

Para garantir a segurança das informações e a correta fluidez da navegação, o sistema divide o acesso às páginas em dois grupos. A proteção das rotas privadas é feita no lado do cliente (Client-side) através do monitoramento do `AuthContext`.

Se um usuário não autenticado tentar acessar uma URL protegida diretamente pelo navegador, ele será interceptado e redirecionado automaticamente para a página inicial ou de login.

### Rotas Públicas
Páginas abertas para qualquer visitante. Não exigem sessão ativa no `localStorage`.

* **`/` (Home):** Página inicial. Vitrine onde ficam expostos os imóveis e o botão para abrir o modal de acesso.
* **`/sobre`:** Página institucional com informações sobre a plataforma.
* **`/autenticacao/login`:** Rota direta para o formulário de login.
* **`/autenticacao/cadastro`:** Rota direta para o formulário de criação de conta.

### Rotas Privadas (Protegidas)
Área restrita. Apenas usuários logados (com o status `estaAutenticado === true` no Contexto) podem acessar. O componente `useEffect` dessas páginas monitora a sessão e realiza o redirecionamento (`router.push`) caso o usuário não tenha permissão.

* **`/usuario`:** Ponto de entrada para o ecossistema do usuário logado (renderiza o layout com a Sidebar).
* **`/usuario/[perfil]`:** Dashboard principal do usuário logado, exibindo seus dados pessoais.
* **`/usuario/[perfil]/historico`:** Tabela com o histórico de estadias/reservas (concluídas, futuras ou canceladas).
* **`/usuario/[perfil]/imoveis` (e sub-rotas):** Área do proprietário. Inclui a listagem dos próprios imóveis, a rota para criar um novo anúncio (`.../imoveis/novo`) e a rota para editar um imóvel existente (`.../imoveis/[slug]/editor`).
---
### Arquitetura: Fluxo de Cadastro (Pai e Filho)

**Padrão Utilizado:** Smart Components (Páginas) vs. Dumb Components (Formulários).

**Objetivo:** Separar responsabilidades visuais/validação das regras de 
negócio e persistência de dados.

### Atores do Fluxo

1. **Componente Filho (`cadastro-form.tsx`):** Responsável estritamente pela Interface do Usuário (UI) e validação de formato de dados (Zod + React Hook Form).
2. **Página Pai (`src/app/autenticacao/cadastro/page.tsx`):** Responsável pela regra de negócio, integração com banco de dados/mocks e roteamento.

### Workflow Passo a Passo

- **Passo 1: Inicialização (Renderização)**
    - A **Página Pai** é carregada no navegador do usuário.
    - Ela injeta sua regra de negócio (a função `processarCadastro`) para dentro do **Componente Filho** através de uma propriedade (`prop` chamada `aoEnviar`).
    - Ao ser injetada ele aplica a regra de busca por CPF, se o CPF nao existe, salvo o dado novo no mock, caso CPF exista, nao salva.
- **Passo 2: Interação do Usuário**
    - O usuário preenche os dados (Nome, E-mail, Telefone, CPF e Senha) no **Componente Filho**.
    - Ao clicar no botão "Cadastrar", o evento de submissão é disparado.
- **Passo 3: Validação de Front-end (Zod)**
    - O motor do React Hook Form, utilizando o esquema do Zod, intercepta os dados dentro do **Componente Filho**.
    - **Se os dados forem inválidos** (ex: e-mail sem '@', senha curta): O fluxo é interrompido aqui mesmo. O componente desenha as mensagens de erro visuais na tela. A Página Pai nem fica sabendo que isso aconteceu.
    - **Se os dados forem válidos**: O fluxo avança para a próxima etapa.
- **Passo 4: Elevação dos Dados (Callback)**
    - O **Componente Filho** empacota os dados já limpos e validados e executa a prop `aoEnviar(dados_limpos)`.
    - Neste momento, a responsabilidade do formulário termina. Os dados "sobem" para a **Página Pai**.
- **Passo 5: Regras de Negócio (Página Pai)**
    - A função `processarCadastro` (que mora na Página Pai) assume o controle recebendo os dados limpos.
    - Ela realiza a busca no Mock (`hospedesMock`) para verificar se já existe um usuário com aquele CPF cadastrado.
        - *Cenário Negativo:* Se o CPF existir, emite um alerta de duplicidade e interrompe a execução.
        - *Cenário Positivo:* Se o CPF for novo, gera um identificador único (`id`) e monta o objeto final no formato da interface `HospedeType`.
- **Passo 6: Persistência e Feedback**
    - A **Página Pai** salva o novo objeto no banco de dados simulado (Mock array) ou no `localStorage` do navegador.
    - Por fim, dispara um aviso de sucesso para o usuário e o redireciona automaticamente para a rota de Login (`/autenticacao/login`).
---
### Arquitetura: Edição de Perfil

**Padrão Utilizado:** Formulário Controlado com Alternância de Estados.

A funcionalidade de edição de perfil de usuário (`usuario/[perfil]`) utiliza o `React Hook Form` juntamente com o `Zod` para validação e gerenciamento de estados no lado do cliente.

- **Componente Principal e Formulário:** O perfil do usuário gerencia um estado `estaEditando` (booleano). Quando desativado, o formulário (`EdicaoUsuarioForm`) exibe os dados pessoais em modo apenas leitura.
- **Interatividade:** Ao clicar em "Editar", o estado muda, habilitando os inputs para edição. Isso permite uma experiência fluida de visualização e edição sem trocar de página ou abrir novos modais.
- **Ciclo de Atualização:** Após a validação via Zod (sem erros de esquema), o evento `aoEnviar` eleva os dados de volta para a página, que então sai do modo de edição. Questões de hidratação (SSR vs Client) foram contornadas para garantir a estabilidade do estado.
---
## Lógica de Autenticação e Fluxo do Usuário

Como o projeto atual foca exclusivamente no Front-end, a autenticação não se comunica com um Back-end real. Em vez disso, ela utiliza uma **sessão simulada** gerenciada pelo `AuthContext` (Context API) e pelo `localStorage` do navegador.

Abaixo está o passo a passo detalhado de como esse fluxo funciona de ponta a ponta:

### 1. O Motor da Sessão: `AuthContext.tsx`

O `AuthContext` atua como o cérebro da aplicação no que diz respeito ao usuário.

- Ao carregar a aplicação, ele verifica se existe um usuário salvo no `localStorage` do navegador.
- Ele provê variáveis e funções globais, como `usuarioLogado`, `estaAutenticado`, `login()` e `logout()`.
- Qualquer componente no sistema pode "escutar" esse contexto usando o hook customizado `useAuth()`.

### 2. A Porta de Entrada: `NavbarGeral`

A barra de navegação principal (`navbar-geral.tsx`) é dinâmica e se adapta ao status do usuário.

- **Prevenção de Hydration Mismatch:** Como o Next.js renderiza a página primeiro no servidor (onde não existe `localStorage`), a Navbar usa um estado de `montado` (`useEffect(() => setMontado(true), [])`). Isso garante que a renderização do servidor e do cliente sejam idênticas nos primeiros milissegundos, evitando erro do Next.js.
- **Comportamento Dinâmico:** Se `estaAutenticado` for `false`, a Navbar exibe o botão **"Acessar Conta"**.
  - Se `estaAutenticado` for `true`, o botão se transforma magicamente no botão **"Painel do Usuário"** (com link direto para `/usuario/[perfil]`).

### 3. O Pop-up de Autenticação: `autenticacao.tsx`

Quando o usuário deslogado clica em "Acessar Conta", um pop-up é aberto sobrepondo a tela.

- Esse modal controla qual formulário exibir: `login-form.tsx` ou `cadastro-form.tsx`.
- **Validação:** Ambos os formulários utilizam `React Hook Form` combinado com `Zod`. Se o usuário digitar um CPF incompleto ou e-mail inválido, o `Zod` bloqueia o envio e exibe os erros instantaneamente, sem recarregar a página.
- **Simulação de Login:** No `login-form.tsx`, ao enviar os dados válidos, o sistema realiza uma busca (método `.find()`) no arquivo estático `mockUsuario.ts`.
- Se o CPF e a senha baterem, a função `login()` do contexto é chamada, os dados são gravados no `localStorage`, e o modal se **fecha automaticamente**. A Navbar então é atualizada na mesma hora.

### 4. Proteção de Rotas (Redirecionamento)

Páginas que exigem login, como as pagina internas de `/usuario/...`, possuem uma camada de proteção nativa do React.

- Ao acessar essas páginas, um `useEffect` monitora a variável `estaAutenticado` do `AuthContext`.
- Se o sistema detectar que o usuário não está logado, a função `router.push("/autenticacao/login")` ou `router.push("/")` é acionada, "expulsando" o visitante da área restrita antes que ele veja dados sensíveis.

### 5. O Painel do Usuário e a Barra Lateral: `navbar-usuario.tsx`

Ao clicar no botão "Painel do Usuário" na Navbar principal, o fluxo entra na estrutura aninhada da rota `/usuario`.

- **Layout Aninhado (`/usuario/layout.tsx`):** O Next.js permite que todas as páginas dentro de `/usuario` compartilhem um mesmo escopo visual. É aqui que a **Sidebar (Barra Lateral)** exclusiva do usuário (`navbar-usuario.tsx`) é inserida.
- Essa Sidebar carrega links específicos como "Perfil", "Histórico de Hospedagens" e a aba de "Imóveis" (com seu dropdown em cascata), mantendo-se fixa à esquerda enquanto o conteúdo muda à direita.
- **Desempacotamento de Parâmetros:** Nas páginas dinâmicas como `/usuario/[perfil]/page.tsx`, o ID do perfil é lido diretamente da URL. Como no Next.js moderno os `params` são *Promises*, o hook `React.use(params)` é aplicado para acessar corretamente qual usuário mockado deve ter suas informações (nome, e-mail, e propriedades) desenhadas na tela.
- **Fim da Sessão:** A qualquer momento, o usuário pode clicar em "Sair", disparando a função `logout()`, limpando o `localStorage` e sendo redirecionado de volta para a Home.