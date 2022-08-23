const { logger } = require('../logger/logger');

process.on("uncaughtException", (err) => {
    logger.error(err.message, err);
});

function handleErrors(error, req, res, next) {
    try {
        console.log('Ajeet');
        logger.error(error.message, error);
        res.json({ error: error.message || 'Something Went Wrong !!' });
    } catch (err) {
        next();
    }
}

module.exports = handleErrors;