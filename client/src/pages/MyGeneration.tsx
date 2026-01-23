import React, { useEffect, useState } from 'react'
import SoftBackdrop from '../components/SoftBackdrop'
import { dummyThumbnails, type IThumbnail } from '../assets/assets'
import { div } from 'motion/react-client';
import { useNavigate } from 'react-router-dom';

const MyGeneration = () => {



  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const aspectRatioClassMap : Record<string,string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
  }

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

        {/* gird  */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg-columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail)=>{
                const aspectClass = aspectRatioClassMap[thumb.aspect_ratio] || '16:9';


                return (
                  <div key={thumb._id} onClick={()=>navigate(`/generate/${thumb._id}`)} className='mb-8 group relative cursor-pointer rounded-2xl bg-white/6  border border-white/10 transition shadow-xl break-inside-avoid'>
                    {/* imgage */}
                    <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                      {
                        thumb.image_url ? (
                          <img src={thumb.image_url} alt={thumb.title}  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 '/>
                         ) : (
                          <div className='w-full h-full flex tems-center justify-center text-sm text-zinc-400'>
                            {thumb.isGenerating ? 'Generating..' : "No Image"}
                          </div>
                         )
                      }
                      {thumb.isGenerating && (
                        <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white'>Generating...</div>
                      )}

                    </div>
                  </div>
                )
              })}


          </div>
        )}
      </div>

    </>
  )
}

export default MyGeneration
