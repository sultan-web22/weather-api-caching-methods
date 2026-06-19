const { connect } = require('node:http2');
const {createclient} = require('redis') ;
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});
redisClient.on('error',(err)=>{
    console.error('redis connection error:',err)
});
redisClient.on('connect',()=>{
    console.log('redis running')
});
redisClient.connect();
module.exports = redisClient;

