// Error Handler function
require('dotenv').config();

/**
 * If development console log the error
 * if production send error messsage
 */
const errorHandler = (res, err) => {
    process.env.NODE_ENV === 'development' ? console.log(err) : res.json({success: false, message: 'Could not complete process', responseType: 'internal_error'});
}

module.exports = errorHandler;