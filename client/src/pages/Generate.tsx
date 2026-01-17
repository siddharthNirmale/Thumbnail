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
    <div>
      
    </div>

      
    </>
  )
}

export default Generate
