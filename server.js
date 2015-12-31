var mongoose = require('mongoose');
var secrets = require('./secrets.json');
var JobRunner = require('./business/job-runner.js');

mongoose.connect(secrets.mongo.url, function (error, db) {

    console.log('connected to the database');

    var CronJob = require('cron').CronJob;
    var job = new CronJob('10 * * * * *', function () {

            var runners = [
                new JobRunner("pittsburgh", "lbg", "pools"),
                new JobRunner("pittsburgh", "sss", "pools"),
                new JobRunner("pittsburgh", "sss", "swimming pools"),
                new JobRunner("pittsburgh", "lbg", "spa")
            ];

            runners.forEach(function (runner) {
               runner.start();
            });

        }, function () {
            console.log('job completed!');
        },
        true,
        'America/Los_Angeles'
    );

    job.start();

    if (error) {
        console.log(error);
    }

});