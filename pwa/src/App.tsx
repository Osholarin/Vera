import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { FieldMap } from './pages/FieldMap';
import { SoilHealth } from './pages/SoilHealth';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <NavLink to="/" className="logo">
            <Leaf color="var(--color-primary)" />
            Vera PWA
          </NavLink>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/map" className={({ isActive }) => (isActive ? 'active' : '')}>
              Field Map
            </NavLink>
            <NavLink to="/health" className={({ isActive }) => (isActive ? 'active' : '')}>
              Soil Health
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<FieldMap />} />
            <Route path="/health" element={<SoilHealth />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
