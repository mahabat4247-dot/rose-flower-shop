FROM nginx:alpine

# Copy built static website files to Nginx web root directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Nginx starts automatically in the foreground
CMD ["nginx", "-g", "daemon off;"]
