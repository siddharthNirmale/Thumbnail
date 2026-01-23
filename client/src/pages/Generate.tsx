import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  colorSchemes,
  dummyThumbnails,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from '../assets/assets'
import SoftBackdrop from '../components/SoftBackdrop'
import AspectRatioSelector from '../components/AspectRatioSelector'
import StyleSelector from '../components/StyleSelector'
import ColorSchemeSelector from '../components/ColorSchemeSelector'
import PreviewPanel from '../components/PreviewPanel'
import { motion } from 'framer-motion'

const Generate = () => {
  const { id } = useParams<{ id?: string }>()

  const [title, setTitle] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null)
  const [loading, setLoading] = useState(false)

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id
  )
  const [style, setStyle] =
    useState<ThumbnailStyle>('Bold & Graphic')
  const [styleDropdownOpen, setStyleDropdownOpen] =
    useState(false)

  const handleGenerate = async () => {}

  const fetchThumbnail = async () => {
    if (id) {
      const thumb: any = dummyThumbnails.find(
        (t) => t._id === id
      )
      setThumbnail(thumb)
      setAdditionalDetails(thumb.user_prompt)
      setTitle(thumb.title)
      setColorSchemeId(thumb.color_scheme)
      setAspectRatio(thumb.aspect_ratio)
      setStyle(thumb.style)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchThumbnail()
  }, [id])

  return (
    <>
      <SoftBackdrop />

      {/* PAGE OPEN */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="pt-24 min-h-screen"
      >
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          {/* GRID */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="grid lg:grid-cols-[400px_1fr] gap-8"
          >
            {/* LEFT PANEL */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`space-y-6 ${
                id ? 'pointer-events-none' : ''
              }`}
            >
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">
                    Create Your Thumbnail
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Describe what you want to see in your
                    thumbnail and AI will generate it.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* TITLE */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      maxLength={100}
                      placeholder="e.g., 10 Tips for Better Sleep"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">
                        {title.length}/100
                      </span>
                    </div>
                  </div>

                  <AspectRatioSelector
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />

                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropdownOpen}
                    setIsOpen={setStyleDropdownOpen}
                  />

                  <ColorSchemeSelector
                    value={colorSchemeId}
                    onChange={setColorSchemeId}
                  />

                  {/* DETAILS */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Additional Prompts{' '}
                      <span className="text-zinc-400">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) =>
                        setAdditionalDetails(e.target.value)
                      }
                      placeholder="Add any specific elements, mood, or style preferences..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {!id && (
                  <button
                    onClick={handleGenerate}
                    className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-700 transition-colors"
                  >
                    {loading
                      ? 'Generating...'
                      : 'Generate Thumbnail'}
                  </button>
                )}
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.05,
              }}
            >
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Preview
                </h2>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </motion.div>
          </motion.div>
        </main>
      </motion.div>
    </>
  )
}

export default Generate
