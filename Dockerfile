FROM nginx:alpine

# Copy built static website files to Nginx web root directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
USER nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q --spider http://127.0.0.1/ || exit 1
# Nginx starts automatically in the foreground
CMD ["nginx", "-g", "daemon off;"]
