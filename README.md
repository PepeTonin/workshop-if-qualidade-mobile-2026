# Workshop Store

<img src="./assets/readme/BANNER-IF-SUMMIT.webp" alt="IF Summit Banner" />

Repositório utilizado na apresentação do **[IF Summit 2026](https://ifpr.edu.br/cascavel/ifsummit/)** — evento do IFPR Campus Cascavel — para demonstrar uma estratégia leve de testes E2E em aplicações React Native/Expo usando a build Web com Playwright.

## Sobre o projeto

A ideia central é manter a aplicação mobile compatível com a web através do Expo e React Native, permitindo que fluxos críticos do usuário também rodem no navegador.

Com isso, é possível executar testes end-to-end em pipelines de CI usando Playwright, evitando soluções mais complexas e caras como BrowserStack, LambdaTest (TestMu AI), Appium, Detox ou Maestro.

Essa estratégia **não substitui** testes E2E nativos em mobile. Ela tem limitações claras para cenários que envolvem funcionalidades específicas de dispositivo (câmera, notificações push, biometria, permissões nativas etc.).

Porém, é bastante eficaz para validar regras de negócio compartilhadas e fluxos como autenticação, validação de formulários, navegação e checkout.

## Fluxo principal da aplicação

1. Navegar pelo catálogo de produtos (dados vindos da [DummyJSON](https://dummyjson.com))
2. Adicionar produtos ao carrinho
3. Criar uma conta na aba Profile (autenticação local)
4. Aplicar cupom de desconto (opcional)
5. Finalizar o checkout (verificação local)
6. Visualizar a tela de confirmação do pedido

## Rotas

A navegação usa tabs (Expo Router) com uma tela adicional fora das tabs:

| Rota                | Descrição                                     |
| ------------------- | --------------------------------------------- |
| `/`                 | Home / catálogo de produtos                   |
| `/profile`          | Login, criação de conta e detalhes do usuário |
| `/cart`             | Revisão do carrinho, cupom e checkout         |
| `/checkout-success` | Confirmação do pedido (fora das tabs)         |

## Estrutura do projeto

```
src/
├── app/          # Rotas do Expo Router (arquivos finos que re-exportam screens)
├── screens/      # Implementação das telas
├── components/   # Componentes reutilizáveis de UI
├── hooks/        # Lógicas de negócio
├── stores/       # Estado global com Zustand
├── api/          # Instância Axios e conectores
├── global/       # Tema e constantes do app
├── types/        # Tipagens globais
└── utils/        # Utilitários
```

## Dados e estado

### Dados remotos

O app consome a API pública `https://dummyjson.com` via Axios

- `GET /products` — catálogo de produtos (com paginação e busca)
- `GET /products/search` — busca de produtos por texto
- `GET /c/...` — validação de cupons de desconto

### Cupons disponíveis

| Código             | Descrição      |
| ------------------ | -------------- |
| `WORKSHOPIFSUMMIT` | 5% de desconto |

O desconto total por item (loja + cupom) é limitado a 20%.

### Checkout

O checkout é simulado localmente — não faz chamada real a uma API de compras. Ele valida os descontos e totais antes de gerar um número de pedido.

### Estado local

- **Auth** — gerenciado com Zustand, totalmente local. Não há usuários pré-cadastrados, o usuário deve criar a conta primeiro.

- **Cart** — também local com Zustand. Inclui itens, ações de adicionar/remover/limpar, aplicação de cupons e dados do último checkout.

O estado é efêmero: recarregar a página reseta tudo.

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o app (modo web):

```bash
npx expo start --web
```

O app estará disponível em `http://localhost:8081`.

## Stack

- Expo 55
- React 19
- React Native 0.83
- Expo Router
- React Native Web
- Zustand
- Axios
- TypeScript (strict mode)

## Testes

### Estratégia

Os testes irão ficar em `./e2e/` (pasta separada no root) e rodam contra a versão web do app usando Playwright.

### Referências

- [Instalação do Playwright](https://playwright.dev/docs/intro)
- [Escrevendo testes](https://playwright.dev/docs/writing-tests)
- [Geração automática de testes (codegen)](https://playwright.dev/docs/codegen-intro)
- [Executando testes](https://playwright.dev/docs/running-tests)
- [Trace Viewer (debug)](https://playwright.dev/docs/trace-viewer-intro)

### Integração no CI

O repositório fica hospedado no GitHub e usará GitHub Actions para rodar os testes automaticamente.
O workflow fica em `./.github/workflows/` e deve:

1. Configurar o Node.js
2. Verificar cache e instalar dependências
3. Iniciar o app como web server
4. Rodar os testes com Playwright
5. Fazer upload dos artefatos (report) com tempo de retenção definido

Referência: [Playwright CI](https://playwright.dev/docs/ci-intro)
