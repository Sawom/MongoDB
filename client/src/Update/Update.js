import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData();
    
    const[user,setUser] = useState({});
    const handleUpdateUser = event =>{
        event.preventDefault();
        console.log(user);
        fetch(`http://localhost:5000/users/${storeUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount > 0 ){
                alert('user updated');
                console.log(data);
                event.target.reset();
            }
        })
    }

    const handleInputChange = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h2>update : {user.name} </h2>
            <form onSubmit={handleUpdateUser} >
                <input defaultValue={storeUser.name} onChange={handleInputChange}  type="text" name='name' placeholder='name'  /> <br />
                <input defaultValue={storeUser.email} onChange={handleInputChange} type="email" name='email' placeholder='email'  /> <br />
                <button type='submit'> update user </button>
            </form>
        </div>
    );
};

export default Update;