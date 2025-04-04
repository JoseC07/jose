# Use official Node.js image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Use nginx to serve the app
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Add backend service
FROM node:18-alpine as backend
WORKDIR /app
COPY server/package*.json ./server/
RUN npm install --prefix server
COPY server ./server
EXPOSE 3001
CMD ["node", "server/index.js"] 