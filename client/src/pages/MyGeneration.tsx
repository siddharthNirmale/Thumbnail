import React, { use, useEffect, useState } from 'react'
import SoftBackdrop from '../components/SoftBackdrop'
import { dummyThumbnails, type IThumbnail } from '../assets/assets'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowUpRightIcon,
  DownloadIcon,
  TrashIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../configs/api'

type AspectRatio = '16:9' | '1:1' | '9:16'

const MyGeneration = () => {
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()


  const aspectRatioClassMap: Record<AspectRatio, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  }

  const fetchThumbnails = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/user/thumbnails')
      setThumbnails(data.thumbnails || [])
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message)
    }
    finally {
      setLoading(false);
    }
  }

  const handleDownload = (image_url: string) => {

    const link = document.createElement('a');
    link.href = image_url.replace('/upload', '/uplooad/fl_attachment')
    document.body.appendChild(link);
    link.click()
    link.remove()
  }

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this thumbnail? ")
      if(!confirm) return;
      const {data} = await api.delete(`/api/thumbnail/delete/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t)=>t._id !==id));
    } catch (error:any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if(isLoggedIn){
      fetchThumbnails()
    }
    
  }, [isLoggedIn])

 

  return (
    <>
      <SoftBackdrop />

      {/* PAGE OPEN ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32"
      >
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-zinc-200">
            My Generations
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View all your generated thumbnails here.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl p-4"
              >
                <div className="w-full aspect-video bg-zinc-700/70 rounded-lg mb-4 animate-pulse" />
                <div className="h-4 bg-zinc-600/70 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-zinc-600/70 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              You have not generated any thumbnails yet.
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              Generate thumbnails to see them here.
            </p>
          </div>
        )}

        {/* GRID WITH STAGGER */}
        {!loading && thumbnails.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8"
          >
            {thumbnails.map((thumb) => {
              const aspectClass =
                aspectRatioClassMap[
                thumb.aspect_ratio as AspectRatio
                ] || aspectRatioClassMap['16:9']

              return (
                <motion.div
                  key={thumb._id}
                  onClick={() =>
                    navigate(`/generate/${thumb._id}`)
                  }
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -4 }}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 shadow-xl break-inside-avoid"
                >
                  {/* IMAGE */}
                  <div
                    className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                  >
                    {thumb.image_url ? (
                      <img
                        src={thumb.image_url}
                        alt={thumb.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                        {thumb.isGenerating
                          ? 'Generating…'
                          : 'No Image'}
                      </div>
                    )}

                    {thumb.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                        Generating…
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                      {thumb.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.style}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.color_scheme}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/8">
                        {thumb.aspect_ratio}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500">
                      {new Date(
                        thumb.createdAt!
                      ).toDateString()}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <TrashIcon
                      onClick={() =>
                        handleDelete(thumb._id)
                      }
                      className="size-6 bg-black/50 p-1 rounded hover:bg-indigo-600 transition-all"
                    />

                    <DownloadIcon
                      onClick={() =>
                        handleDownload(thumb.image_url!)
                      }
                      className="size-6 bg-black/50 p-1 rounded hover:bg-indigo-600 transition-all"
                    />

                    <Link
                      target="_blank"
                      to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                    >
                      <ArrowUpRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-indigo-600 transition-all" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default MyGeneration
