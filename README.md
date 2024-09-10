# AutoPoll

AutoPoll é um projeto que utiliza inteligência artificial Gemini para gerar enquetes aleatória de acordo com categorias populadas.

## Funcionalidades

- Geração automática de enquetes com base em categorias.
- Votar em enquetes

## Tecnologias Utilizadas

- **Backend**: Node.js com Fastify
- **IA**: Gemini IA (Google)
- **Banco de Dados**: Prisma ORM com PostgreSQL
- **Frontend**: Vite (React.js)

### Check-list de implementações
- [X] Categorias
- [ ] Gráficos
- [ ] Página "Sobre"
- [ ] Página de enquetes já votadas
- [ ] Indicar categorias quentes
- Novas ideias serão listas no futuro

## Instalação

Para instalar e rodar o AutoPoll localmente:

1.  Clone este repositório:

    ```bash
    git clone https://github.com/Chr1s0Blood/autopoll.git
    ```

2.  Entre na pasta clonada e instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente:

    ```env
    NODE_ENV=development

    PORT=3000
    GEMINI_API_KEY= # Gere sua KEY no console
    GEMINI_MODEL="gemini-1.5-flash" # Escolha um modelo do GEMINI

    DATABASE_URL="postgresql://root:root@localhost:5432/auto-poll?schema=public" # Apenas de exemplo

    ALLOWED_ORIGINS="http://localhost:5173" # As origens permitidas para bater na sua aplicação

    ```
4. Execute as migrações do banco de dados:

    ```bash
    npx prisma migrate dev
    ```
    
    ou simplesmente use (Sem migrations):
    ```bash
    npx prisma db push
    ```
5. Inicia o server de desenvolvimento:
    ```bash
    npm run dev
    ```

## Contribuição
Sinta-se à vontade para contribuir com o AutoPoll! Segue abaixo o passo a passo para colaborar com o projeto:

1. Faça um fork do repositório.

2. Crie uma nova branch para sua funcionalidade ou correção de bug:
```bash
git checkout -b feature/nova-funcionalidade
```

3. Realize suas alterações e commit suas modificações:

```bash
git commit -m 'Adiciona nova funcionalidade'
```
4. Envie suas mudanças para o repositório remoto:

```bash
git push origin feature/nova-funcionalidade
```

5. Abra um Pull Request no repositório original e descreva as mudanças que você fez! :D.