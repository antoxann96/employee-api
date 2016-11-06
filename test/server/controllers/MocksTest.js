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

});