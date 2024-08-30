# Projeto Shopper

Bem-vindo ao Projeto Shopper! Este documento fornece instruções detalhadas para rodar a aplicação usando Docker.

## 🛠️ **Pré-requisitos**
Ter instalado na maquina:
- Docker
- SQlite

## 🚀 **Instruções para Rodar o Container**

Siga os passos abaixo para iniciar a aplicação utilizando Docker:

### 1. Navegue para a Pasta Raiz do Projeto

Abra o terminal e use o comando `cd` para acessar a pasta raiz do projeto. A pasta raiz é onde está localizado o arquivo `docker-compose.yml`.
```bash
cd /Teste-Shopper
```

### 2. Inicie o Container Docker

Execute o comando abaixo para criar e iniciar os containers definidos no arquivo `docker-compose.yml`. Este comando irá rodar a aplicação em segundo plano (modo destacável).
```bash
docker-compose up -d
```
Após a execução bem-sucedida deste comando, a aplicação estará rodando em um container Docker.


## 🔍 Verificando o Status

Para verificar se os containers estão em execução, você pode usar o seguinte comando:
```bash
docker-compose ps
```

## 📜 Notas Adicionais

Parar e Remover Containers: Para parar e remover os containers, execute:
```bash
docker-compose down
```

Visualizar Logs: Para visualizar os logs dos containers, use:
```bash
docker-compose logs
````
