/* eslint-disable no-console */
// Initializes the `timeEntries` service on path `/time-entries`
const createService = require('feathers-mongoose');
const createModel = require('../../models/time-entries.model');
const hooks = require('./time-entries.hooks');
var moment = require('moment');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate: false
  };

  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
  const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
  
  const getActualEntries = function(req, res) {
    Model
      .find( { date: { $gte: startOfMonth, $lte: endOfMonth } , user: req.params.id }) // all
      .populate('user')
      .populate('project')
      .exec(function (err, entries) {
        if (err) return (err);
        res.send( entries );
      });
  };

  // Initialize our service with any options it requires
  app.use('/time-entries', createService(options));

  app.route('/actual-entries/:id').get(getActualEntries);

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entries');

  service.hooks(hooks);
};
