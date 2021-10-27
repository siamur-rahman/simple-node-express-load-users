// import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  const handleAddUsers = e => {
    // console.log(nameRef.current)
    // console.log(nameRef.current.value)

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name: name, email: email }
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })//feth ses holo
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        const addedUsers = data;
        const newUsers = [...users, addedUsers]
        setUsers(newUsers)

      })

    nameRef.current.value = '';
    emailRef.current.value = '';


    e.preventDefault();
  }



  return (
    <div className="App">
      <h2>found users {users.length}</h2>

      <form onSubmit={handleAddUsers}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} placeholder="email" />
        <input type="submit" value="submit" />
      </form>


      <ul>
        {
          users.map(user => <li key={user.id}>
            {user.id}  Name:{''} {user.name}{''} <br /> Email:{''}{user.email}
            <br />
            <br />
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
