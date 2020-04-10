// timeEntries-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const timeEntries = new Schema({
    comment: { type: String, required: false },
    date: { type: Date, required: true },
    totalTime: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' , required: true},
    project: { type: Schema.Types.ObjectId, ref: 'projects' , required: false}
  }, {
    timestamps: true
  });

  return mongooseClient.model('timeEntries', timeEntries);
};
