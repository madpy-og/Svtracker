import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, minLength: 5 },
    password: { type: String, required: true, minLength: 3 },
    profileImage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// ── Static Methods ─────────────────────────────────────────────

UserSchema.statics.findByIdSafe = function (id) {
  return this.findById(id).select("-password");
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

UserSchema.statics.createUser = function ({ fullname, email, password }) {
  return this.create({ fullname, email, password });
};

UserSchema.statics.updateProfileImg = function (id, url, publicId) {
  return this.findByIdAndUpdate(
    id,
    { profileImage: { url, publicId } },
    { returnDocument: "after", runValidators: true },
  );
};

export default mongoose.model("User", UserSchema);
