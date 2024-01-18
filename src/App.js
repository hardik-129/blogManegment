import {
  BrowserRouter,
} from "react-router-dom";
import './App.css';
import Route from './router/Routepage';

function App() {
  return (
    <>
        <BrowserRouter>
          <Route/>
        </BrowserRouter>
  </>
  )
  
}

export default App;
