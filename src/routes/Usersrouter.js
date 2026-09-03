import express from "express";
import Users from "../models/Usersschema.js";
const router=express.Router();
router.get("/getallusers",async(req,res)=>{
   try {
     const users= await Users.find()
     if(!users){
           return res.status(404).json({message:"aucun utilisateur"})
     }
     res.status(200).json({message:"users found successfully",users})
   } catch (error) {
       console.error(error)
    res.status(500).json({message:"server error",error:error.message})
   }
})
export default router ;