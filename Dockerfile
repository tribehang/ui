FROM node:argon

# Update NPM
RUN npm --user root --unsafe-perm true install npm -g

ADD package.json /tmp/package.json

RUN npm install

WORKDIR /opt/app

ADD . /opt/app/

EXPOSE 80 443

CMD ["/bin/bash", "docker/run.sh"]