import React, {useState} from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react'

function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    media: '',
    description: ''
  })

  const [mediaPreview, setMediaPreview] = useState('')

  const handleChange = (e) => {
    const {name, value, files} = e.target
    // For media
    if (name === 'media') {
      setProduct((...prevState) => ({
        ...prevState,
        media : files[0]
      }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((...prevState) => ({
        ...prevState,
        [name] : value
      }))
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange"/>
        Create new product
      </Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field 
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            name="media"
            label="Media"
            type="file"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  )
}

export default CreateProduct;
