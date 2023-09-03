import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [movieList, setMovieList] = useState([]);

  // new Movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isNewMoiveOscar, setIsNewMoiveOscar] = useState(false);

  // update title states
  const [updateTitle, setUpdateTitle] = useState("");

  // file upload state
  const [fileUpload, setFileUpload] = useState(null)


  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async() => { 
      
    // read the data
    // set the movie list
    try { 
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc)=> ({
                                    ...doc.data(),
                                     id: doc.id
                                    }));
      // console.log(filteredData);

      setMovieList(filteredData);

    } catch(err){ 
      console.error(err);
    }
  }

  useEffect(()=>{
    getMovieList();
  },[])


  const onSubmit = async () => { 

    try{ 
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        relaseDate: newReleaseDate, 
        receivedOscar: isNewMoiveOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch(err){ 
      console.error(err);
    }
  }
 
  const deleteMovie = async (id) => { 
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);

    getMovieList();
  }

  const updateMovieTitle = async (id) => { 
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updateTitle});
    getMovieList();
  }

  const uploadFile = async () => { 
    if(!fileUpload) return;

    const filesFolderRef = ref(storage, `projectFolder/${fileUpload.name}`);

    try{
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err);
    }

  }

  return (
    <div className="App">
      <Auth />

      <br/>
      <br/>
      
      <div>
        <input placeholder='Movie title..' onChange={(e)=> setNewMovieTitle(e.target.value)}/>
        <input placeholder='relase Date..' type='number' onChange={(e)=> setnewReleaseDate(e.target.value)}/>
        <input type='checkbox' checked={isNewMoiveOscar} onChange={(e)=> setIsNewMoiveOscar(e.target.checked)}/>
        <label>Received an receivedOscar</label>
        <button onClick={onSubmit}>Submit to Firestore</button>
      </div>

      <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color: movie.receivedOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>relase: {movie.relaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>delete</button>
            <br/>
            <input placeholder='new Title..'  onChange={(e)=>setUpdateTitle(e.target.value)}/>
            <button onClick={()=>updateMovieTitle(movie.id)}>update</button>
          </div>
        ))}
      </div>

          <br />
      <div>
          <input type='file' onChange={(e)=> setFileUpload(e.target.files[0])}/>
          <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
