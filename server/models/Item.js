const { model, Schema } = require("mongoose");

const ItemSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    image_id: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Item = model("Item", ItemSchema);
module.exports = Item;
