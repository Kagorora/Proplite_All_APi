import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();


describe('Property test', () => {


    // ====================== POST PRODUCT =====================
    it('should be able to post product', (done) => {
        const newProperty = {
            id: 10,
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

        const newProperty = {
            type: '5 bedRoom'
        }

        chai.request(server)
            .get('/properties/find/')
            .send(newProperty)
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

    // ======================= Update Product ==================

    it('should be able to update property advert', (done) => {
        const newProduct = {
            price: '2200000000000000000000000000000',
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
});