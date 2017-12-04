FROM node:argon

ENV APP_ENV=development

# Update NPM
RUN npm --user root --unsafe-perm true install npm -g

ADD package.json /tmp/package.json

WORKDIR /opt/app

ADD . /opt/app/

EXPOSE 80 443

CMD ["/bin/bash", "docker/run.sh"]
