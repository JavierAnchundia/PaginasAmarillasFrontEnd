FROM node:18.18.2 as build
# RUN npm install -g -y @angular/cli@16.2.10
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod


FROM nginx:alpine

COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]