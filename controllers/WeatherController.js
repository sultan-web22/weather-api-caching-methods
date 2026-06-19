const axios = require('axios');
const VISUAL_CROSSING_BASE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
const myapi = process.env.API_KEY
const formatdate =(date)=>date.toISOString().split('T')[0]; //function to change date to isos
const Weatherfunction =async(req,res)=>{
   try{ const {location,StartDate,EndDate}=req.params
    if(!location){
       res.status(400).json({error: "can not start without intial city"})
    }
    let datepath=''
    if(StartDate&&EndDate){
        datepath=`/${StartDate}/${EndDate}`
    }
    else if(days) {
    const targetdays = parseInt(days,10) 
    const start = new Date() ;
    const end = new Date();
    start.setDate(end.getDate()-targetdays);
    datePath = `/${formatDate(startDate)}/${formatDate(endDate)}`;
    }else{
    const start = new Date() ;
    const end = new Date();
    start.setDate(end.getDate()-15);
     datePath = `/${formatDate(startDate)}/${formatDate(endDate)}`;
    } 
    const targetUrl = `${VISUAL_CROSSING_BASE}/${encodeURIComponent(location)}${datePath}?key=${API_KEY}`;
    const response = await axios.get(targetUrl);
    return res.json(response.data);}
    catch (error) {
        console.error("API Error:", error.message);
       return res.status(500).json({ error: "Failed to fetch weather data summary." });
    }
} 
module.exports= {Weatherfunction}