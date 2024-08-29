# Usa uma imagem base oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
