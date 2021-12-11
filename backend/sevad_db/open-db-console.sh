#!/bin/sh
docker exec -it sevad_db_mongo_1 \
  mongo -u admin -p fullstack --authenticationDatabase admin sevad
