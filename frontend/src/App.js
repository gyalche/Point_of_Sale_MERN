import 'antd/dist/antd.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('Auth')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
