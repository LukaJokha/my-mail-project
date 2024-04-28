const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipients: [{ type: String, required: true }],
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
})

const Email = mongoose.model('Email', emailSchema)

module.exports = Email
