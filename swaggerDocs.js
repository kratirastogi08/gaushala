const router = require('express').Router();
const path = require('path');
const yamljs = require('yamljs');

const swaggerUi = require('swagger-ui-express');
const config = require('./app/config')

const swaggerDocument = yamljs.load(path.resolve(`${__dirname}/swagger.yaml`))
//swaggerDocument.host = `${config.APP_URL}:${config.port}`;
router.get('/docs.json', (req, res) => res.send(swaggerDocument))
router.use('/docs', swaggerUi.serve, (req, res) => res.send(swaggerUi.generateHTML(swaggerDocument)));

module.exports = router;
