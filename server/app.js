const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000

const cors = require('cors')

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

dotenv.config();
app.use(express.json());

const mongoose = require("mongoose");
const url = process.env.MONGO;
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("MongoDB Connected"))
    .catch((err) => {
        console.log("Falied To Connect", err);
    });

app.use("/api/auth/", require("./routes/AuthRoute.js"));
app.use("/api/notice/", require("./routes/NoticeRoute"));
app.listen(port, () => console.log("server is Running ", port));
