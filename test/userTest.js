import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


// configuration of chai

chai.should();
chai.use(chaiHttp);

// test Signup

describe('User test', () => {

    //======================== get users ======================
    it('should be able to display all the users', (done) => {
                    chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(200);
                });
            done();
    });

    // ====================== SIGN UP =====================

        it('should be able to sign up', (done) => {
            const newUser = {
                id: 1,
                email: 'kagororamayim@gmail.com',
                first_Name: 'kagorora',
                last_Name: 'Maxime',
                password: '12345678',
                phoneNumber: '0782299719',
                address: 'Kigali',
                is_admin: false
            }
    
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(201);
                    res.body.data.should.have.property('userEmail');
                    res.body.data.should.have.property('userFirstN');
                    res.body.data.should.have.property('lastN');
                    res.body.data.should.have.property('userphoneNumber');
                    res.body.data.should.have.property('userAddress');
                    res.body.data.should.have.property('useris_admin');
                });
            done();
        });
    
        it('should not able to sign up if fields not filled', (done) => {
            const newUser = {
                id: 1,
                first_Name: 'kagorora',
                last_Name: 'Maxime',
                password: '12345678',
                phoneNumber: '0782299719',
                address: 'Kigali',
                is_admin: false
            }
    
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(400);
                    res.body.error.should.be.a('string');
                });
            done();
        });
    
        it('should not able to sign up if fields not filled', (done) => {
            const newUser = {
                id: 1,
                first_Name: 'kagorora',
                last_Name: 'Maxime',
                password: '12345678',
                phoneNumber: '0782299719',
                address: 'Kigali',
                is_admin: false
            }
    
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(400);
                    res.body.error.should.be.a('string');
                });
            done();
        });

    // ============================= LOGIN ==========================

    it('should be able to Login', (done) => {
        const newUser = {
            email: 'kagororamaxime@gmail.com',
            password: '12345678',
        }
        chai.request(server)
            .post('/api/v1/auth/signin')
            .send(newUser)
            .end((err, res) => {
                res.body.status.should.be.equal(200);
                res.body.should.be.an('object');
            });
        done();
    });

    it('incorect password should not be able to Login ', (done) => {
        const newUser = {
            email: 'kagororamaxime@gmail.com',
            password: '12345671',
        }
        chai.request(server)
            .post('/api/v1/auth/signin')
            .send(newUser)
            .end((err, res) => {
                res.body.status.should.be.equal(400);
                res.body.should.be.an('object');
            });
        done();
    });

    it('Email not found should not be able to Login ', (done) => {
        const newUser = {
            email: 'kagororamaxime1@gmail.com',
            password: '12345671',
        }
        chai.request(server)
            .post('/api/v1/auth/signin')
            .send(newUser)
            .end((err, res) => {
                res.body.status.should.be.equal(404);
                res.body.should.be.an('object');
            });
        done();
    });

})




