import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';

const Profile = () => {

  const { token, backendUrl, fetchUserData } = useContext(AppContext)

  const { user, loading } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    image: "",
  });

  // handle user data update
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("position", userData.position);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const { data } = await axios.put(backendUrl + "/api/user/update-profile", formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        fetchUserData();
        setIsEdit(false);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        position: user.position || "",
        image: user.image || "",
      });
    }
  }, [user]);

  return (
    <>
      <div className="px-1 py-6 sm:p-6 min-h-screen">

        {/* Tittle */}
        <h1 className="text-2xl text-slate-800 font-bold mb-8">My Profile</h1>

        <div className='w-full max-w-md flex flex-col gap-4 text-sm py-4 px-6 bg-white rounded-lg shadow-md'>

          {/* Profile Image */}
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="inline-block relative">
                <img className="w-36 h-36 rounded object-cover opacity-75"
                  src={previewImage ? previewImage : userData.image} alt="Profile"
                />
                <img className="w-10 absolute bottom-2 right-2" src={assets.upload_icon} alt="Upload"
                />
              </div>

              <input type="file" id="image" className="hidden" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedImage(file);                    
                    setPreviewImage(URL.createObjectURL(file)); 
                  }
                }}
              />
            </label>
          ) : (
            <img className="w-36 h-36 rounded object-cover" src={userData.image} alt="Profile"/>
          )}

          {/* Name */}
          {isEdit ? (
            <input type="text" value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className='bg-gray-50 text-2xl font-medium rounded p-1'
            />
          ) : (
            <p className='font-medium text-2xl text-gray-800'>{user?.name}</p>
          )}

          <hr className='border-gray-300' />

          <div>
            <p className='text-neutral-500 underline mb-3'>CONTACT INFORMATION</p>
            {/* Contact Info */}
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
              <p className='font-medium'>Email</p>
              <p className='text-gray-600'>{user?.email}</p>

              {/* phone */}
              <p className='font-medium'>Phone</p>
              {isEdit ? (
                <input type="text" value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className='bg-gray-50 w-full rounded p-1'
                />
              ) : (
                <p className='text-gray-600'>{user?.phone}</p>
              )}

              {/* position */}
              <p className='font-medium'>position</p>
              {isEdit ? (
                <input type="text" value={userData.position}
                  onChange={(e) => setUserData(prev => ({ ...prev, position: e.target.value }))}
                  className='bg-gray-50 w-full rounded p-1'
                />
              ) : (
                <p className='text-gray-600'>{user?.position}</p>
              )}

            </div>
          </div>

          {/* Edit & Save Button */}
          <div className='mt-4'>
            {isEdit ? (
              <button
                onClick={updateUserProfile}
                className='px-6 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition'
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='px-8 py-1 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition'
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile
