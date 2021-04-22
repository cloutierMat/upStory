# upStory
upStory is all about the journey! Just like in life, the concept of winning and losing is elusive.
It is all about attempts and failures! Every now and then there will be successes. They are part of the learning as well!
Enjoy your exploration of some of the Canadian Rockies climb.

## Requirements
- node
- colors
- express
- joi
- mongodb
- nodemon (to run in live environement)

It is important to have a mongodb running locally and listening to port 27017

## Running locally
To get the server running locally use the following commands in your terminal. It will deploy to http://localhost:3000 by default, unless your environment specifies a favorite port.

```bash
git clone https://github.com/cloutierMat/upStory.git
cd upStory
npm install
npm run loadDb
```
To run in node
```bash
npm start
```

## Possible issues and fixes
### **mongodb**

If your mongodb is listening to a different port:
* Open file /model/db.js
* Find the following line 
```javascript
 const dbUrl = 'mongodb://localhost:27017'
 ```
* Update the port number
