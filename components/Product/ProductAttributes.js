import React, {useState} from 'react'
import { useRouter } from "next/router"
import baseUrl from '../../utils/baseUrl'
import { Button, Header, Modal } from "semantic-ui-react";
import axios from 'axios'

function ProductAttributes({ description, _id }) {
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const url = `${baseUrl}/api/product`
    const payload = { params: {_id} }
    await axios.delete(url, payload)
    router.push('/')
  }

  return (
    <>
      <Header as="h3">Product Description</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setModal(true)}
      />

      {/* Modal */}
      <Modal
        dimmer='blurring'
        open={modal}
      >
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setModal(false)}/>
          <Button negative content="Delete" icon="trash" onClick={handleDelete}/>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
