import mongoose from "mongoose"

const connection = {}

async function connectDb(){
  if (connection.isConnected) {
    // Use existing db connection
    console.log('Using existing connection...')
    return;
  }
  // Use a new DB connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("DB is Connected")
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb