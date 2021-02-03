const CronJob = require("cron").CronJob;

const scheduler = (scheduleFunction) => {
  const frequency = "*/10 * * * * *";
  // Schedule the cron job
  var job = new CronJob(
    // Every hour "0 * * * *"
    // Below is every 10 min
    frequency,
    scheduleFunction,

    // Executing on complete
    null,

    // Start when application launch
    true,
    "America/Los_Angeles"
  );

  job.start();
};

module.exports = scheduler;
