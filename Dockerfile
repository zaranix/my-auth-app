# Use the official Node.js image
FROM node:22

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup
CMD [ "npm", "start" ]

