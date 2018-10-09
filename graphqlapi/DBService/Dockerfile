FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD admin
ENV MYSQL_DATABASE users
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD admin

ADD setup.sql /docker-entrypoint-initdb.d

EXPOSE 3306
