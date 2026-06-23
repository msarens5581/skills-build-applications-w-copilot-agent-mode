import { UsersList } from './components/UsersList';
import { ActivitiesList } from './components/ActivitiesList';

function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🐙 OctoFit Tracker</h1>
      <p>Track workouts, compete with teams, and crush your fitness goals!</p>

      <UsersList />
      <ActivitiesList />
    </main>
  );
}

export default App;

