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
    describe('loadWiki', function() {
        this.timeout(5000);
        it("load Abraham Lincoln's page", function(done) {
            tools.loadWiki({ first: "Abraham", second: "Lincoln" }, function(html) {
                expect(html).to.be.ok;
                done();
            })
        });
    })
})

