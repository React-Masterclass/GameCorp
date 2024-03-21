import { useEffect, useState } from 'react';
import supabase from '../supabase/client';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // funzione che carica l'immagine nello storage...
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  // se url cambia invoca la funzione downloadImage...
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  // funzione che controlla il path dell'immagine da inserire...
  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center mt-1'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="inline rounded-full"
          style={{
            height: size,
            width: size,
            boxShadow: '1px 1px 10px #030405',
          }}
        />
      ) : (
        <div
          className="avatar no-image rounded-full"
          style={{
            height: size,
            width: size,
            boxShadow: '1px 1px 10px #030405',
          }}
        />
      )}
        <button
          type="button"
          className='mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </button>
        <div className='mt-4'>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className='hidden'
        />
         <label htmlFor="single" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
      Select Image
    </label>
        </div>
      </div>
  );
}