/**
 * Utility object integrates any basic utility for creating an app
 */
// Instantiate utility object
const Utility = {}

// Create a four digit token
Utility.createFourDigitsToken = () => {
    var token = Math.floor(1000 + Math.random() * 9000);
    return token;
}

// Get a group id
Utility.getGroupID = (group) => {
    if (group == 'user') return 3;
    if (group == 'internal_staff') return 2;
    if (group == 'super_admin') return 1;
    return 0;
}


// Export the Utilities
module.exports = Utility;