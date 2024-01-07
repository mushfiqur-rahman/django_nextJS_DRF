import React, { useState } from "react";

const dashboard = () => {
    const [whoami, setWhoami] = useState('I dont know!');
    const [error, setError] = useState('');
  
    React.useEffect(() => {
      
      fetch("http://localhost:8000/account/whoami/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then(response => response.json())
      .then((data) => {
          setWhoami(data.username)
      })
      .catch((err) => {
        console.log(err);
        setError("You are not logged in");
      });
     
     }, [])

  return (
    <div className="container mx-auto">
      <div className="max-w-[1240px] mx-auto py-[100px] p-2">
        <div className="grid md:grid-cols-6 gap-8">
          <div className="md:col-start-2 md:col-span-4 rounded-xls">
            <div className="mx-auto justify-center items-center w-full">
              <h2 className="text-lg font-medium mb-4 text-center"> {whoami}fw</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
