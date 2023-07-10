import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import '../src/styles/reset.css';
import '../src/styles/global.css';


// App Components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Header from './components/Header';
import PrivateRoute from './PrivateRoute'; 


function App() {
  return (
    <Router>
        <Header />
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseDetail />} />
            <Route element={<PrivateRoute />}>
              <Route path='/courses/create' element={<CreateCourse />} />
              <Route path='/courses/:id/update' element={<UpdateCourse />} />
            </Route> 
            <Route path='/signup' element={<UserSignUp />} />
            <Route path='/signin' element={<UserSignIn />} />
            <Route path='/signout' element={<UserSignOut />} />
          </Routes>
    </Router>
  );
}

export default App;