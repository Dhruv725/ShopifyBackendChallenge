import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log("params===", params);

  const [items, setItems] = useState({
    Name: "",
    Quantity: "",
    Price: "",
    Description: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItems({ ...items, [name]: value });
  };

  const updateInfo = () => {
    fetch(`http://ShopifyServer.dhruv725.repl.co/updateInventory/${params.id}`, {
      method: "put",
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
        navigate("/");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card cyan lighten-2">
            <div className="card-content black-text">
              <span className="card-title">Update Inventory</span>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Enter ProductName Here...."
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
                    placeholder="Enter ProductPrice Quantity...."
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
                    placeholder="Enter ProductPrice Here...."
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
                    placeholder="Description Here...."
                    id="productDescription"
                    type="textarea"
                    name="Description"
                    className="validate"
                    style={{ backgroundColor: "white" }}
                    value={items.Description}
                    onChange={changeHandler}
                  />
                  <label
                    style={{ color: "black", fontSize: "20px" }}
                    className="active"
                    htmlFor="productDescription"
                  >
                    Product Description:
                  </label>
                </div>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "20px",
                  }}
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={updateInfo}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
