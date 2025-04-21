import React from 'react';
import ImageUploading from 'react-images-uploading';
import style from './profile.module.css';
import { GrAdd } from "react-icons/gr";
import { FaSave } from 'react-icons/fa';


export default function Profile() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className={style.container}>
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
      <p className={style.label}>EMAIL:</p><textarea className={style.text}></textarea>
      <p className={style.label}>CONTACT:</p><textarea className={style.text}></textarea>
      <button className={style.save}><FaSave size={18}/>save</button>
      <div className={style.green_form}>
        <p className={style.field_label}>NAME:</p>
        <p></p>
        <p className={style.field_label}>STUDENT NUMBER:</p>
        <p></p>
        <p className={style.field_label}>EMAIL:</p>
        <p></p>
        <p className={style.field_label}>YEAR OF STUDY:</p>
        <p></p>
        <p className={style.field_label}>CONTACT:</p>
        <p></p>
      </div>
    </div>
  );
}