const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    cart: [
      {
        itemCart: { type: Schema.Types.ObjectId, ref: "Item" },
        count: Number,
      },
    ],
    purchases: [
      {
        items: [String],
        total: Number,
        date: Date
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });
module.exports = model("User", userSchema);
