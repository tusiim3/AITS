import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import style from './profile.module.css';
import { GrAdd } from "react-icons/gr";
import { FaSave } from 'react-icons/fa';
import axiosInstance from '../../axioscomponent'; 
import { toast } from "react-toastify"



export default function Profile() {
  const [email, setEmail] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const maxNumber = 1;

  useEffect(() => {
    axiosInstance.get('/profile/')
      .then(res => {
        setProfile(res.data);
        setEmail(res.data.email || '');
        setContact(res.data.contact || '');
        if (res.data.profile_picture) {
          setImages([{
            data_url: res.data.profile_picture, // This should be the URL to the image
            file: null
          }]);
        }
      })
      .catch(err => console.error('Failed to fetch profile:', err));
  }, []);


  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  
  const handleSave = async () => {
    const formData = new FormData();
    if (images[0]?.file) {
      formData.append('profile_picture', images[0].file);
    }
    formData.append('email', email);
    formData.append('contact', contact);

    try {
      const response = await axiosInstance.put('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
      toast.success("profile updated successfully");
      // Optionally, show a success message here
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error("failed to update profile");
      // Optionally, show an error message here
    }
  };

  return (
    <div>
      <div className={style.profedit}>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className={style.upload__image_wrapper}>
              <h3>profile picture</h3>
              <button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <GrAdd className={style.add_icon}/>
              </button>
              &nbsp;
              {imageList.length === 1 && (
                <div className={style.image_preview}>
                  <img src={imageList[0].data_url} alt="Uploaded" />
                  <div className={style.image_buttons}>
                    <button onClick={() => onImageUpdate(0)}>Update</button>
                    <button onClick={() => onImageRemove(0)}>Remove</button>
                  </div>
                </div>
              )}

            </div>
          )}
        </ImageUploading>
        <p className={style.label}>EMAIL:</p>
        <textarea className={style.text} value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className={style.label}>CONTACT:</p>
        <textarea className={style.text} value={contact} onChange={(e) => setContact(e.target.value)} />
        <button className={style.save} onClick={handleSave}><FaSave size={18}/>save</button>
      </div>
      <div className={style.green_form}>
        <p className={style.field_label}>NAME:</p>
        <p>{profile.username || ''}</p>
        <p className={style.field_label}>REGISTRAR NUMBER:</p>
        <p>{profile.student_number || ''}</p>
        <p className={style.field_label}>EMAIL:</p>
        <p>{profile.email || ''}</p>
        <p className={style.field_label}>YEAR OF STUDY:</p>
        <p>{profile.year_of_study || ''}</p>
        <p className={style.field_label}>CONTACT:</p>
        <p>{profile.contact || ''}</p>
      </div>
    </div>
  );
}