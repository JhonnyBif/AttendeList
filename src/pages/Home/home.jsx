import React, { useState, useEffect } from 'react';
import './home.css'
import { Card } from '../../components/card/card'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/JhonnyBif');
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData()
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Attendace List</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Fodo do Perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Type the name... "
        onChange={e => setStudentName(e.target.value)}
      />
      <button type='button' onClick={handleAddStudent}>Add</button>
      {
        students.map(student =>
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />)
      }
    </div>
  )
}
