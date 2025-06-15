# Node image
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy code files
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
# CMD ["npm", "run", "dev"]
CMD ["npx", "next", "dev", "-H", "0.0.0.0", "-p", "3000"]
