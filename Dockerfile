#Dockerfile

# Use this image as the platform to build the app
FROM node:20-alpine3.17 AS external-website

# A small line inside the image to show who made it
LABEL Developers="Bora Acer"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY . .

# Clean install all node modules
RUN npm ci

# Build SvelteKit app
RUN npm run build

# Delete source code files that were used to build the app that are no longer needed
RUN rm -rf src/ static/ docker-compose.yml

RUN rm -rf Content
RUN rm databaseConfig.json
RUN rm vite.config.ts.timestamp-*

RUN echo '#!/bin/sh' > /app/startup.sh && \
    echo 'echo "{" >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "\"user\": \"$PGUSER\"," >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "\"host\": \"$PGHOST\"," >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "\"database\": \"$PGDATABASE\"," >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "\"password\": \"$PGPASSWORD\"," >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "\"port\": \"$PGPORT\"" >> /tmp/config.json' >> /app/startup.sh && \
    echo 'echo "}" >> /tmp/config.json' >> /app/startup.sh && \
    chmod +x /app/startup.sh
    
# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

# This is the command that will be run inside the image when you tell Docker to start the container

CMD ["/bin/sh", "-c", "/app/startup.sh && node build/index.js"]

EXPOSE 3000