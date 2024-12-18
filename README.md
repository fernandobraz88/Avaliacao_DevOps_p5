# Projeto Multicamadas com Docker

## Descrição
Este é um projeto web multicamadas que utiliza **Docker** para gerenciar os serviços. Ele inclui:
- **Front-end**: Interface web construída com HTML, CSS e JavaScript.
- **Back-end**: API REST desenvolvida em Python (Flask).
- **Banco de Dados**: Banco relacional PostgreSQL.
- Funcionalidades completas de CRUD (Create, Read, Update, Delete).

---

## Tecnologias Utilizadas
- **Docker e Docker Compose**
- **Flask** (Back-end)
- **PostgreSQL** (Banco de Dados)
- **HTML, CSS, JavaScript** (Front-end)

---

## Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Portas **8080**, **5000** e **5432** livres.

### Passos
1. Clone o repositório:
```bash
   git clone https://github.com/fernandobraz88/Avaliacao_DevOps_p5.git
   cd <pasta do projeto>
```

2. Configure o arquivo `.env` com os seguintes valores:
```bash
    DB_HOST=db
    DB_NAME=products_db
    DB_USER=postgres
    DB_PASSWORD=postgres
```

3. Construa e inicie os contêineres:
```bash
docker-compose up --build
```

4. Acesse os serviços:
- Front-end: http://localhost:8080
- Back-end: http://localhost:5000

## Como Utilizar
### Front-end
- Preencha o nome e o preço de um produto e clique em "Salvar".
- Edite ou exclua produtos clicando nos botões correspondentes na lista.

### API REST
Você pode interagir com as seguintes rotas:

- **GET /products:** Lista todos os produtos.
- **POST /products:** Adiciona um novo produto.
- **PUT /products/<id>:** Atualiza um produto existente.
- **DELETE /products/<id>:** Exclui um produto.