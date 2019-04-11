'use strict';

// Require test packages
const mocha = require('mocha'); 
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const request = require('supertest')("http://localhost:5000/api");

// Use chai http middleware
chai.use(chaiHttp);

// set expect handler
const expect = chai.expect;

describe('UserController', () => {
    const UserController = require('../../controllers/UserController');

    // Expect the UserController to be an object
    it('UserController should be an object', () => {
        expect(UserController).to.be.a('object');
    });

    describe('Usercontroller.GetAllUser', () => {
        // Expect the UserController.GetAllUsers conroller to be an function
        it('UserController.GetAllUsers should be an function', () => {
            let getAllUsers = UserController.GetAllUsers;
            expect(getAllUsers).to.be.a('function');
        }); 
        
    });

    describe('Usercontroller.findOne', () => {
        // Expect the UserController.findOne conroller to be an function
        it('UserController.findOne should be an function', () => {
            let findOne = UserController.findOne;
            expect(findOne).to.be.a('function');
        }); 
        
    });
    
    
})