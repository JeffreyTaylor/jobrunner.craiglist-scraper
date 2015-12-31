var mongoose = require('mongoose');
var secrets = require('./secrets.json');
var JobRunner = require('./business/job-runner.js');
var dateUtils = require('./date-utils.js');
var CronJob = require('cron').CronJob;

mongoose.connect(secrets.mongo.url, function (error, db) {

    console.log('connected to the database @ ' + dateUtils.now());

    var job = new CronJob(secrets.jobInterval, function () {

            console.log('starting jobs @ ' + dateUtils.now());

            var runners = [];

            secrets.jobs.forEach(function (job) {
                runners.push(new JobRunner(job[0], job[1], job[2]));
            });

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