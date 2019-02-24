FROM nginx

COPY index.html cards.json /usr/share/nginx/html/
COPY ./assets/ /usr/share/nginx/html/assets/
