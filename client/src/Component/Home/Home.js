import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


const Home = () => {
    const users = useLoaderData();
    const [display, setDisplay] = useState(users);

    const handleDelete = user =>{
        const agree = window.confirm(`are you sure want to delete: ${user.name} `);
        if(agree){
            fetch(`http://localhost:5000/users/${user._id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deleteCount > 0){
                    alert('user deleted');
                    const remainUser = display.filter(usr => usr._id !== user._id);
                    setDisplay(remainUser);
                }
            });
        }
    }

    return (
        <div>
            <h1>this is home</h1>
            <h3>user: {users.length} </h3>
            {
                display.map(user => <p key={user._id} >
                    name: {user.name} email: {user.email} 
                    <Link to={`/update/${user._id}`}
                    > <button> update</button> 
                     </Link> 
                    <button onClick={ ()=> handleDelete(user) } >x</button>
                </p> )
            }
        </div>
    );
};

export default Home;