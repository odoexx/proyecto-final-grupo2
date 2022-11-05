import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './components/inicio';
import Integrantes from "./components/integrantes";
import Arkanoid from './components/arkanoid';
import Despedida from "./components/despedida";
import BarraNav from './routes/barraNav';
import Error from './components/error';
import Memotest from './components/memotest/memotest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< BarraNav />}>
            <Route index element={<Inicio />} />
            <Route path='arkanoid' element={<Arkanoid />} />
            <Route path='memotest' element={<Memotest />} />
            <Route path='integrantes' element={<Integrantes />} />
            <Route path='despedida' element={<Despedida />} />
            <Route path='error' element={<Error />} />

            <Route path='*' element={<Navigate replace to="error" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;