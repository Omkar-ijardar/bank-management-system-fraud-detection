# Dedicated Dockerfile for MySQL Database Service
FROM mysql:8.0

# Copy initial database schema and seed data into MySQL auto-init directory
COPY bankmanagementdb.sql /docker-entrypoint-initdb.d/bankmanagementdb.sql

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=bankmanagementdb

EXPOSE 3306
