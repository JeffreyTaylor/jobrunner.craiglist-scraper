module.exports = function (city, category, keyword, name) {

    return {
        start: function () {

            delete require.cache[require.resolve('node-craigslist')];

            var craigslist = require('node-craigslist');
            var Repo = require('./../data/repository.js');
            var client = new craigslist({
                city: city
            });
            var options = {
                category: category
            };

            return new Promise(function (resolve, reject) {

                var repository = new Repo();

                return client.search(options, keyword, function (error, listings) {

                    if (error) {
                        console.log(error);
                        return;
                    }

                    var identifier = category + '-' + city;

                    console.log(identifier + ' returned ' + listings.length + ' results');

                    listings.forEach(function (listing) {
                        repository.save(listing, identifier);
                    });

                    resolve();
                });

            });

        }
    }
};