var Posting = require('./../models/posting.js');

module.exports = function () {

    var _save = function (listing, name) {

        var aPost = new Posting({
            pid: listing.pid,
            category: listing.category,
            date: listing.date,
            location: listing.location,
            title: listing.title,
            url: listing.url,
            acknowledged: false
        });

        var query = Posting.where({pid: aPost.pid});
        query.findOne(function (err, listing) {
            if (err) {
                console.log(name + " MongoDB Error: " + err);
                return;
            }
            if (!listing) {

                aPost.save(function (err) {
                    if (err) {
                        console.log(name + ' Error on save!' + err)
                    } else {
                        console.log(name + ' saved! posting with pid of :' + aPost.pid);
                    }
                });
            }
            else {
                console.log(name + ' ' + aPost.pid + ' already exists');
            }
        });
    };

    return {
        save: function (listing, name) {
            return _save(listing, name);
        },

        saveAll: function (listings, name) {

            listings.forEach(function (listing) {

                if (listing.url.indexOf('.org//') > -1) {
                    console.log('skipping url "nearby" url of - ' + listing.url);
                    return;
                }
                _save(listing, name);
            });
        }

    }
};