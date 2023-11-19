import React, { useEffect, useState } from 'react';
import Welcome from './pages/Welcome'
import Start from './pages/Start';
import Pendaftaran from './pages/Pendaftaran';
import { HiHome } from 'react-icons/hi'
import { MdGroup } from 'react-icons/md'
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import './App.css';
import Finish from './pages/Finish';
import RiwayatPendaftaran from './pages/RiwayatPendaftaran';
import About from './pages/About';
import JadwalDokter from './pages/JadwalDokter';
import DetailJadwalDokter from './pages/DetailJadwalDokter';
import { AuthContext } from './context/AuthContext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/start" element={<Start />} />
          <Route path="/pendaftaran" element={<Pendaftaran/>}/>
          <Route path="/riwayat_pendaftaran" element={<RiwayatPendaftaran />} />
          <Route path="/finish/:id" element={<Finish />} />
          <Route path="/about" element={<About />} />
          <Route path="/jadwal_dokter" element={<JadwalDokter />} />
          <Route path="/detail_jadwal_dokter/:id" element={<DetailJadwalDokter />} />
        </Routes>
        <footer>
          <NavLink to="/" className="iconWrapper">
            <HiHome className="icon" />
            Home
          </NavLink>
          <NavLink to="/about" className="iconWrapper">
            <MdGroup className="icon" />
            About
          </NavLink>
        </footer>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
