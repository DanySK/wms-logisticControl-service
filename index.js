const express = require('express');
const cors = require('cors');
const {connectDB} = require("./src/config/dbConnection");
const dotenv = require('dotenv');
const router = require('./src/routes/route')
/*
* Allow access from any subroute of http://localhost:3000
* */
const logisticControlServicePort = process.env.PORT || 4005;
let corsOptions = {
    origin: new RegExp(`http:\/\/wms-logistic:${logisticControlServicePort}\/.*`),
};
dotenv.config();
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-doc.json'); // Importa il file di documentazione Swagger JSON
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.disable("x-powered-by");
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(logisticControlServicePort, () => console.info(`WMS-logisticControl-service is running`));

connectDB(process.env.DB_NAME);

module.exports = { app };