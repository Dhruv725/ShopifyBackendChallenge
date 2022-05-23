import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const DeleteItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  const [comment, setComment] = useState("");

  const submit = () => {

    fetch("https://ShopifyServer.dhruv725.repl.co/delete", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        comment: comment,
        isDisable: true,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        
          console.log("==================== ",result);
          navigate("/");
        
      });
  };

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter deletion comment"
      />
      <button onClick={() => submit()}>Confirm</button>
    </div>
  );
};

export default DeleteItem;
