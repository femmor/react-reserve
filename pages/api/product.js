import connectDb from "../../utils/connectDb"
import Product from "../../models/Product"

connectDb()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break;

    case 'POST':
      await handlePostRequest(req, res)
      break;

    case 'DELETE':
      await handleDeleteRequest(req, res)
      break;
  
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
      break;
  }
}

// Get single product
async function handleGetRequest(req, res) {
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  res.status(200).json(product)
}

// Post product
async function handlePostRequest(req, res) {
  const {name, price, mediaUrl, description} = req.body
  if(!name || !price || !mediaUrl || !description){
    return res.status(422).send('Product missing one or more fields')
  } 
  const newProduct = await new Product({ name, price, mediaUrl, description }).save()

  res.status(201).json(newProduct)
}

// Delete single product
async function handleDeleteRequest(req, res) {
  const { _id } = req.query
  await Product.findOneAndDelete({ _id })
  res.status(204).json({})
}