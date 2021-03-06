import { Segment, Header, Button, Icon } from "semantic-ui-react"


function CartItemList() {
  const user = false

  return (
    <Segment
      secondary
      color="teal"
      inverted
      textAlign="center"
    >
    <Header icon>
      <Icon name="shopping basket"/>
      No products in your cart. Add a product
    </Header>
    <div>
      {user ? 
      <Button color="orange">View Products</Button> 
      :
      <Button color="blue">Login to add products</Button>
    }
    </div>
    </Segment>
  )
}

export default CartItemList;
