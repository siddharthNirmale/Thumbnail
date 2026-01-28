import mongoose from "mongoose";

export interface IThumbnail extends Document {
    userId: string;
    title: string;
    description?: string;
    style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
    aspect_ratio?: "16:9" | "1:1" | "9:16";
    color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
    text_overlay?: boolean;
    image_url?: string;
    prompt_used?: string;
    user_prompt?: string;
    isGenerating?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ThumbnailSchema = new mongoose.Schema<IThumbnail>({
    userId: { type: String, ref: "User", required: true },
    title: { type: String, trim: true },
    description: { type: String, required: false },
    style: { type: String, required: true, enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"] },
    aspect_ratio: { type: String, enum: ["16:9", "1:1", "9:16"], default: "16:9" },
    color_scheme: { type: String, enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"], default: "vibrant" },
    text_overlay: { type: Boolean, default: false },
    image_url: { type: String, default: '' },
    prompt_used: { type: String },
    user_prompt: { type: String },
    isGenerating: { type: Boolean, default: true },
})

const Thumbail = mongoose.models.Thumbnail || mongoose.model<IThumbnail>("Thumbnail",ThumbnailSchema)

export default Thumbail;