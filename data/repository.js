var Posting = require('./../models/posting.js');

module.exports = function () {

    return {
        save: function (listing, name) {

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
                    return false;
                }
                if (!listing) {

                    aPost.save(function (err) {
                        if (err) {
                            console.log(name + ' Error on save!' + err)
                        } else {
                            console.log(name + ' saved! ' + aPost.pid);
                        }
                        return true;

                    });
                } else {
                    console.log(name + ' ' + aPost.pid + ' already exists');
                    return true;
                }
            });
        }

    }
};