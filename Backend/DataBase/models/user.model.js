const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { type } = require("os");

// create user schema
const userSchema = new mongoose.Schema(
  {
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    booksIds: [
      {
        id: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    wishBooksIds: [
      {
        id: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// handle data for each user
userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};

// generate token for user each time he log in
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY);
  this.tokens.push({ token });
  await this.save();
  return token;
};

// handle log in process
userSchema.statics.logMe = async function (email, password) {
  try {
    const userData = await findOne({ email });
    if (!email) throw new Error("Invalid Email");
    const isValidPass = await bcrypt.compare(userData.password, password);
    if (!isValidPass) throw new Error("Invalid Password");
    return data;
  } catch (e) {
    throw e;
  }
};

// not encrypt passord again if not changed (only encrypt it in case of changing)
userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
});

// create usermodel
const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
