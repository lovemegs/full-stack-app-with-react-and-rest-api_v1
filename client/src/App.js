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
// import UserSignIn from './components/UserSignIn';
// import UserSignUp from './components/UserSignUp';
// import UserSignOut from './components/UserSignOut';
import Header from './components/Header';

// import { ContextProvider } from './context/Context';


function App() {
  return (
    <Router>
      {/* <ContextProvider> */}
        <Header />

        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/courses/create' element={<CreateCourse />} />
          <Route path='/courses/:id/update' element={<UpdateCourse />} />
          {/* <Route path='/courses/signup' element={<UserSignUp />} /> */}
        </Routes>
      {/* </ContextProvider> */}
    </Router>
  );
}

export default App;