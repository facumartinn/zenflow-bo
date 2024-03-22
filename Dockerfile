# Usar la imagen oficial de Node.js como imagen base
FROM node:18.17

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de paquete al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente del proyecto al directorio de trabajo
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
