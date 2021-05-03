import connectDb from '../../utils/connectDb'
import User from "../../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDb()

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    // check to see if the user already exists in the DB
    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).send(`User with email ${email} already exists`)
    } 

    //  --if not, hash password
    const hashPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await new User({
      name,
      email,
      password: hashPassword
    }).save()
    console.log(newUser)

    // Create a token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    // Send back token
    res.status(201).json(token)

  } catch (error) {
    console.error(error)
    res.status(500).send("Error signing up user. Please try again later!")
  }
}