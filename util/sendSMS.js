const env = process.env.NODE_ENV || 'development';
const africasTalking = require('./../config/sms.json')[env];
const options = {
    apiKey: africasTalking.apiKey,         // use your sandbox app API key for development in the test environment
    username: africasTalking.username,      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = AfricasTalking.SMS

const SMS = {}

// For dev purpose
//console.log(africasTalking.username);
//console.log(africasTalking.apiKey);

// SEND A MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. Message
 */
SMS.Send = (recipient, message) => {
    console.log(recipient);
    console.log(message);
    sms.send({
        to: recipient,
        message: message,
    })
    .then(function(response) {
        console.log('Message Sent!');
        console.log(response);
    })
    .catch(function(error) {
        console.log('Message Failed!');
        console.log(error);
    });
}

// SEND VERIFICATION MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. token
 */
SMS.SendVerificationToken = (recipient, token) => {
   
    // Create the message
    let message = `Your verification code is ${token}. Enter this code in the chat verification`;

    // Call on the Send message function to send message
    return SMS.Send(recipient, message);
}

// Export SMS module
module.exports = SMS;