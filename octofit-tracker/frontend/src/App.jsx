import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <nav style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ margin: '0 0 1rem 0' }}>🐙 OctoFit Tracker</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
              <Link to="/users" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Users</Link>
              <Link to="/teams" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Teams</Link>
              <Link to="/activities" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Activities</Link>
              <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Leaderboard</Link>
              <Link to="/workouts" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Workouts</Link>
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Track your workouts, compete with teams, and crush your fitness goals!</p>
      <p>Select a section from the navigation above to get started.</p>
    </div>
  );
}

export default App;
