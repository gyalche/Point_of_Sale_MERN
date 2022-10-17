import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
