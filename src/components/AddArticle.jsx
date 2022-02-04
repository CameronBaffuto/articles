import React, { useState } from 'react';
import  { Timestamp, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebaseConfig';
import { toast } from 'react-toastify';


export default function AddArticle() {


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        date: Timestamp.now().toDate(),
    });

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleSubmit = () => {
        if(!formData.title || !formData.description || !formData.image) {
            alert('Please fill in all fields');
            return;
        }

        const storageRef = ref(storage, `images/${Date.now()}${formData.image.name}`);

        const uploadImage = uploadBytesResumable(storageRef, formData.image)

        uploadImage.on("stage_changed", (snapshot) => {
            const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        }, (error) => {
            console.log(error);
        }, () => {
            setFormData({
                title: '',
                description: '',
                image: '',
        });
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
                title: formData.title,
                description: formData.description,
                imageUrl: url, 
                date: Timestamp.now().toDate(),
            })
            .then(() => {
                toast('Article added successfully', {type: 'success'});
                setProgress(0); 
            })
            .catch((err) => {
                toast('Error adding article', {type: 'error'});
            });
        })
    }
            );
    }

  return (
<div className="container">
    <div className="row">
        <div className="col-md-8 offset-md-2">  
  <div className="border rounded p-3 mt-5">
        <h2>Create Article</h2>
        <label htmlFor="">Title</label>
        <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => handleChange(e)} />

        <label htmlFor="">Description</label>
        <textarea name="description" className="form-control" value={formData.description} onChange={(e) => handleChange(e)}></textarea>

        <label htmlFor="">Image</label>
        <input type="file" name="image" className="form-control" accept="image/*" onChange={(e) => handleImageChange(e)}/>

    {progress === 0 ? null :(
        <div className="progress mt-2">
            <div className="progress-bar progress-bar-striped" style={{width: `${progress}%`}}>{`Uploading Image ${progress}%`}</div>
        </div>
    )}


        <button className="form-control btn-primary mt-2" onClick={handleSubmit}>Submit</button>
  </div>
  </div>
  </div>
  </div>
  );}
