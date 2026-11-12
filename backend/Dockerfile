FROM node:22-slim
WORKDIR /app

# Instalamos Python y los compiladores de C++ en Debian de forma limpia
RUN apt-get update && apt-get install -y python3 build-essential && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]