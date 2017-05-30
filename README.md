# Semsari-Api

## Install

Semsari-Apiruns on Docker containers. That means that you'll have to install the docker engine

[https://docs.docker.com/installation/](https://docs.docker.com/installation/)

## Docker Hub

After having docker installed and running (tested with `docker run hello-world`) you'll need an account on docker hub to be able to pull our container, since it is private.
Go to [https://hub.docker.com/](https://hub.docker.com/) and create your account and talk with the team leader to get your access granted.
To register or log in to a Docker registry server type

```
docker login
```

## Application

### Prepare

1. Clone the Semsari Api repository:
```
git clone git@github.com:semsari/frontend.git && \
cd frontend
```

> A Vue.js project

### Start application
```docker run -it --name semsari-frontend -p 80:80 -v $(pwd):/opt/app semsari/frontend:develop``` 

#### Build Setup (For self-development purposes only)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
