const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const expressConfig = require("./config/expressConfig.js");
const routes = require("./routes.js");
const { PORT } = require("./constants.js");
const databaseConnect = require("./config/databaseConfig.js");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware.js");

// local variables
const app = express();

// app configs
handlebarsConfig(app);
expressConfig(app);
app.use(cookieParser());

// middlewares
// IMPORTANT auth middleware must be after cookie-parser 
app.use(auth);

// connect to db
databaseConnect()
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log("Error", err));

// routing
app.use(routes);

app.listen(PORT, console.log(`Server is listening at port ${PORT}`));
