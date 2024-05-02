import React,{useEffect} from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.clear();
        window.location.href = '/login';
    }, []);
  return (
    <div>
      
    </div>
  );
}

export default Logout;