const redis =require('../redisconfig')
const cachemiddleware = (ttlSeconds =3600)=>{
    return async (req,res,next)=>{
        if(req.method!=='GET'){
            return next() ;
        }
    
}
const cachekey = `cache: ${req.originalUrl}`;
try{
 const cached = await redis.get(cachekey);
 if(cached){
    res.json(JSON.parse(cached))
 }
 const originalJson = res.json.bind(res);
 res.json =(body)=>{
    redis.setEx(cachekey,ttlSeconds,JSON.stringify(body)).catch(err=>console.err('cacheerror',err));
    return originalJson(body);
 };
  next();
}
catch (error){
console.error('redis middleware erorr:',err);
next();

} };
module.exports={cahchemiddleware}