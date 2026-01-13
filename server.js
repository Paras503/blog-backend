const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

dotenv.config();
connectDB();


const app = express()

app.use(express.json());

const userRoute = require("./routes/userRoute")

app.use("/api/v1/user", userRoute);

const blogRoute = require("./routes/blogRoute")

app.use("/api/v1/blogs", blogRoute)

app.get('/', (req, res) => {
    res.send("blog project on the making")
})

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})