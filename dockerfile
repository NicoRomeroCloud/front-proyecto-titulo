FROM nginx:alpine
COPY ./dist/angular-ecommerce/ /usr/share/nginx/html

EXPOSE 80
