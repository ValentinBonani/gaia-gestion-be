// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const projects = new Schema({
    name: { type: String, required: true },
    start: { type: Date, required: false },
    end: { type: Date, required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('projects', projects);
};
