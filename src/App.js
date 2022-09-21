import './App.css';
import React, { useState } from 'react';
import Actor from './Components/Actor';
import Shows from './Components/Shows';
function App() {

  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    console.log(selected);
    if (selected === null) {
      setSelected(true);
    } else if (selected === true) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  };
  return (
    <div className='main-2'>
      <p className='header-item-1'>SHOW Reviews</p>
      <div className="App">
        <div className='header'>
          <div className='header-details'>
            
            <p className='header-item-2' >Search your favourite shows</p><br />
            <p className='choice' style={{ color: "white" }}>Please Select Your Choice</p>
            <div className='radio-input'>
              By Actors <input type="radio" value={selected} checked={selected === true} onChange={handleChange} />

              By Shows <input type="radio" value={selected} checked={selected === false} onChange={handleChange} />

            </div>
          </div>
        </div>
      
      <div className='shows-display'>{selected === true ? <Actor /> : " "}
        {selected === false ? <Shows /> : " "}</div>
      
      </div>
    </div>
  );
}

export default App;
