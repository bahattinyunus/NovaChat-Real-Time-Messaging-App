import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: String, default: 'anon' },
  ts: { type: Date, default: () => new Date() }
}, { timestamps: true })

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
