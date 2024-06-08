const express = require('express');
const logger = require('./logger');

const app = express();
const PUERTO = 8080;

app.get('/loggerTest', (req, res) => {
    logger.debug('Este es un mensaje de debug');
    logger.http('Este es un mensaje de http');
    logger.info('Este es un mensaje de info');
    logger.warn('Este es un mensaje de warning');
    logger.error('Este es un mensaje de error');
    logger.log('fatal', 'Este es un mensaje de fatal'); // Utiliza el método .log() para niveles personalizados
    res.send('Prueba de logs completada. Revisa la consola y el archivo de logs.');
});

app.listen(PUERTO, () => {
    logger.info(`Servidor escuchando en http://localhost:${PUERTO}`);
});

