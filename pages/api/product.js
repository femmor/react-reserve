import Product from "../../models/Product"

export default async (req, res) => {
  // Get single product
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  res.status(200).json(product)
}