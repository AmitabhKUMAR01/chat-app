import  { useState, useEffect } from 'react';

const LocalStorageHandle = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UseEffect to load data from session storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('myEmail');
    const storedPassword = localStorage.getItem('myPassword');

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // Function to handle email and password input and store in session storage
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
      localStorage.setItem('myEmail', value);
    } else if (name === 'password') {
      setPassword(value);
      localStorage.setItem('myPassword', value);
    }
  };

  return (
    <div>
      <h1>Session Storage Example</h1>
      <label>
        Email:
        <input className='text-black'type="text" name="email" value={email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input className='text-black'type="password" name="password" value={password} onChange={handleInputChange} />
      </label>
    </div>
  );
};

export default LocalStorageHandle;
