FROM node:12
WORKDIR /app
COPY package*.json yarn.lock ./
RUN [ "/bin/bash", "-c", "yarn install"]
ENV PATH /usr/node_modules/.bin:$PATH
COPY . .
RUN ["yarn", "build"]

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]