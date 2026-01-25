import { Request, Response } from "express"
import User from "../models/user.js";
import bcrypt from 'bcrypt';
// Controllers for User Registrations 

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;

        // find user by email 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already Exists" });
        }

        // Encrypt the password 
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, email, password: hashedPassword
        })
        await newUser.save();


        // setting user Data in session 

        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        return res.json({
            message: 'Account created Succesfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,

            }
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });

    }
}


// controllers for user Login 
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // find user by email 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid User or Password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid User or Password" });
        }




        // setting user Data in session 

        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        return res.json({
            message: 'Login Successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,

            }
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// controller for user Logout 
export const LogOutUser = async (req: Request, res: Response) => {
    req.session.destroy((error: any) => {
        if (error) {
            console.log(error);
            return (res.status(500).json({ message: error.message }));
        }
    })
    return res.json({ message: "Logout Successfull" });
}

// controllers for user verify 

export const verifyUser = async (req: Request, res: Response) =>{
    try{
        const {userId} = req.session;
        const user= await User.findById(userId).select('-password');

        if(!user){
            return res.status(400).json({message:"Invalid User"});
        }
        return res.json({user});

    }catch(error:any){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}