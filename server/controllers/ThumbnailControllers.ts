import { Request, Response } from "express"
import Thumbail from "../models/thumbnail.js";


export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = req.body;

        const thumbnail = await Thumbail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true,
        })

        
    } catch (error) {

    }
}