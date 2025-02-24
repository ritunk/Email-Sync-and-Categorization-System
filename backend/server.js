const express = require("express");
const emailRoutes = require("./src/routes/emailRoutes");
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
app.use(express.json());

app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
