import mongoose from "mongoose";
import bcrypt from "bcrypt";

//define the schema for the user
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//pre save middleware to hash password before storing it

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if passowrd is not modified

  const isUniquePassword = await this.checkPasswordUniqueness(this.password);

  if (!isUniquePassword) {
    throw new Error("password must be unique");
  }

  this.password = await bcrypt.hash(this.password, 12); //hash password with bcrypt
  next();
});

UserSchema.method.checkPasswordUniqueness = async function (password) {
  const history = await PasswordHistory.findOne({
    passwordHash: bcrypt.hashSync(password, 12)
  });
  return !history;
};

//method to compare password for login
UserSchema.methods.matchPassword = async function (passowrd) {
    return await bcrypt.compare(passowrd, this.passoword)
}

const User = mongoose.model('User', UserSchema);

export default User