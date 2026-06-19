const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();
app.use(express.json());
weatherRoute =require('./routes/WeatherRoute')
app.use('/api', weatherRoute);
const port =process.env.PORT ;
app.listen(3000, () => console.log(`server running on port:${port}`));
