import { useState } from "react";
import { Table } from "react-bootstrap";
import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router";

const InvetoryItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({
    Name: "",
    Quantity: "",
    Price: "",
    Description: "",
  });

  const [display, setDisplay] = useState(false);
  const [resinventory, setResInventory] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItems({ ...items, [name]: value });
  };
  const AddToInventory = () => {
    fetch("http://localhost:5001/addInventory", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: items.Name,
        Price: items.Price,
        Quantity: items.Quantity,
        Description: items.Description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  const displayInventory = () => {
    setDisplay(true);
    fetch("http://localhost:5001/displayInventory", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setResInventory(result.Inventory);
      });
  };

  const editRecord = (id) => {
    navigate(`/editForm/${id}`);
  };

  const deleteRecord = (id) => {
    navigate(`/delete/${id}`);
  };

  const undelete = (id) => {
    fetch("http://localhost:5001/delete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        comment: "",
        isDisable: false,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.reload();
      });
  };

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card cyan lighten-2">
          <div className="card-content black-text">
            <span
              className="card-title"
              style={{
                color: "darkred",
                display: "flex",
                justifyContent: "center",
                fontFamily: "sans-serif",
              }}
            >
              Inventory System For Garments
            </span>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Enter Product Name Here...."
                  id="productName"
                  name="Name"
                  type="text"
                  className="validate"
                  style={{ backgroundColor: "white" }}
                  value={items.Name}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Enter Product Quantity...."
                  id="productQuantity"
                  type="text"
                  name="Quantity"
                  className="validate"
                  style={{ backgroundColor: "white" }}
                  value={items.Quantity}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Enter Product Price Here...."
                  id="productPrice"
                  type="text"
                  name="Price"
                  className="validate"
                  style={{ backgroundColor: "white" }}
                  value={items.Price}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Product Description Here...."
                  id="productDescription"
                  type="textarea"
                  name="Description"
                  className="validate"
                  style={{ backgroundColor: "white", fontFamily: "sans-serif" }}
                  value={items.Description}
                  onChange={changeHandler}
                />
              
              </div>
              <ButtonGroup>
                <Button
                  style={{
                    backgroundColor: "darkolivegreen",
                    borderColor: "white",
                    color: "white",
                    marginLeft: "",
                    fontFamily: "sans-serif",
                  }}
                  type="submit"
                  onClick={AddToInventory}
                >
                  Add_To_Inventory
                </Button>

                <Button
                  style={{
                    backgroundColor: "darkgoldenrod",
                    borderColor: "white",
                    color: "white",
                    marginLeft: "",
                    fontSize: "10px",
                    fontFamily: "sans-serif",
                  }}
                  type="submit"
                  onClick={displayInventory}
                >
                  View Inventory
                </Button>
              </ButtonGroup>

              {display && (
                <div className="row">
                  <div className="col s12 m6">
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Product Quantity</th>
                          <th>Product Price</th>
                          <th>Product Description</th>
                        </tr>
                      </thead>
                      {resinventory.length > 0 &&
                        resinventory.map((items) => {
                          return (
                            <tbody>
                              <tr>
                                <td>{items._id}</td>
                                <td>{items.productName}</td>
                                <td>{items.productQuantity}</td>
                                <td>{items.productPrice}</td>
                                <td>{items.productDescription}</td>
                                <td>
                                  {" "}
                                  <ButtonGroup>
                                    <Button
                                      style={{
                                        backgroundColor: "green",
                                        borderColor: "white",
                                        color: "white",
                                        marginLeft: "",
                                      }}
                                      type="submit"
                                      onClick={() => {
                                        editRecord(items._id);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    {items.isDeleted ? (
                                      <Button
                                        style={{
                                          backgroundColor: "red",
                                          borderColor: "white",
                                          color: "white",
                                          marginLeft: "",
                                          fontSize: "10px",
                                        }}
                                        type="submit"
                                        onClick={() => {
                                          undelete(items._id);
                                        }}
                                      >
                                        UnDelete
                                      </Button>
                                    ) : (
                                      <Button
                                        style={{
                                          backgroundColor: "red",
                                          borderColor: "white",
                                          color: "white",
                                          marginLeft: "",
                                          fontSize: "10px",
                                        }}
                                        type="submit"
                                        onClick={() => {
                                          deleteRecord(items._id);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    )}
                                  </ButtonGroup>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvetoryItems;
