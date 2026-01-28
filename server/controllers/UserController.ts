import { Response,Request } from "express"
import Thumbail from "../models/thumbnail.js";

// controllers to get all user Thumbails 


export const getUserThumbnails = async (req:Request,res:Response)=>{

    try {
        const {userId} = req.session;

        const thumbnail = await Thumbail.find({userId}).sort({createdAt: -1});
        res.json({thumbnail})



    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

// controller to get singler  thumbnail of a user

export const getThumbnailbyIc = async (req:Request,res:Response)=>{
    try {
        const {userId} = req.session;

        const {id} = req.params;
        const thumbnail = await Thumbail.findOne({userId,_id:id});


        res.json({thumbnail})
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

