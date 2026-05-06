import mongoose from "mongoose"; 


const connectdb = async ()=> {
  try {
    
     const connectionInstance =await mongoose.connect(`${process.env.MONGO_DB_CONNECT_URL}`)
    // console.log("connectionInstance")
     
  } catch (error) {
     console.log("Error occured during database connection :",error)
     process.exit(1);
  }
}

export default connectdb