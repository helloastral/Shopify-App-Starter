FROM node:18-alpine

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE ${PORT}
WORKDIR /app
COPY . .
RUN yarn install
RUN cd client && yarn && yarn build
RUN cd server && yarn && yarn build
CMD ["node", "server/dist/main"]