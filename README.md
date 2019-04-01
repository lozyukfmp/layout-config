# LaPS

run from root and ./client `npm i`  for install dependencies 

please check and edit: ./config/* ; ./client/src/environments/*

run from client `npm run build` or `ng build --prod`

install <https://www.mongodb.com/download-center/community> or copy zip `mongodb` MongoDB

if you downloaded zip: create folders C:\data\db or /data/db 

form \mongodb\bin run `mongod` - BD server

if your folder is in another place `mongod --dbpath=/whatever/data/path`

edit config.js- mongoUri: if you want use DB-services (mLab, MongoDB Atlas)

### develop server
run `node index` for start dev b-e server

## Prod Mode start/stop and settings

run `export NODE_ENV=prod`

run `export LPS_MONGO_URI=mongodb://10.106.5.10:27017/lps`

run `forever start index.js` for start detachable server

run `forever stop Id` for stop detachable server

run `forever list` for show forever processes

client : <http://10.106.5.10:7100>

user `admin@nc.com`  pass `1`



-------------------------------------------
### public api 

(get) <host:5000/api/p/layouts/:tentantId>

### configuration client - dev server

from client folder:
 
run once `npm i` for install dependencies 

run `npm run start` for compile and start client server

go to <http:localhost:4200> for layout configuration
