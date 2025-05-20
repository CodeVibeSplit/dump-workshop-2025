# Workshop Cheat Sheet

## Frontend

### Install dependencies + run frontend
```bash
npm install

npm run dev

```
## Backend
### Package app + run Java app from JAR file

```bash
./gradlew bootJar --no-daemon

java -jar app.jar

```

##  Useful commands
 sh -c --> run string after this as a command inside a shell
 cp --> copy <source> <destination>
 
## Dockerfile Essentials

### Inheritace
```dockerfile
FROM ruby:2.2.2
```

### Variables
```dockerfile
ENV APP_HOME /myapp
RUN mkdir $APP_HOME
```

### Initialization
```dockerfile
RUN bundle install
WORKDIR /myapp
VOLUME ["/data"]
ADD file.xyz /file.xyz
COPY --chown=user:group host_file.xyz /path/container_file.xyz
```

### Commands 
```dockerfile
EXPOSE 5900
CMD ["bundle", "exec", "rails", "server"]
ENTRYPOINT ["executable", "param1", "param2"]
```

### List of all commands 
```dockerfile
ADD	Add local or remote files and directories. (ex. ADD ./app.tar.gz /app/)
ARG	Use build-time variables. (ex. ARG VERSION=1.0.0)
CMD	Specify default commands.  (ex. CMD ["npm", "run", "dev"])
COPY	Copy files and directories. (ex. COPY ./src /app/src)
ENTRYPOINT	Specify default executable.  (ex. ENTRYPOINT ["npm", "run", "dev"])
ENV	Set environment variables. (ex. ENV NODE_ENV=production)
EXPOSE	Describe which ports your application is listening on. (ex. EXPOSE 3000)
FROM	Create a new build stage from a base image. (ex. FROM node:20-alpine)
HEALTHCHECK	Check a containers health on startup.  (ex. HEALTHCHECK CMD curl -f http://localhost/health)
LABEL	Add metadata to an image.  (ex. LABEL maintainer="you@example.com")
MAINTAINER	Specify the author of an image.  (ex. MAINTAINER Jane Doe <jane@example.com>)
ONBUILD	Specify instructions for when the image is used in a build.  (ex. ONBUILD COPY . /app)
RUN	Execute build commands. (ex. RUN npm install)
SHELL	Set the default shell of an image. (ex. SHELL ["/bin/bash", "-c"])
STOPSIGNAL	Specify the system call signal for exiting a container. (ex. STOPSIGNAL SIGTERM)
USER	Set user and group ID. (ex. USER node)
VOLUME	Create volume mounts. (ex. VOLUME /data)
WORKDIR	Change working directory.  (ex. WORKDIR /app)
```