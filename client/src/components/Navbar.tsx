'use client'

import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
	const { isLoggedIn, user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const closeMenu = () => setIsOpen(false);

	// ✅ Scroll Progress
	const { scrollYProgress } = useScroll();

	// ✅ Smooth animation
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 25,
		mass: 0.2,
	});

	return (
		<>
			{/* 🔥 Progress Bar */}
			<motion.div
				style={{
					scaleX: smoothProgress,
					transformOrigin: "0% 50%",
				}}
				className="fixed top-0 left-0 right-0 h-[3px] bg-indigo-600 z-[100]"
			/>

			{/* Desktop Navbar */}
			<motion.nav
				className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 250, damping: 70 }}
			>
				{/* Logo */}
				<Link to="/">
					<img src="/logo.png" alt="logo" className="h-8.5 w-auto" />
				</Link>

				{/* Desktop Links */}
				<div className="hidden md:flex items-center gap-8">
					<Link to="/" className="hover:text-indigo-300 transition">
						Home
					</Link>
					<Link to="/generate" className="hover:text-indigo-300 transition">
						Generate
					</Link>

					{isLoggedIn ? (
						<Link to="/my-generation" className="hover:text-indigo-300 transition">
							My Generations
						</Link>
					) : (
						<Link to="#" className="hover:text-indigo-300 transition">
							About
						</Link>
					)}

					<Link to="#" className="hover:text-indigo-300 transition">
						Contact us
					</Link>
				</div>

				{/* User Actions */}
				<div className="flex items-center gap-3">
					{isLoggedIn ? (
						<div className="relative group">
							<button className="rounded-full size-8 bg-white/20 border border-white/10 flex items-center justify-center">
								{user?.name?.charAt(0).toUpperCase()}
							</button>

							<div className="absolute hidden group-hover:block top-8 right-0">
								<button
									onClick={logout}
									className="bg-white/20 border border-white/10 px-4 py-1.5 rounded backdrop-blur-md"
								>
									Logout
								</button>
							</div>
						</div>
					) : (
						<button
							className="bg-indigo-500 text-white py-2 px-4 rounded-3xl hover:bg-indigo-600 transition"
							onClick={() => navigate("/login")}
						>
							Get Started
						</button>
					)}

					{/* Mobile Menu Button */}
					<button onClick={() => setIsOpen(true)} className="md:hidden">
						<MenuIcon size={26} className="active:scale-90 transition" />
					</button>
				</div>
			</motion.nav>

			{/* Mobile Menu */}
			<div
				className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Link onClick={closeMenu} to="/">Home</Link>
				<Link onClick={closeMenu} to="/generate">Generate</Link>

				{isLoggedIn ? (
					<Link onClick={closeMenu} to="/my-generation">
						My Generations
					</Link>
				) : (
					<Link onClick={closeMenu} to="#">About</Link>
				)}

				<Link onClick={closeMenu} to="#">Contact us</Link>

				{isLoggedIn ? (
					<button onClick={() => { closeMenu(); logout(); }}>
						Logout
					</button>
				) : (
					<Link onClick={closeMenu} to="/login">
						Login
					</Link>
				)}

				{/* Close Button */}
				<button
					onClick={closeMenu}
					className="flex items-center justify-center size-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
				>
					<XIcon />
				</button>
			</div>
		</>
	);
}