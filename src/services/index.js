const timeEntries = require('./time-entries/time-entries.service.js');
const users = require('./users/users.service.js');
const projects = require('./projects/projects.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(timeEntries);
  app.configure(users);
  app.configure(projects);
};
