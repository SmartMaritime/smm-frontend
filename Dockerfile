# FROM node:18
# WORKDIR /SMM_FRONTEND
# COPY package.json angular.json ./
# RUN npm install
# RUN npm install -g @angular/cli
# COPY . .
# CMD [ "ng","serve", "-o", "--host", "0.0.0.0" ]

# Étape 1 – Build Angular
FROM node:18 as builder
WORKDIR /app
COPY package.json angular.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Étape 2 – Serve avec NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/styles-rd/browser /usr/share/nginx/html
# Pour les routes Angular (si besoin)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
