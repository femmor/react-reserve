import React, {useState, useEffect} from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react'
import baseUrl from "../utils/baseUrl"
import axios from 'axios'
import catchErrors from "../utils/catchErrors"

const INITIAL_PRODUCT = {
    name: '',
    price: '',
    media: '',
    description: ''
}

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el)) 
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  const handleChange = (e) => {
    const {name, value, files} = e.target
    // For media
    if (name === 'media') {
      setProduct((prevState) => ({
        ...prevState,
        media : files[0]
      }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [name] : value
      }))
    }
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'reactreserve')
    data.append('cloud_name', 'femmycodes')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      setError('')
      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const payload = { ...product, mediaUrl }
      await axios.post(url, payload)
      setProduct(INITIAL_PRODUCT)
      setSuccess(true)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange"/>
        Create new product
      </Header>
      <Form onSubmit={handleSubmit} success={success} error={Boolean(error)} loading={loading}>
        <Message
          error
          header="Oops!"
          content={error}
        />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted successfully!"
        />
        <Form.Group widths="equal">
          <Form.Field 
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            value={product.name}
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
            value={product.price}
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
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
          disabled={disabled || loading}
        />
      </Form>
    </>
  )
}

export default CreateProduct;
