import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './index.css'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [data, setData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); 
useEffect(() => {
  const fetchData = async () => {
    try { 
      const response = await axios.get('https://api.coincap.io/v2/assets');
      console.log(response);
      if(Array.isArray(response.data.data)){
        setData(response.data.data.slice(0,40));
      }    
    }
    catch(err){
      console.log(err)

    }
  };

  fetchData();
}, []);
console.log(data)



  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      console.log('Регистрация успешна:', response.data);
      alert('Регистрация успешна!');
      setIsRegistered(true); 
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка регистрации!');
    }
  };
  return (
    <div className='registration'>
        <form className='registration_block' onSubmit={handleSubmit}>
             <h1>Регистрация</h1>
          <div>
            <label>Имя пользователя:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form> 
    </div>
  )};
;

export default Register;
