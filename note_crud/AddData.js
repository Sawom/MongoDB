import React, { useState } from 'react';

const AddData = () => {
    const [user, setUser] = useState({});
    // add data
    const handleAddUser = event =>{
        event.preventDefault();
        console.log(user);
        // client to server fetch e 3 ta part thake
        // address ta database er sathe same hote hoy
        fetch('http://localhost:5000/data', {
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
                event.target.reset();
            }
        })
       
    }  // end

    // data input from form
    const handleInputBlur = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }
    
    return (
        <div>
            <h2>add data</h2>
            {/* data collect form   */}
            <form onSubmit={handleAddUser} >
                <input onChange={handleInputBlur} type="text" name='name' placeholder='name' /> <br />
                <input onChange={handleInputBlur} type="text" name='address' placeholder='address' /> <br />
                {/* defaultValue={user.email || ''} eta likhle zodi user login thake tokhn email ta show kore
                input box e kintu database e save korbe na. onChange dile database e save hoy  */}
                <input onChange={handleInputBlur} type="email" name='email' placeholder='email' /> <br /> <br />
                <button type="submit" >add user</button>
            </form>
        </div>
    );
};

export default AddData;
