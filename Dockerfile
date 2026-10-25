FROM nginxinc/nginx-unprivileged:alpine

# Copy built static website files to Nginx web root directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80 (Nginx unprivileged image listens on port 8080 by default for unprivileged binding)
EXPOSE 8080

# Starts Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
