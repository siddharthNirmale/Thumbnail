'use client'
import { CheckIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate  = useNavigate();
    const specialFeatures = [
        "No Design Skills needed",
        "Free Generations",
        "High CTR Templates",
    ];

    return (
        <motion.div
            className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { 
                    opacity: 1, 
                    transition: { 
                        staggerChildren: 0.2, 
                        when: "beforeChildren",
                        type: "spring",
                        stiffness: 150,
                        damping: 20
                    } 
                },
            }}
        >
            <div className="absolute top-30 -z-10 left-1/4 size-72 bg-indigo-600 blur-[300px]"></div>

            <motion.a 
                href="https://prebuiltui.com?utm_source=pixels" 
                className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-44 text-indigo-100 bg-indigo-200/15"
                variants={{ 
                    hidden: { y: -20, opacity: 0 }, 
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 70 } } 
                }}
            >
                <span className="bg-indigo-800 text-white text-xs px-3.5 py-1 rounded-full">
                    NEW
                </span>
                <p className="flex items-center gap-1">
                    <span>Generate your first thumbnail for free </span>
                    <ChevronRightIcon size={16} className="group-hover:translate-x-0.5 transition duration-300" />
                </p>
            </motion.a>

            <motion.h1
                className="text-5xl/17 md:text-6xl/21 font-medium max-w-3xl text-center mt-6"
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 70 } } }}
            >
                AI Thumbnail Generator for your {" "}
                <span className="move-gradient px-3 rounded-xl text-nowrap">Videos.</span>
            </motion.h1>

            <motion.p 
                className="text-base text-center text-slate-200 max-w-lg mt-6"
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
                Stop wasting hours on design.
                Get your first thumbnail generated in seconds with our AI-powered tool.
            </motion.p>

            <motion.div 
                className="flex items-center gap-4 mt-8"
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
                <button onClick={()=> navigate('/generate')} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-7 h-11">
                    Generate Now
                </button>
                <button className="flex items-center gap-2 border border-indigo-900 hover:bg-indigo-950/50 transition rounded-full px-6 h-11">
                    <VideoIcon strokeWidth={1} />
                    <span>See how it works</span>
                </button>
            </motion.div>

            <motion.div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
                {specialFeatures.map((feature, index) => (
                    <motion.p className="flex items-center gap-2" key={index}
                        variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    >
                        <CheckIcon className="size-5 text-indigo-600" />
                        <span className="text-slate-400">{feature}</span>
                    </motion.p>
                ))}
            </motion.div>

            <TiltedImage />
        </motion.div>
    );
}
