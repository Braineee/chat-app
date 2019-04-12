// Error Handler function
require('dotenv').config();

/**
 * If development console log the error
 * if production send error messsage
 */
const errorHandler = (err, message_ = 'Unable to complete process', response_ = 'internal_error') => {
    process.env.NODE_ENV === 'development' ? console.log(err) : res.json({success: false, message: message_, responseType: response_});
}

module.exports = errorHandler;