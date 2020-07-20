FROM node AS build
RUN mkdir /workspace
WORKDIR /workspace
COPY . /workspace
# COPY ./credentials/access.json  /access.json
RUN npm install
# RUN npm test
RUN npm run build

# Python is not included in alpine,
# which is needed to build bcrypt

FROM node:current-alpine
COPY --from=build /workspace /workspace
# COPY --from=build /access.json /access.json
# ENV GOOGLE_APPLICATION_CREDENTIALS = '/access.json'
WORKDIR /workspace
# RUN npm rebuild grpc
ENTRYPOINT ["node"]
CMD ["dist/index.js"]
