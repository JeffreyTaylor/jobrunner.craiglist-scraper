module.exports = function (city, category, keyword) {

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

                    var identifier = '[ ' + category + '-' + city + '-' + keyword + ' ]';

                    if (error) {
                        console.log(identifier + ' encountered an error');
                        console.log(error);
                        return;
                    }

                    console.log(identifier + ' returned ' + listings.length + ' results');

                    repository.saveAll(listings, identifier);

                    resolve();
                });

            });

        }
    }
};