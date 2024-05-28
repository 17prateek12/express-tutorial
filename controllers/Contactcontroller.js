import asyncHandler from "express-async-handler";
import Contact from "../models/Contactmodel.js"

const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async(req,res)=>{
    console.log("The Request Body is :",req.body)
    const { name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found")
        }
       
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to update contact of other user");
    }
    const updatecontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ); 
    res.status(200).json(updatecontact);
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found")
        }
        if(contact.user_id.toString()!==req.user.id){
            res.status(403);
            throw new Error("User doesn't have permission to update contact of other user");
        }
     await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found")
        }
    res.status(200).json(contact);
})

export {getContacts, createContact, updateContact, deleteContact, getContact }