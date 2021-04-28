import React from "react"
import axios from 'axios'

function Home({ products }) {
  console.log(products)
  // useEffect(() => {
  //   getProducts()
  // }, [])

  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(`${url}`)
  //   console.log(response.data)
  // }

  return <>home</>;
}

// getInitialProps
Home.getInitialProps = async () => {
  // fetch data on the server
  // return response data as an object
  // note: this object will be merged with existing props
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(`${url}`)
  return {
    products: response.data
  }
}

export default Home;
