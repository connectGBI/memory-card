import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

function RandomUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(); // Fetch a user when the component mounts
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const userData = response.data.results[0];
      setUser({
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
      setUser(null);
    }
  };

  return (
    <div className="App">
      <h1>Random User</h1>
      <button onClick={fetchUser}>Fetch New User</button>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
}

export default RandomUser;
