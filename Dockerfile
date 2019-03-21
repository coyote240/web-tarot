FROM nginx

COPY index.html cards.json worker.js /usr/share/nginx/html/
COPY ./assets/ /usr/share/nginx/html/assets/
