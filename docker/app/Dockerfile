FROM node:26-alpine

WORKDIR /app

# Install bash for consistency
RUN apk add --no-cache bash

# Pre-create node_modules and fix ownership
RUN mkdir -p node_modules && chown -R node:node /app

# Expose Metro bundler default port
EXPOSE 8081

# We run as node user
USER node

# We start expo server
CMD ["npx", "expo", "start", "--port", "8081"]
