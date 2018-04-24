var expect = require('chai').expect;
var tools = require('./lib/tools');

describe('Tools', function() {
    describe('printName', function() {
        it('it should print the last name first', function() {
            var results= tools.printName({ first: "Olga", last: "Stefani" });
            expect(results).to.equal('Stefani, Olga');
        });
    });
// asynchronous testing
    describe('loadWiki', function(done) {
        it("load Abraham Lincoln's page", function() {
            tools.loadWiki({ first: "Abraham", second: "Lincoln" }, function(html) {
                expect.to.be.ok;
                done();
            })
        });
    })
})

