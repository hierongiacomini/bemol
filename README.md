# Bemol Fala

### Descrição 
Está é uma aplicação de cadastro de usuários para o sistema de atendimento omnichannel da Bemol. Foi utilizado para o frontend Reactjs e para o backend Nodejs com Expressjs e Sequelize. O banco de dados alvo da aplicação é o Mysql.

### Banco de dados
Para utilização da aplicação é necessário possuir instalado e rodando o banco de dados Mysql. A localização padrão está configurada para `localhost:3306`, sendo possível configurar o host e a porta no arquivo de ambiente. Também é necessário que a database configurada esteja criada no banco de dados.

### Arquivo de ambiente
No arquivo `.env` é possível configurar o nome da database, o host, porta, usuário e senha para acesso.
```
database="bemol"
host="localhost"
port="3306"
user="user"
password="password"
```

### Passo-a-passo
1. Instalar o Nodejs caso não esteja instalado. [Página do Nodejs](https://nodejs.org/en/)
2. Instalar o Mysql caso não esteja instalado. [Recomendação para Windows](https://www.apachefriends.org/pt_br/download.html)
3. Acessar o banco de dados e criar uma database com o nome **bemol**.
4. Criar um usuário com as permissões suficientes de acesso a database criada.
5. Clonar este repositório para o ambiente local.
6. Configurar o usuário e senha no arquivo `.env`.
7. Dentro da pasta raiz do repositório clonado rodar o comando `npm install` para instalar as dependências.
8. Dentro da pasta raiz do repositório clonado rodar o comando `npm start` para ativar o servidor.

### Acesso
O servidor está configurado para ser acessado em `localhost:5000`

### API
[POST] `/api/users`
Api para cadastro de usuário

[GET] `/api/ceps`
Api para consulta de informações do cep

