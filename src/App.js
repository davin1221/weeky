import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore'

function App() {

  const [movieList, setMovieList] = useState([]);

  // new Movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isNewMoiveOscar, setIsNewMoiveOscar] = useState(false);

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
        receivedOscar: isNewMoiveOscar
      });
      getMovieList();
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
