import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Locations, Navbar, Roster, Schedule, Stats } from './Components';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
