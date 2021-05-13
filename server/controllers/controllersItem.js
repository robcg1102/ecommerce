const Item = require("../models/Item");
const cloudinary = require("../config/cloudinaryConfig");

const controllers = {
  allItems: (req, res) => {
    Item.find()
      .sort({ createdAt: -1 })
      .then((items) => {
        res.json({ items });
      })
      .catch((err) => {
        res.json({ err });
      });
  },

  addItem: async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce",
      width: 250, height: 250, 
      gravity: "faces", 
      crop: "fill"
    });
    
    const { secure_url, public_id } = result;

    Item.create({ ...req.body, image: secure_url, image_id: public_id })
      .then((item) => {
        res.json({ item });
      })
      .catch((err) => {
        res.json({ err });
      });
  },

  getItem: (req, res)=>{
    Item.findById(req.params.id)
    .then(item=>{
      res.json({item})
    })
    .catch(err=>{
      res.json({err})
    })
  },

  updateItem: (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((item) => {
        res.json({ item });
      })
      .catch((err) => {
        res.json({ err });
      });
  },

  deleteItem: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(async (data) => {
        const { image_id } = data;
        await cloudinary.uploader.destroy(image_id);
        res.json({ status: "ItemDeleted" });
      })
      .catch((err) => {
        res.json({ err });
      });
  },
};

module.exports = controllers;
