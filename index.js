const express = require('express');
const fs = require('fs').promises;
const accountsRouter = require('./routes/grades.js');
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/doc.js');

//swagger

//import swaggerUi from "swagger-ui-express";
//import { swaggerDocument } from "./docs/doc.js"
//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//no arquivo
//export const swaggerDocument = {
//module.exports = swaggerDocument;

const app = express();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

global.fileName = './data/grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "./logs/grades-control-api.log" })
    ],
    format: combine(
        label({ label: "grades-control-api" }),
        timestamp(),
        myFormat
    )
});

app.use(express.json());

app.use('/grades', accountsRouter);

app.listen(3000, async () => {
    try {
        await fs.readFile(global.fileName, 'utf8');
        logger.info('API started!');
    } catch (err) {
        logger.error(err);
    }
});