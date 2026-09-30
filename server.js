const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Latest RideSafe data
let latestData = {
    helmet: 0,
    alcohol: 0,
    lock: 1,
    latitude: 0,
    longitude: 0,
    updatedAt: null
};

// Test route
app.get("/", (req, res) => {
    res.json({
        status: "RideSafe API is running"
    });
});

// Arduino sends data here
app.post("/api/ridesafe", (req, res) => {

    const {
        helmet,
        alcohol,
        lock,
        latitude,
        longitude
    } = req.body;

    latestData = {
        helmet,
        alcohol,
        lock,
        latitude,
        longitude,
        updatedAt: new Date().toISOString()
    };

    console.log("RideSafe data received:", latestData);

    res.json({
        success: true,
        data: latestData
    });
});

// Browser/mobile app gets latest data here
app.get("/api/ridesafe", (req, res) => {
    res.json(latestData);
});

app.listen(PORT, () => {
    console.log(`RideSafe API running on port ${PORT}`);
});