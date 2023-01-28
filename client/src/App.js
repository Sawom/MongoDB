import './App.css';
import { createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import AddUser from './Component/AddUser/AddUser';
import Update from './Update/Update';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home></Home>,
      loader: ()=> fetch('http://localhost:5000/users')
    },
    {
      path: '/users/add',
      element: <AddUser></AddUser>
    },
    {
      path: '/update/:id',
      element: <Update></Update>,
      loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`)
    }
  ]
  )
  
  return (
    <div className="App">
      
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
