import { BrowserRouter as Browser, Navigate, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home.jsx';
import Detail from './components/Detail';
import Form from './components/Form.jsx';
import './App.css';

function App() {
  return (
    <Browser>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<Detail />} />
          <Route path='/form' element={<Form />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Browser>
  );
};

export default App;
