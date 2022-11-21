# Aplicativo de transferência financeira

## Projeto

Um projeto full stack que permite um usuário fazer transferência de dinheiro para outro. Para acesso à aplicação é necessário que o usuário faça autenticação na plataforma ou faço o cadastro. Após autenticado o usuário receberá automaticamente R$ 100,00 em sua conta e tem acesso ao painel que mostra o seu saldo atual, um campo para digitar um usuário e a quantia em dinheiro que ele deseja enviar e um histórico de transações, mostrando transações da conta podendo ser filtrado por data e/ou tipo de transação (envios/recebimentos).

## Desenvolvido utilizando (principais stacks)
> TypeScript, Node JS, React JS, PostgreSQL, Prisma ORM, Express JS e Tailwind CSS

## Rodando o projeto
> 1 - Clone o projeto <br>
> 2 - Entre no diretório `/financial-transfer-app/backend` e altere o nome do arquivo `.env.example` para apenas `.env`<br>
*(faça alterações no `.env` caso seja necessário)* <br>
> 3 - Inicie o docker <br>
> 4 - Execute o comando `docker-compose up -d` na raíz do projeto (`/financial-transfer-app`) <br>
> *O compose já instala as dependências, executa os serviços e faz as migrações. Caso não ocorra, verifique os comandos opcionais abaixo* <br>
> 5 - Acesse `http://localhost:3000` no navegador (caso apresente erro aguarde alguns minutos para a aplicação terminar de iniciar)

## Rodando os testes
*os testes ainda estão em desenvolvimento, por esse motivo a cobertura está baixa*

> ### Frontend
> 1 - Entre no diretório `/frontend` <br>
> 2 - Execute o comando `npm run test` - (caso execute fora do docker, digite antes o comando `npm install` no diretório `/frontend`)

### Comandos opcionais - backend:
> `npx prisma generate` - gera o cliente do prisma  (recomendado caso ocorra algum erro no backend) <br>
> `npm run start:migrate` - insere as migrações já criadas e inicia a API em live reload <br>
> `npx prisma migrate deploy` - insere as migrações já criadas <br>
> `npm run dev` - inicia a API em live reload <br>
> `npm run dev:migrate` - gera novas migrações do prisma a partir do schema <br>

### Comandos opcionais - frontend:
> `npm start` - inicia a aplicação React <br>
> `npm start:docker` - inicia a aplicação React em live reload no docker compatível com Windows

<b>Importante:</b> recomendado rodar os comandos dentro do docker para evitar incompatibilidade de sistema
