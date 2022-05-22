const express = require("express");
const router = express.Router();

const inventoryController = require("../Controller/inventoryOperations");

//Routers for different operations

router.post("/addInventory", inventoryController.addInventory);
router.get("/displayInventory", inventoryController.viewInventory);
router.put("/updateInventory/:id", inventoryController.updateInventory);
router.put("/delete", inventoryController.deleteInventory);

module.exports = router;
