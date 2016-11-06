var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('twitstat MOCK tests', function () {
    var twitstat;
    var request;
    before(function () {
        request = sinon.stub();
        twitstat = proxyquire('../../../api/controllers/AdvertController.js', {'request': request});
    });

    it('should response with LOW popularity if url < 10', function (done) {

        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=some-url.com';
        var body = JSON.stringify({
            count: 9,
            url: "http://some-url.com/"
        });
        request.withArgs(expectedEndpoint).yields(null, null, body);

        twitstat.getPopularity('some-url.com', function (err, data) {
            expect(err).to.be.null;
            expect(data).to.equal(JSON.stringify({
                "url": "http://some-url.com/",
                "popularity": "LOW"
            }));
            done();
        });
    });
	
    it('should call the error callback when something went wrong', function(done) {
        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=idmb.com';
        var expectedError = new Error('Not found');
        request.withArgs(expectedEndpoint).yields(expectedError, null, null);

        twitstat.getPopularity('idmb.com', function(err, data) {
            expect(err).to.equal(expectedError);
            expect(data).to.be.null;
            done();
        });
    });

    it('should response with MEDIUM popularity if url sanded  25times', function (done) {
        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=blah.com';
        var body = JSON.stringify({
            count: 25,
            url: "http://blah.com/"
        });
        request.withArgs(expectedEndpoint).yields(null, null, body);

        twitstat.getPopularity('blah.com', function (err, data) {
            expect(err).to.be.null;
            expect(data).to.equal(JSON.stringify({
                "url": "http://blah.com/",
                "popularity": "MEDIUM"
            }));
            done();
        });
    });

    it('should response with HIGH popul if url sended 55 times', function (done) {
        var expectedEndpoint = 'http://urls.api.twitter.com/1/urls/count.json?url=other-url.com';
        var body = JSON.stringify({
            count: 55,
            url: "http://other-url.com/"
        });
        request.withArgs(expectedEndpoint).yields(null, null, body);

        twitstat.getPopularity('other-url.com', function (err, data) {
            expect(err).to.be.null;
            expect(data).to.equal(JSON.stringify({
                "url": "http://other-url.com/",
                "popularity": "HIGH"
            }));
            done();
        });
    });

});
