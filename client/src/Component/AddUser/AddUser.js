import React, { useState } from 'react';

const AddUser = () => {
    const[user,setUser] = useState({});
    
    const handleAdduser = event =>{
        event.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data => {
            if(data.acknowledged){
                alert('user added');
                event.target.reset()
            }
            console.log(data)})
    }

    const handleInput = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div className='App'>
            <h3>add a new user</h3>
            <form onSubmit={handleAdduser} >
                <input onBlur={handleInput}  type="text" name='name' placeholder='name'  /> <br />
                <input onBlur={handleInput} type="email" name='email' placeholder='email'  /> <br />
                <button type='submit'> Add user </button>
            </form>
        </div>
    );
};

export default AddUser;