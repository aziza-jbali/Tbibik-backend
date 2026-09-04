import express from "express";
import Users from "../models/Usersschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
// Register a new user
router.post("/register", async (req, res) => {
  const { nom, email, password, numero, role } = req.body;
  //     instead to writting  that const nom = req.body.nom;
  // const email = req.body.email;
  // const password = req.body.password;
  //That statement in JavaScript is called destructuring assignment
  if (!nom || !email || !password || !numero || !role) {
    return res.status(400).json({ message: "All filed are required" });
  }
  const userExist = await Users.findOne({ email }); // findone utilité nsta3mlha waket nsta3k bach elawej 3la 7aja deja exist w el check yser bl email
  if (userExist) {
    // console.log(userExist)
    return res.status(400).json({ message: "user already exist" });
  }
  //remarque

  // status(400) ⇒ Bad Request

  // le requet de user est faux

  // lazem nab3eth resala bsy3et el json

  // why return؟

  // arreter la execution de code w mysirich el register
  // ba3ed ma3mln check na3mlo create user
  const passwordcrypt = await bcrypt.hash(password, 10);
  console.log(passwordcrypt);
  const newuser = await Users.create({
    nom,
    email,
    password: passwordcrypt,
    numero,
    role,
  });
  console.log(newuser);
  let token = jwt.sign({ email, id: newuser._id }, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });
  res
    .status(201)
    .json({ message: "user created successfully", token, newuser });
  //Auto Login after  Register ya3ni douba my3mel compte el server ysna3lo token dirctemnt yd5ol llpage eli 7achto bha min 8ir my3awed fill the input bach ya3mel login
});
// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All filed are required" });
  }
  // ba3ed mada5el el email w el password lazem na3rf how exist ou non
  const userexist = await Users.findOne({ email });
  // user.findOne({email}) this code return an object for exemple (e.g., { id: 1, email: "test@test.com", name: "John" }).if the user exist if is not return null and null is falsy value
  // user lahna repersent el model === collection=table user in database
  if (!userexist) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  console.log(userexist.password);
  const pass = await bcrypt.compare(password, userexist.password);
  if (!pass) {
    return res.status(400).json({ message: "invalid password" });
  }
  console.log(process.env.SECRET_KEY);
  const token = jwt.sign(
    { id: userexist._id, role: userexist.role },
    process.env.SECRET_KEY,
    { expiresIn: "1w" },
  );
  console.log(userexist._id);
  return res
    .status(201)
    .json({ message: "login successfuly", token, userexist });
});
export default router ;