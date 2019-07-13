const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

/* Test the /GET route */
describe('app index route', () => {

  it('it should handle 404 error', (done) => {
    chai.request(app)
      .get('/notExist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should give message to call post API first GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        assert.equal(res.body.message,'please call Post API to insert the data');
        done();
      });
  });

  it('it should give error message  Loop Found in the data POST /', (done) => {
    chai.request(app)
      .post('/')
      .send({
        "Pete": "Nick",
        "Nick": "Pete"
        })
      .end((err, res) => {
        assert.equal(res.body.error,'Loop Found in the data');
         done();
      });
  });

  it('it should give error message  Supervisor name and employee name Cant be same POST /', (done) => {
    chai.request(app)
      .post('/')
      .send({
        "Pete": "Nick",
        "Nick": "Nick"
        })
      .end((err, res) => {
        assert.equal(res.body.error,'Supervisor name and employee name Cant be same');
         done();
      });
  });

  it('it should give status 200 and success message  POST /', (done) => {
    chai.request(app)
      .post('/')
      .send({
        "Pete": "Nick",
        "Barbara": "Nick",
        "Nick": "Sophie"
        })
      .end((err, res) => {
        res.should.have.status(200);
         done();
      });
  });
});
