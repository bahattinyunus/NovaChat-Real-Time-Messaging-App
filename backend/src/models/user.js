import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
