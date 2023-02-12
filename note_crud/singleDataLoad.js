import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Update = () => {
    // { single data load
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect( ()=>{
        const url = `http://localhost:5000/data/${id}`;
        fetch(url)
        .then(res=> res.json())
        .then(data => setUser(data) );
    },  [])
    // }


    return (
        <div>
            <h1>update user: {user.name} </h1>
            <p>id: {id}</p>
            
        </div>
    );
};

export default Update;