#!/bin/bash

docker-compose -f docker_rabbitmq.yml up -d 
sleep 12
docker-compose up -d