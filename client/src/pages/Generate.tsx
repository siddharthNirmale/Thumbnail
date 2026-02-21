import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import api from "../configs/api";

// Components
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";

const Generate = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Browser-safe interval ref
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- State ---
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    additionalDetails: "",
    aspectRatio: "16:9" as AspectRatio,
    colorSchemeId: colorSchemes[0].id,
    style: "Bold & Graphic" as ThumbnailStyle,
  });

  // --- Handlers ---
  const handleInputChange = <
    K extends keyof typeof formData
  >(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error("Please login to generate thumbnails");
    if (!formData.title.trim()) return toast.error("Title is required");

    setLoading(true);

    try {
      const api_payload = {
        title: formData.title,
        prompt: formData.additionalDetails,
        style: formData.style,
        aspect_ratio: formData.aspectRatio,
        color_scheme: formData.colorSchemeId,
        text_overlay: true,
      };

      const { data } = await api.post("/api/thumbnail/generate", api_payload);

      if (data?.thumbnail?._id) {
        toast.success(data.message || "Generation started!");
        navigate(`/generate/${data.thumbnail._id}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to generate");
      setLoading(false);
    }
  };

  // --- Fetch Thumbnail ---
  const fetchThumbnail = useCallback(async (thumbnailId: string) => {
    try {
      const { data } = await api.get(`/api/user/thumbnail/${thumbnailId}`);
      const thumb = data?.thumbnail as IThumbnail;

      if (!thumb) return;

      setThumbnail(thumb);

      // Sync form with loaded thumbnail
      setFormData({
        title: thumb.title || "",
        additionalDetails: thumb.user_prompt || "",
        aspectRatio: thumb.aspect_ratio as AspectRatio,
        colorSchemeId: thumb.color_scheme,
        style: thumb.style as ThumbnailStyle,
      });

      // Stop loading + polling when image is ready
      if (thumb.image_url) {
        setLoading(false);

        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error fetching thumbnail"
      );
    }
  }, []);

  // --- Effects ---

  // Initial Load + Polling
  useEffect(() => {
    if (!id || !isLoggedIn) {
      setThumbnail(null);
      setLoading(false);
      return;
    }

    // Initial fetch
    fetchThumbnail(id);

    // Start polling
    pollingRef.current = setInterval(() => {
      fetchThumbnail(id);
    }, 5000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [id, isLoggedIn, fetchThumbnail]);

  // --- Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SoftBackdrop />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-24 min-h-screen"
      >
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">

            {/* LEFT PANEL */}
            <motion.div
              variants={itemVariants}
              className={`space-y-6 ${id ? "opacity-80" : ""}`}
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-6 backdrop-blur-sm">
                
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">
                    {id ? "Thumbnail Details" : "Create Your Thumbnail"}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI handle the rest.
                  </p>
                </div>

                <div className="space-y-5">
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200">
                      Title or Topic
                    </label>
                    <input
                      disabled={!!id}
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      maxLength={100}
                      placeholder="e.g., 10 Tips for Better Sleep"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/20 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                    />
                  </div>

                  <AspectRatioSelector
                    value={formData.aspectRatio}
                    onChange={(val) =>
                      !id && handleInputChange("aspectRatio", val)
                    }
                  />

                  <StyleSelector
                    value={formData.style}
                    onChange={(val) =>
                      !id && handleInputChange("style", val)
                    }
                    isOpen={styleDropdownOpen}
                    setIsOpen={setStyleDropdownOpen}
                  />

                  <ColorSchemeSelector
                    value={formData.colorSchemeId}
                    onChange={(val) =>
                      !id && handleInputChange("colorSchemeId", val)
                    }
                  />

                  {/* Additional Prompt */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200">
                      Additional Prompts
                    </label>
                    <textarea
                      disabled={!!id}
                      value={formData.additionalDetails}
                      onChange={(e) =>
                        handleInputChange(
                          "additionalDetails",
                          e.target.value
                        )
                      }
                      placeholder="Describe mood, objects, or lighting..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {!id && (
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !formData.title}
                    className="w-full py-4 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all text-white"
                  >
                    {loading ? "Generating..." : "Generate Thumbnail"}
                  </button>
                )}
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div variants={itemVariants}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Live Preview
                </h2>

                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={formData.aspectRatio}
                />
              </div>
            </motion.div>

          </div>
        </main>
      </motion.div>
    </>
  );
};

export default Generate;
