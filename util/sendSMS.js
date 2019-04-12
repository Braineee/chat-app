const env = process.env.NODE_ENV || 'development';
const rp = require('request-promise');
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
 */
SMS.Send = function(recipient, message){
    var options = {
        url: `https://api.africastalking.com/restless/send?username=${username}&Apikey=${apiKey}&to=${recipient}&message=${message}`,
        method: 'GET',
        json: true,
        body: {}
    };

    rp(options).then(function(result){
        console.log("SMS Sent", result);
        return result;
    }).caught(function(err){
        console.log("SMS Failed", err);
        return false;
    });
}