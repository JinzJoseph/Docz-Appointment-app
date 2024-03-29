import { useEffect } from "react";
import axios from "axios";

const Homepages = () => {
 
  //const token  = localStorage.getItem('token'); 
  //console.log(token);
  const getUserData = async() => {
    
    try {
      const res = await axios.post(
        '/api/v1/user/getUserData',
        {},{
          headers:
           {
            Authorization:"Bearer "+localStorage.getItem('token')
          }
        },
      );
      //console.log("User data:", res);

    } catch (error) 
    {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return <div>Homepages</div>;
};

export default Homepages;
