
const axios = require('axios');
const VISUAL_CROSSING_BASE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = process.env.API_KEY; 
const formatDate = (date) => date.toISOString().split('T')[0]; 
const Weatherfunction = async (req, res) => {
    try { 
        const { location, StartDate, EndDate } = req.query;
        
        // Extract the specific route parameter (assuming your route is like /weather/:days)
        const { days } = req.params; 

        if (!location) {
            return res.status(400).json({ error: "Cannot start without initial city" });
        }

        let dateSegment = '';

        if (StartDate && EndDate) {
            dateSegment = `${StartDate}/${EndDate}`;
        } else {
            const start = new Date();
            const end = new Date();
            
            // Check if days parameter exists and is a valid number string
            if (days && !isNaN(days)) {
                const targetdays = parseInt(days, 10);
                start.setDate(end.getDate() - targetdays);
            } else {
                // Default fallback if no valid params/queries are passed
                start.setDate(end.getDate() - 15);
            }
            dateSegment = `${formatDate(start)}/${formatDate(end)}`;
        }

       
        const fullApiPath = `${VISUAL_CROSSING_BASE}/${encodeURIComponent(location)}/${dateSegment}`;
        const targetUrl = new URL(fullApiPath);

        // 3. Append query parameters properly without manual string appending
        targetUrl.searchParams.set('key', API_KEY);
      

        // 4. Fire the network request using the safely built URL string
        const response = await axios.get(targetUrl.toString());
        return res.json(response.data);

    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to fetch weather data summary." });
    }
};

module.exports = { Weatherfunction };
