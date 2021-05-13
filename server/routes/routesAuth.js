const router = require("express").Router();
const controllers = require("../controllers/controllersAuth");
const passport = require("passport");
//UPDATE
router.post("/signup", controllers.signup);
router.post("/login", passport.authenticate("local"), controllers.login);
router.get("/profile", controllers.getUser);
router.get("/logout", controllers.logout);
router.put("/additemcart/:id", controllers.addItemCart);
router.put("/addpurchase/:id", controllers.addPurchase);
router.delete("/deleteitemcart/:id/:itemid", controllers.deleteItemCart);
router.put("/updateitemcart/:id/:itemid", controllers.updateCountItemCart);

module.exports = router;
