import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // data load kortechi tar jnno state
    const [users,setUsers] = useState([]);

    // data load korar api ta call dilam
    // read kortechi
    useEffect(()=>{
        fetch('http://localhost:5000/data')
        .then(res => res.json())
        .then(data => setUsers(data) );
    }, []) // end

    const handleDeleteUser = id =>{
        fetch(`http://localhost:5000/data/${id}`, {
            method : 'DELETE'
        })
            .then(res => res.json())
            .then( data => {
                if(data.deletedCount > 0) {
                alert('deleted successfully'); // data delete hoile msg opore dibe
                const remainingUsers = users.filter(user => user._id !== id );
                setUsers(remainingUsers);
                    }
                } )
            }

    return (
        <div>
            <h1>this is home</h1>
            <h3>data = {users.length} </h3>
            {/* data load kore list kortechi */}
            <ul>
                {
                    users.map( user => <li key={user._id} > {user.name} ,
                     {user.email} {user.address} 
                     <Link to={`/data/update/${user._id}`} > 
                        <button>update</button>
                     </Link>
                     <button onClick={ ()=> handleDeleteUser(user._id) } >X</button> 
                     </li> )
                }
            </ul>
        </div>
    );
};

export default Home;