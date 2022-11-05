import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/topbar/TopBar";
import "./App.css";
import {Outlet } from "react-router-dom";


function App() {
    return (
        <>
            <TopBar />
            <div className="container">
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
}

export default App;
