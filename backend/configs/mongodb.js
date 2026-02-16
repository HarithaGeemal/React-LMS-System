import mongoose from "mongoose";

// connect to the mongoDB database
const connectDB = async ()=>{
    mongoose.connection.on('connected', () => {console.log('MongoDB is connected')});

    await mongoose.connect(`${process.env.MONGODB_URI}/skillora`);
}

export default connectDB