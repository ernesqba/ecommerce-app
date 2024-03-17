# Use the official Nginx image as the base image
FROM nginx:1.24-alpine3.17

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Add a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Copy the HTML files to the Nginx HTML directory
COPY ./views /usr/share/nginx/html

# Copy the JS files to the Nginx JS directory
COPY ./js /usr/share/nginx/js

# Expose the port Nginx is running on
EXPOSE 4000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]