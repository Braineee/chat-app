
/*const rp = require('request-promise');
const moment = require('moment');

// Initialize africa'sTalking SMS API. for more info: https://africastalking.com/sms
const africasTalking = require('./../config/sms.json')[env];

// Init credentials
const username = africasTalking.username;
const apiKey = africasTalking.apiKey;

// Init SMS object
const SMS = {};

// SEND A MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. Message
 *
SMS.Send = (recipient, message) => {
    // Init message options
    var options = {
        url: `https://api.africastalking.com/restless/send?username=${username}&Apikey=${apiKey}&to=${recipient}&message=${message}`,
        method: 'GET',
        json: true,
        body: {}
    };

    // Send SMS
    rp(options).then(function(result){
        console.log("SMS Sent", result);
        return result;
    }).caught(function(err){
        console.log("SMS Failed", err);
        return false;
    });
}

// SEND VERIFICATION MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. token
 *
SMS.SendVerificationToken = (recipient, token) => {
    // Create the message
    let message = `Your verification code is ${token}. Enter this code in the chat verification`;

    // Call on the Send message function to send message
    return this.Send(recipient, message);
}*/

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

// SEND A MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. Message
 */
SMS.Send = (recipient, message) => {
    sms.send({
        to: recipient,
        from: 26519,
        message: message,
    })
    .then(function(response) {
        console.log("Nonsense Success");
        console.log('Message Sent!');
        console.log('');
    })
    .catch(function(error) {
        console.log("Nonsense failue");
        console.log('Message Failed!');
        console.log('');
    });
}

// SEND VERIFICATION MESSAGE
/**
 * Requires the following
 * 1. Recipient
 * 2. token
 */
SMS.SendVerificationToken = (recipient, token) => {
    console.log(recipient);
    console.log(token);
    // Create the message
    let message = `Your verification code is ${token}. Enter this code in the chat verification`;

    // Call on the Send message function to send message
    return this.Send(recipient, message);
}

// Export SMS module
module.exports = SMS;