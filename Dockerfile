# Production Nginx container for Google Cloud Run (Port 8080)
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/m3-design-studio/browser /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
