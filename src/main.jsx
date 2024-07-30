
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import SecondPage from "./components/SecondPage"
import Home from "./components/Home";
import "../index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/second_page" element={<SecondPage/>}/>
      </Routes>
    </Router>
)
