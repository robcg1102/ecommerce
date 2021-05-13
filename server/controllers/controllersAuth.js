const User = require("../models/User");

const controllers = {
  signup: async (req, res) => {
    const user = await User.register({ ...req.body }, req.body.password).catch(
      (err) => {
        return res.status(500).json({ err });
      }
    );
    return res.status(201).json({ user });
  },

  login: (req, res) => {
    res.status(200).json({ user: req.user });
  },

  getUser: async (req, res, next) => {
    if (req.user) {
      const user = await User.findById(req.user._id)
        .populate({
          path: "cart.itemCart",
          model: "Item",
        })
        .catch((err) => {
          return res.status(500).json({ err });
        });

      return res.status(200).json({ user });
    }
    return res.status(500).json({ message: "You need to be logged" });
  },

  addItemCart: (req, res) => {
    const { id } = req.params;
    const { iditem, count } = req.body;
    User.findById(id).then((result) => {
      User.findByIdAndUpdate(
        id,
        { cart: [...result.cart, { itemCart: iditem, count: count }] },
        { new: true }
      ).then((newItem) => {
        return res.json({ newItem });
      });
    });
  },

  addPurchase: (req, res) => {
    const { id } = req.params;
    const { total, items } = req.body;
    User.findById(id).then((result) => {
      const datePurchase = Date.now();
      User.findByIdAndUpdate(
        id,
        {
          purchases: [
            ...result.purchases,
            { items: items, total: total, date: datePurchase },
          ],
          cart: [],
        },
        { new: true }
      )
        .then((newItem) => {
          return res.json({ newItem });
        })
        .catch((error) => {
          return res.json({ error });
        });
    });
  },

  deleteItemCart: (req, res) => {
    User.updateOne(
      { _id: req.params.id },
      {
        $pull: { cart: { _id: req.params.itemid } },
      }
    ).then((result) => {
      res.json({ result });
    });
  },

  updateCountItemCart: (req, res) => {
    const { count } = req.body;

    User.updateOne(
      { _id: req.params.id, cart: {$elemMatch: {_id: req.params.itemid}} },
      { $set: {"cart.$.count": count} } 
    ).then((result) => {
      res.json({ result });
    });
  },

  logout: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.clearCookie("connect.sid");
      return res.status(200).json({ msg: "Logged Out" });
    }
    return res.status(200).json({ msg: "You are not in" });
  },
};

module.exports = controllers;
