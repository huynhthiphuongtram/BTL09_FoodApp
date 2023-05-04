import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Foods from './components/Foods';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import { Container } from 'react-bootstrap';
// import FoodDetails from './components/FoodDetails';
import Login from './components/Login';
import { useReducer } from 'react';
import userReducer from './reducers/UserReducer';
import UserContext from './configs/Context';

function App() {
  const [user, dispatch] = useReducer(userReducer,null)


  return (
    <UserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Foods />}/>
            {/* <Route path='/food_details/:Id/' element={<FoodDetails/>} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<h3 className='text-success'>This page doesn't exist...</h3>}/>
            
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
