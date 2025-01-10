import { TryCatch } from "../utils/trycatch.js";
import { Pin } from "../models/pin.model.js";
import {deletefile, uploadFile }from "../utils/cloudinary.js";

export const createPin = TryCatch(async ( req ,res ) =>{
    const { title, pin } = req.body
    

if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
}

const fileUrl = req.file;

    const cloud = await uploadFile(fileUrl.path)
    

const pindata = await Pin.create({
    title, 
    pin,
    image: {
        id: cloud.public_id,
        url: cloud.secure_url
    },
    owner: req.user._id
});

res.json({
    pindata,
    message: "Pin created successfully",
})
})

export const getAllPins = TryCatch(async (req, res) => {
    const pins = await Pin.find().sort({cretaedAt : -1})

    res.json(pins)
})

export const getSinglePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id).populate("owner" , "-password")
    if (!pin) {
        return res.status(404).json({ message: "Pin not found" });
    }
    res.json(pin)
})

export const deletePin = TryCatch(async (req , res) =>{
    const pin = await Pin.findById(req.params.id)

    if (!pin) {
        return res.json({message:"No pin with this id"})
    }

    if (pin.owner.toString() !== req.user._id.toString()) {
        return res.json({message:"Unauthorized || User delete only own pin"})
    }

    await deletefile(pin.image.id)

    await pin.deleteOne()


    // const deletepin = await Pin.findByIdAndDelete(req.params.id)
    // if (!deletepin) {
    //     return res.status(404).json({ message: "Pin is not found and cannot be deleted" });
    // }
    res.json({ message: "Pin deleted successfully" })
})

export const updatePin = TryCatch(async (req, res) => {

    var pin = await Pin.findById(req.params.id)
    console.log(pin);
    

    if (!pin) {
        return res.json({message:"No pin with this id"})
    }

    if (pin.owner.toString() !== req.user._id.toString()) {
        return res.json({message:"Unauthorized || User Update only own pin"})
    }

    pin.title = req.body.title
    pin.pin = req.body.pin

    const updatepin = await pin.save()

//    const { title, pin } = req.body;

//    const cloud = await uploadFile(req.file.path)

//     const updatepin = await Pin.findByIdAndUpdate(req.params.id, {
//         $set:{
//             title, 
//             pin,
//             image:{
//                 id : cloud.public_id,
//                 url : cloud.secure_url
//             }
//         }
//     }, { new: true })

    if (!updatepin) {
        return res.status(404).json({ message: "Pin is not updated" });
    }

    res.json({ message: "Pin updated successfully" })
})

export const commentOnPin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id)

    if (!pin) {
        return res.status(404).json({ message: "Pin not found" });
    }
    
    

    pin.comments.push({
        user : req.user._id,
        name : req.user.name,
        comment:req.body.comment
    })

    await pin.save()

    res.json({
        message: "Comment added successfully",
    })
})

export const deleteComment = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id)

  if (!pin) {
    return res.status(404).json({ message: "No pin with this id" });
  }

  if (!req.query.commentId) {
    return res.status(400).json({ message: "Comment id is required" });
  }

  const commentIndex = pin.comments.findIndex((comment) => comment._id.toString() === req.query.commentId.toString())
  
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = pin.comments[commentIndex]

  if (comment.user.toString() === req.user._id.toString()) {
        pin.comments.splice(commentIndex , 1)
        await pin.save()
        res.json({ message: "Comment deleted successfully" })
  }
  else {
    return res.status(403).json({ message: "You can only delete your own comments"})
  }


res.json({message: "Comment deleted successfully"})
})
