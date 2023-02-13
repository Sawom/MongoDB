import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import AddData from './Components/AddData/AddData';
import Update from './Update/Update';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={ <Home></Home> } ></Route>
        <Route path='/home' element={ <Home></Home> } ></Route>
        <Route path='/add' element={ <AddData></AddData> } ></Route>
        <Route path='/data/update/:id' element={ <Update></Update> } ></Route>
      </Routes>
    </div>
  );
}

export default App;
