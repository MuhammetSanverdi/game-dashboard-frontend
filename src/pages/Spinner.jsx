import React, { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import '../assets/css/spinner.css';

const Spinner = ({ isLoading }) => {
  console.log(isLoading);
  useEffect(()=>{},[isLoading])
  return (
    <div className={`fullscreen-loader ${isLoading ? 'visible' : 'hidden'}`}>
      <PacmanLoader color="#F7780B" loading={isLoading} size={30} />
    </div>
  );
};

export default Spinner;