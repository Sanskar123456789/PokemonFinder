import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AllPoke from './components/allPoke';
import NewPoke from './components/newPoke';

import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from './features/pokemon';
import Home from './components/Home';
import { ProgressSpinner } from 'primereact/progressspinner';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPokemons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  let isSpin = useSelector((state) =>state.poke.loaded);
// console.log(isSpin);
  return (
      <Router>
        <div className="App">
            <Navbar />
            {
            isSpin?
              <ProgressSpinner style={{margin:"auto",marginTop:"10%",marginLeft:"40%"}}/>:
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/all" element={<AllPoke/>}/>
                <Route exact path="/new" element={<NewPoke/>}/>
              </Routes>
            }
            
        </div>
      </Router>
  );
}

export default App;
