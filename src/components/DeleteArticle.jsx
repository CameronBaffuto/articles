import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { ref, deleteObject } from 'firebase/storage';

export default function DeleteArticle({id, imageUrl}) {

    const handleDelete = async() => {
        try {
           await deleteDoc(doc(db, "Articles", id));
           toast('Article deleted successfully', {type: 'success'});
           const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
        } catch(error) {
            console.log(error);
            toast('Error deleting article', {type: 'error'});
        }
    }

  return <div>
      <button className="btn btn-danger" onClick={handleDelete}><i class="fas fa-trash-alt"></i></button>
  </div>;
}
