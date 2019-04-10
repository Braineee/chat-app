'use strict';

// Require test packages
const mocha = require('mocha'); 
const chai = require('chai'); 
const chaiHttp = require('chai-http');

// Use chai http middleware
chai.use(chaiHttp);

// set expect handler
const expect = chai.expect;

// Require the user controller
const UserController = require('./UserController.test');

describe('UserController', () => {
    // Expect the user conroller to be an object
    it('UserController should be an object', () => {
        expect(UserController).to.be.object();
    });

    // User controller should have property create
    // User controller should have property update
})