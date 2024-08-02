import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Footer, Home, Locations, Navbar, Roster, Schedule, Stats, AllStar } from './Components';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    let data = localStorage.getItem("Data");
    if (!data || Math.ceil(Math.abs(new Date() - new Date(data.Date)) / (1000 * 60 * 60 * 24)) <= 5) {
      const today = new Date();
      if(!data) data = {};
      data.Date = today.toISOString();

      const firebaseConfig = {
        apiKey: "AIzaSyBm_8Kd9okK-rG67eBL2OIw1Cu_WC2N48Q",
        authDomain: "sabl-rockies.firebaseapp.com",
        databaseURL: "https://sabl-rockies-default-rtdb.firebaseio.com",
        projectId: "sabl-rockies",
        storageBucket: "sabl-rockies.appspot.com",
        messagingSenderId: "819552489554",
        appId: "1:819552489554:web:77e31bc917bb3697e60f8b",
        measurementId: "G-EJPXMDQPK0"
      };
      const app = initializeApp(firebaseConfig);
      const dbRef = ref(getDatabase(app));

      // Fetch Schedule
      get(child(dbRef, `Schedule`)).then((snapshot) => {
        if (snapshot.exists()) {
          data.Schedule = snapshot.val();
        }

        // Fetch Roster
        get(child(dbRef, `Roster`)).then((snapshot) => {
          if (snapshot.exists()) {
            data.Roster = snapshot.val();
          }
          localStorage.setItem("Data", JSON.stringify(data));
        });
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/allstar" element={<AllStar />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
