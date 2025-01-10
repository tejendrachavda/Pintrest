import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { TryCatch } from "../utils/trycatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch( async (req, res) => {
    const { name , email , password } = req.body;
    

    var user = await User.findOne({ email });
    
    if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }

    
    
    const haspass = await bcrypt.hash(password, 10);
    
    user = await User.create({ name , email , password: haspass });
    
    generateToken(user._id , res);
    res.status(201).json({
        user,
        message: "User created successfully",
    })
})

export const loginUser = TryCatch(async(req , res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(req.body);
    

    if (!user) {
        return res.status(400).json({ message: "User not exist" });
    }

    const comparePassword = await bcrypt.compare(password , user.password);
    
    if (!comparePassword) {
        return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user._id, res);
    
   res.json({
        user,
        message: "User logged in successfully",
    })
})

export const myProfile = TryCatch(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export const userProfile = TryCatch(async(req , res) =>{
    const user = await User.findById(req.params.id).select('-password');

    res.json(user)
})

export const followandunfollowUser = TryCatch(async(req , res) =>{
    const user = await User.findById(req.params.id);
    const loggedinUser = await User.findById(req.user._id);

    
    if (!user) {
        return res.status(404).json({ message: "No user found in this id" });
    }
    

    if (user._id.toString() === loggedinUser._id.toString()) {
        return res.status(400).json({ message: "You can't follow yourself" });
    }

     if (loggedinUser.following.includes(user._id)) {
        const indexFollower = loggedinUser.following ? loggedinUser.following.indexOf(user._id) : -1;
        const indexFollowing = user.follower ? user.follower.indexOf(loggedinUser._id) : -1;

        if (indexFollower !== -1 && indexFollowing !== -1) {
            loggedinUser.following.splice(indexFollower, 1);
            user.follower.splice(indexFollowing, 1);
        }

            await loggedinUser.save();
            await user.save();
            res.status(200).json({ message: "User unfollowed successfully" });
    
     } else {

            loggedinUser.following.push(user._id);
            user.follower.push(loggedinUser._id);

    await loggedinUser.save();
    await user.save();
    res.status(200).json({ message: "User followed successfully" });
}
})

export const logOutUser = TryCatch(async(req, res) =>{
    res.clearCookie("token");
    res.clearCookie("user");
    res.json({
        message:"Logged Out Successfully"
    })
})

export const getFollowers = TryCatch(async(req , res) =>{
    const user = await User.findById(req.params.id).select('-password');
    const following = await user.following;
    const users = await User.find({"_id": following})
    
    res.status(200).json({users});
    
})