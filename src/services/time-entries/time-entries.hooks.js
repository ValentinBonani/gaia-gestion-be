const populate = require('feathers-populate-hook');
var moment = require('moment');

const populateProject = populate({
  project: { // Destination key
    service: 'projects', // Foreign service
    f_key: 'id',  // Foreign key
    one: true // Optional, if only one resolve object is wanted
  }
});

const checkMonth = function (context) {
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  let array = []
  let totalTime = 0;

  if (context.params.headers.start) {
    context.result = context.result.filter(timeEntry => {
      return moment(timeEntry.date).isSameOrAfter(moment(context.params.headers.start).subtract(1,'day')) && moment(timeEntry.date).isSameOrBefore(context.params.headers.end)
    }).sort(function (a, b) {
      return moment(b.date) -  moment(a.date);
    });
  }
  if (context.params.query.project) {
    context.result.forEach(timeEntry => {
      totalTime += timeEntry.totalTime
    });
    const response = {
      projectId: context.result[0].project._id,
      projectName: context.result[0].project.name,
      totalTime: totalTime
    }
    context.result = response;

  }
}


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    // all: [ (context) => {
    //   context.result.data.forEach(data => {
    //     data.project = 2;
    //   });
    // }],
    all: [populateProject],
    find: [checkMonth],
    // find: [populateProject],
    get: [checkMonth],
    create: [populateProject],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

