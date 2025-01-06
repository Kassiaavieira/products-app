# Produtos App

Este é um sistema de gerenciamento de produtos, com funcionalidades para cadastro, edição e exclusão de produtos. O projeto é composto por dois principais módulos: o **Back-End** desenvolvido com **Nest.js** e o **Front-End** desenvolvido com **Next.js**.


### Backend

O back-end é construído utilizando o **Nest.js**, um framework para construir aplicações server-side eficientes e escaláveis com Node.js.

### Frontend

O front-end é construído com **Next.js**, utilizando React para construir a interface do usuário.

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado:

- **Docker**: Para orquestrar os containers com o `docker-compose`.
- **Node.js** (versão 18.x ou superior): Para rodar o ambiente localmente (se não usar Docker).
- **Yarn**: Gerenciador de pacotes (caso esteja usando Yarn).

## Instalação e Execução

### 1. Configuração com Docker

Este projeto inclui um arquivo `docker-compose.yml` para facilitar a configuração de ambos os ambientes (Back-End e Front-End) usando containers Docker.

#### Passos:

1. Clone o repositório:

   ```bash
   git clone https://github.com/Kassiaavieira/products-app.git
   ```
2. Suba os containers Docker na pasta raiz:
    ```bash
    docker-compose up --build
    ```
Isso irá rodar tanto o Back-End quanto o Front-End em containers Docker.

