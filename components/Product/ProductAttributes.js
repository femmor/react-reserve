import { Button, Header } from "semantic-ui-react";

function ProductAttributes({ description }) {
  return (
    <>
      <Header as="h3">Product Description</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
      />
    </>
  );
}

export default ProductAttributes;
