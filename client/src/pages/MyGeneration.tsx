import React, { useEffect, useState } from 'react'
import SoftBackdrop from '../components/SoftBackdrop'
import { dummyThumbnails, type IThumbnail } from '../assets/assets'
import { div } from 'motion/react-client';

const MyGeneration = () => {

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThumbnails = async () => {
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  }

  const handleDownload = (image_url: string) => {
    window.open(image_url, '_blank');
  }

  const handleDelete = async (id: string) => {
    console.log(id);
  }



  useEffect(() => {
    fetchThumbnails();
  }, []);



  return (
    <>
      <SoftBackdrop />

      <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 '>
        {/* header  */}
        <div className='mb-8'>
          <h1 className='font-bold text-2xl text-zinc-200'>My Generations</h1>
          <p className='text-sm text-zinc-400 mt-1  '>View all your generated thumbnails here.</p>
        </div>


        

        {/* Loading */}
        {loading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="bg-white/5 rounded-xl p-4 transition"
      >
        {/* Image Placeholder */}
        <div className="w-full aspect-video bg-zinc-700/70 rounded-lg mb-4 animate-pulse" />

        {/* Title Line */}
        <div className="h-4 bg-zinc-600/70 rounded w-3/4 mb-2 animate-pulse" />

        {/* Subtitle Line */}
        <div className="h-3 bg-zinc-600/70 rounded w-1/2 animate-pulse" />
      </div>
    ))}
  </div>
)}



        {/* Empty state  */}
        {!loading && thumbnails.length === 0 && (
          <div className='text-center py-24 '>
            <h3 className='text-lg font-semibold text-zinc-200 '> 
              You have not generated any thumbnails yet.
            </h3>
            <p className='text-sm text-zinc-400 mt-2 '>Generate thumbnails to see them here.</p>

          </div>
        )}

      </div>

    </>
  )
}

export default MyGeneration
