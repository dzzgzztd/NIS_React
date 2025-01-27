import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
import "./App.css";

// Главный компонент приложения, управляющий маршрутами
const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<UserList/>}/>
            <Route path="/users/:id" element={<UserDetails/>}/>
        </Routes>
    </Router>
);

export default App;