import React from 'react'
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Student from "./pages/Student";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path={"/"} element={<Home/>}/>
                <Route exact path={"/registration"} element={<Register/>}/>
                <Route exact path={"/login"} element={<Login/>}/>
                <Route exact path={'/students/:id'} element={<Student/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
