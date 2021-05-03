import connectDb from '../../utils/connectDb'
import User from "../../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDb()

export default async (req, res) => {
  const {email, password} = req.body
  try {
    // Check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select('+password')
    // --if not return an error
    if (!user) {
      return res.status(404).send(`Sorry we couldn't find a user with the email -  "${email}"`)
    }
    // Check to see if the user's password matches the one in the DB
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // If passwordsMatch generate a token
    if (passwordsMatch) {
      const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      // Send the token to the client
      res.status(200).json(token)
    } else {
      res.status(401).send('Passwords do not match!')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Error signing in user. Please try again later!")
  }
}