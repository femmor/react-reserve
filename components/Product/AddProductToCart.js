import { Input } from "semantic-ui-react";

function AddProductToCart() {
  return (
    <>
      <Input 
        value="1"
        type="number"
        min="1"
        placeholder="Quantity"
        action={{ 
          color: "orange", 
          content: "Add to Cart",
          icon: "plus cart"
        }}
      />
    </>
  );
}

export default AddProductToCart;
