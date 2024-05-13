import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear();
    window.location.reload();
    navigate("/signin");
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <></>;
}

export default Logout;
