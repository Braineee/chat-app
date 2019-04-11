'use strict';

// Require test packages
const mocha = require('mocha'); 
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('../../server');

// Use chai http middleware
chai.use(chaiHttp);

// set expect handler
const expect = chai.expect;

describe('AuthController', () => {
    const AuthController = require('../../controllers/AuthController');

    // Expect the AuthController to be an object
    it('AuthController should be an object', () => {
        expect(AuthController).to.be.a('object');
    });

    describe('AuthController.Register', () => {
        // Expect the AuthController.Registers conroller to be an function
        it('AuthController.Registers should be an function', () => {
            let Registers = AuthController.Register;
            expect(Registers).to.be.a('function');
        }); 

        /**
         * Requires then following
         * 1. firstName
         * 2. lastName
         * 3. email
         * 4. PhoneNo
         * 6. location
         * 5. password
         */
        it('AuthController.Register should create a new user', (done) => {
            request(app)
            .post('/auth/register/')
            .send({firstName: 'David', 
                    lastName: 'Daniel', 
                    PhoneNo: '12345678', 
                    email: 'alindavidsin@gmail.com', 
                    password: 'davidontop2014',
                    location: 'Nigeria'
            })
            .then((res, err) => {
                expect(err).to.be.null;
                const body = res.body;
                //console.log(body);
                expect(body).to.be.an('object');
                expect(body.success).to.be.true;
                expect(body.responseType).to.be.equal('successful');
            })   
        });
        
    });    
})