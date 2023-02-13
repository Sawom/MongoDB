import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Update = () => {
    // { single data load
    const [user, setUser] = useState({name:'' , email:''}); // empty object dile ekta error ashe , undifined dekhay. tai empty string nichi
    const {id} = useParams();

    useEffect( ()=>{
        const url = `http://localhost:5000/data/${id}`;
        fetch(url)
        .then(res=> res.json())
        .then(data => setUser(data) );
    },  [])
    // }



    
    // ...........................update user....................................
    // update name
    const handleNameChange = event =>{
        const updatedName = event.target.value;
        const updatedUser = {name: updatedName , email: user.email, address: user.address};
        setUser(updatedUser);
    }
    // update email
    const handleEmailChange = event =>{
        const updatedEmail = event.target.value;
        const updatedUser = {name: user.name , email: updatedEmail , address: user.address };
        setUser(updatedUser);
    }
    //update address
    const handleAddressChange = event =>{
        const updatedAddress = event.target.value;
        const updatedUser = {name: user.name , email: user.email , address: updatedAddress };
        setUser(updatedUser);
    }
    // update user function
    const handleUpdateUser = event =>{
        const url = `http://localhost:5000/data/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json() )
        .then(data => {
            if(data.modifiedCount > 0 ){
                alert('updated successfully!')
                setUser({});
            }
        })
        event.preventDefault()
    }

    return (
        <div>
            <h1>update user for name: {user.name} email: {user.email} </h1>
            <p>id: {id}</p>
            {/* user update kortechi tar jonno form */}
             <form onSubmit={handleUpdateUser} >
                <input name='name' onChange={handleNameChange} type="text" placeholder='name' defaultValue={user.name || ''} /> <br />
                <input name='address' onChange={handleAddressChange} type="text" placeholder='address' defaultValue={user.address || ''} /> <br />
                <input name='email' onChange={handleEmailChange} type="email" placeholder='email' defaultValue={user.email || ''} /> <br /> <br />
                <button> update</button>
             </form>
            
        </div>
    );
};

export default Update;