import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('User tests', () => {
  // ========================================== SIGNUP =========================
  it('should be able to signup', (done) => {
    const user = {
	    email: 'again@gmail.com',
        first_name: 'kagrora',
        last_name: 'Maxime',
        password: 'kagOlain32',
        phoneNumber: '0782299719',
        address: 'Kigali',
        is_admin: true
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('first-name');
        res.body.data.should.have.property('last-name');
        res.body.data.should.have.property('password');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('is_admin');
      });
    done();
  });
});

  