import React, { useEffect } from 'react'
import { axiosGetAdmins } from '../../../hooks/admin/crudAdmin';

const Admins = () => {
  async function getAdmin() {
    const allAdmin = await axiosGetAdmins();
    console.log("ADMINS:", allAdmin)
  }
  useEffect(() => {
    axiosGetAdmins();
  }, []);
  return (
    <div>
      <button onClick={getAdmin} >lLLAMAR</button>
    </div>
  );
}

export default Admins;