import mongoose from "mongoose";
//mongoose chef do rchestere y nathdem fleux mabin base de donnes mongodb et server exprees

const connectdb=async()=>{
    await mongoose.connect(process.env.url_mongodb);
    console.log("mongodb connected successfully");
}
export default connectdb;// ahem nokta na3mel export ll function hadhi bach njem nsta3melha da5el el sever