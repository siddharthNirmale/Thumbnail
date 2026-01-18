import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IThumbnail } from '../assets/assets';
import SoftBackdrop from '../components/SoftBackdrop';

const Generate = () => {
  
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [additonalDetails,setAdditonalDetails] = useState('');
  const [thumbnail,setThumbnail] = useState<IThumbnail | null>(null);
  const [loading,setLoading] =useState(false);

  
  
  return (
    <>
    <SoftBackdrop/>

    <div className="pt-24 min-h-screen  ">
      <main className='max-w-6xl mx-auto px-4  sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8'>
        <div className=' grid lg:grid-cols-[400px_1fr] gap-8'>

          {/* left panel */}
          <div className={`space-y-6 ${id && "pointer-events-none"}`}>
            <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>

            <div>
              <h2 className='text-xl font-bold text-zinc-100  '>Create Your Thumbnail</h2>
              <p className=''>Describe what you want to see in your thumbnail and AI will generate it for you.</p>
            </div>
            <div className='space-y-5 '>
              {/* title input  */}
              <div className='space-y-2 '>
                <label className='bloack text-sm font-medium'  > Title or Topic </label>
              </div>

            </div>
            {/* button  */}

            {
              !id && (
                <button className='text-[15px] w-full py-3.5 rounded-xl font-medium bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-700 disabled:cursor-not-allowed transition-colors  ' 
                > {loading ? "Generating..." : "Generate Thumbnail"}</button>
              )
            }

            </div>
          </div>
          {/* RIGHT PANEL  */}
          <div>
           
          </div>

        </div>


      </main>
      
    </div>

      
    </>
  )
}

export default Generate
