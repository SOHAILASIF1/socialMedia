import mongoose from 'mongoose'
const DBConnection= async ()=>{
    const MONGODB_URI=process.env.MONGODB_URI
    try {
        await mongoose.connect(MONGODB_URI,{ useNewUrlParser:true})
        console.log("db connect");

        
    } catch (error) {
        console.log(error.message);
        
    }

}
export default DBConnection