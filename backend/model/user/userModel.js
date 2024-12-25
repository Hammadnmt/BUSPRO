const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+92\d{10}$/, "Please fill a valid phone number"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error("Email already exists."));
    } else if (error.keyPattern.phone_number) {
      next(new Error("Phone number already exists."));
    } else {
      next(new Error("Duplicate field value found."));
    }
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
