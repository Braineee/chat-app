/**
 * verifyData function verifies incoming data for every request
 * 1. Ensure data is not empty
 * 2. Ensure data is not null
 */
const verifyData = async (req, res, next) => {
    const check = (error_ = false) => {
        // Loop through all data individually
        for(let property in req.body){
            if (!req.body[property] || req.body[property] === '' || req.body[property] === null || req.body[property] === undefined) {
                error_ = true;
                return res.json({success: false, message: 'Please provide all required data', responseType: 'empty_data'});
            }
        };

        // Call the next function
        moveToNext(error_);
    }
    
    // Move to next
    const moveToNext = (error_) => {
        if (!error_) {
            next();
        }
    }

    // Run check function
    check();
}

// Export the verifydata function
module.exports = verifyData;
