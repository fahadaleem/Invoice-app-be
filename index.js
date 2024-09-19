const database = require("./config/database");

var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const handleServerError = require("./middlewares/errorMiddleware");

const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productsRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

// Use the cors
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use the user routes
app.use("/api", customerRoutes, productRoutes, deliveryRoutes);

// handle server error
app.use(handleServerError);

// Start the server
app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});
