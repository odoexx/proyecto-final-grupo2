import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './components/inicio';
import Integrantes from "./components/integrantes";
import Juego from './components/arkanoid/arkanoid';
import Despedida from "./components/despedida";
import BarraNav from './routes/barraNav';
import Error from './components/error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< BarraNav />}>
            <Route index element={<Inicio />} />
            <Route path='juego' element={<Juego />} />
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