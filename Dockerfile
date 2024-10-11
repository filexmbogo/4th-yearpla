# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app runs on (e.g., 10000)
EXPOSE 10000

# Start the Node.js application
CMD ["npm", "start"]

# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Create the directory where MongoDB will store its data
VOLUME ["/data/db"]

# Start the MongoDB service when the container starts
CMD ["mongod"]

