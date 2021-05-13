const router = require("express").Router();
const controllers = require("../controllers/controllersItem")
const upload = require("../config/multerConfig")

router.get("/allitems", controllers.allItems);
router.post("/additem",  upload.single("image"), controllers.addItem);
router.get("/getitem/:id", controllers.getItem);
router.put("/updateitem/:id", controllers.updateItem);
router.delete("/deleteitem/:id", controllers.deleteItem);


module.exports = router;