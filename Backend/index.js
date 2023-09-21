require("dotenv").config();

const app = require("./App/server");

//listen to the server
app.listen(process.env.PORT, () => console.log(process.env.APP_URL));
