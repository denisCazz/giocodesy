# DESY STARS — static site on Node 22 Alpine
FROM node:22-alpine

WORKDIR /app

# Lightweight static file server
RUN npm install -g serve@14

COPY index.html styles.css app.js music.js ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["serve", "-s", ".", "-l", "3000"]
