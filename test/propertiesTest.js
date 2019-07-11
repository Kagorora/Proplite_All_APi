import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();


describe('Property test', () => {


    // ====================== POST PRODUCT =====================
    it('should be able to post product', (done) => {
        const newProperty = {
            owner: 'kagorora',
            status: 'sold',
            price: '25000',
            state: 'Rwanda',
            city: 'Kigali',
            address: 'KN100',
            type: '3B'
        }

        chai.request(server)
            .post('/api/v1/property/')
            .send(newProperty)
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(201);
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('owner');
                res.body.data.should.have.property('status');
                res.body.data.should.have.property('price');
                res.body.data.should.have.property('state');
                res.body.data.should.have.property('city');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('type');
            });
        done();
    });

        it('should not to post product if name has less than one character', (done) => {
        const newProperty = {
            owner: 'k',
            status: 'sold',
            price: '25000',
            state: 'Rwanda',
            city: 'Kigali',
            address: 'KN100',
            type: '3B'
        }

        chai.request(server)
            .post('/api/v1/property/')
            .send(newProperty)
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.equal('\"owner\" length must be at least 2 characters long');
            });
        done();
    });


        it('should not post product if all fields are not filled', (done) => {
        const newProperty = { 
            owner: 'n',
            status: 'sold',
            price: '25000',
            state: 'Rwanda',
            city: 'Kigali',
            address: 'KN100',
            type: '3B'
        }

        chai.request(server)
            .post('/api/v1/property/')
            .send(newProperty)
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.equal('\"owner\" length must be at least 2 characters long');
            });
        done();
    });


            it('should not post product if owner name is a number', (done) => {
        const newProperty = { 

    		owner: 1,
            status: 'sold',
            price: '25000',
            state: 'Rwanda',
            city: 'Kigali',
            address: 'KN100',
            type: '3B'
        }

        chai.request(server)
            .post('/api/v1/property/')
            .send(newProperty)
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.equal('\"owner\" must be a string');
            });
        done();
    });

    // ====================== GET ALL PROPERTIES =====================
    it('should be able to get all properties', (done) => {


        chai.request(server)
            .get('/api/v1/property/')
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(200);
            });
        done();
    });

    // ====================== DELETE =====================

    it('should be able to delete', (done) => {

        chai.request(server)
            .delete('/api/v1/property/1')
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(200);
            });
        done();
    });

    it('should be not able to delete when id not found', (done) => {


        chai.request(server)
            .delete('/api/v1/property/100')
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(404);
                res.body.error.should.be.equal('property not found');
            });
        done();
    });



    // ====================== GET ALL OFFERING THE SAME propertyType =====================
    it('should be able to get all properties offering the same propertyType', (done) => {

        chai.request(server)
            .get('/properties/find/?type=3B')
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(200);
            });
        done();
    });
    


        // ====================== GET ONE PROPERTY =====================
        it('should be able to get one property', (done) => {

            chai.request(server)
                .get('/api/v1/property/2')
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(200);
                });
            done();
        });

                it('should not be able to get one property', (done) => {

            chai.request(server)
                .get('/api/v1/property/10')
                .end((err, res) => {
                    res.body.should.be.an('object');
                    res.body.status.should.be.equal(404);
                    res.body.error.should.be.equal('property not found');
                });
            done();
        });

    // ======================= Update Product ==================

    it('should be able to update property advert', (done) => {
        const newProduct = {
            price: '2200000000000000',
            state: 'Burundi',
            type: '4 bedRoom'
        }

        chai.request(server)
            .put('/api/v1/property/2')
            .send(newProduct)
            .end((err, res) => {
                res.body.status.should.be.equal(200);
            });
            done();
    });

    // ========================== mark product status as sold
    it('should be able to mark product as sold', (done) => {

        chai.request(server)
            .put('/api/v1/property/2/sold')
            .end((err, res) => {
                res.body.status.should.be.equal(200);
                
            });
            done();
    });

        it('should not able to mark product as sold if alreay sold', (done) => {

        chai.request(server)
            .put('/api/v1/property/2/sold')
            .end((err, res) => {
                res.body.status.should.be.equal(400);
                
            });
            done();
    });
});