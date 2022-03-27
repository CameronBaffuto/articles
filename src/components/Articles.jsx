import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DeleteArticle from './DeleteArticle';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


export default function Articles() {
    const [articles, setArticles] = useState([]);
    useEffect(() => { 
        const articleRef = collection(db, "Articles");
        const q = query(articleRef, orderBy("date", "desc"));  
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setArticles(articles);
            console.log(articles);
        });
    }, []);

  return (
  <div>
      <div className="m-5">  
    <div className="row">
    {articles.length === 0 ? ( 
            <h1>No Articles</h1> 
            ) : ( 
                articles.map(({id,title,description,imageUrl,date}) => (
                
                 
                        <div className="col-md-4 col-sm-12">
                            <div className="mt-3 p-3" key={id}>
                            <div className="card">
                                <Zoom>
                                <img src={imageUrl} alt="article" className="card-img-top" style={{ height: "50vh", objectFit: "cover" }} />
                                </Zoom>
                                <div className="card-body">
                                <h3 className="card-title">{title}</h3>
                                <p className="card-text">{date.toDate().toDateString()}</p>
                                <h4 className="card-text">{description}</h4>
                                <DeleteArticle id={id} imageUrl={imageUrl}/>
                                </div>
                                </div>
                            </div>
                        </div>
                    
            ))
            )}
    </div>
    </div>
  </div>
  );
}
