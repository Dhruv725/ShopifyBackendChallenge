const mongoose = require("mongoose");
const Inventory = mongoose.model("Inventory");

const addInventory = async (req, res) => {
  //Checking Null Condition
  const { Name, Price, Quantity, Description } = req.body;
  if (!Name || !Price || !Quantity || !Description) {
    return res.status(422).json({ error: "please add all the fields" });
  } else {
    //Save New Record
    const inv = new Inventory({
      productName: Name,
      productPrice: Price,
      productQuantity: Quantity,
      productDescription: Description,
      isDeleted: false,
      deleteComment: "",
    });
    inv.save().then((inv) => {
      return res.json({ message: "saved successfully", inventory: inv });
    });
  }
};

//Method to View List of all Inventory Items
const viewInventory = async (req, res) => {
  Inventory.find()
    .then((inventoryRecord) => {
      return res
        .status(200)
        .json({ success: true, Inventory: inventoryRecord });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ success: false, message: "Empty Inventory" });
    });
};

//Method to update Inventory Items
const updateInventory = async (req, res) => {
  const { Name, Price, Quantity, Description } = req.body;
  const { id } = req.params;
  if (!Name || !Price || !Quantity || !Description) {
    return res.status(422).json({ error: "please add all the fields" });
  } else if (!id) {
    return res.status(422).json({ error: "ID not passed" });
  } else {
    Inventory.findByIdAndUpdate(
      { _id: id },
      {
        productName: Name,
        productPrice: Price,
        productQuantity: Quantity,
        productDescription: Description,
      }
    ).then((inv) => {
      res.json({ message: "Updated Sucessfully!!" });
    });
  }
};

//Method to Delete Particular Inventory Record
const deleteInventory = async (req, res) => {
  const { id, comment, isDisable } = req.body;
  Inventory.findOneAndUpdate(
    id,
    { $set: { isDeleted: isDisable, deleteComment: comment } },
    function (err, docs) {
      if (err) {
        console.log("Err: ", err);
      } else {
        return res.status(200).json({ success: true });
      }
    }
  );
};

module.exports = {
  addInventory,
  updateInventory,
  deleteInventory,
  viewInventory,
};
