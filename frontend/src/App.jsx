import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar    from './components/Navbar';
import StarField from './components/StarField';

import Home           from './pages/Home';
import Artifacts      from './pages/Artifacts';
import ArtifactDetail from './pages/ArtifactDetail';
import Timeline       from './pages/Timeline';
import Decoder        from './pages/Decoder';
import Map            from './pages/Map';
import Quiz           from './pages/Quiz';
import About          from './pages/About';
import Login          from './pages/Login';
import Profile        from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

// Protect admin route
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user)            return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <StarField />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            {/* Public routes — visitors and guests can access all */}
            <Route path="/"              element={<Home />}           />
            <Route path="/artifacts"     element={<Artifacts />}      />
            <Route path="/artifacts/:id" element={<ArtifactDetail />} />
            <Route path="/timeline"      element={<Timeline />}       />
            <Route path="/decoder"       element={<Decoder />}        />
            <Route path="/map"           element={<Map />}            />
            <Route path="/quiz"          element={<Quiz />}           />
            <Route path="/about"         element={<About />}          />
            <Route path="/login"         element={<Login />}          />
            <Route path="/register"      element={<Login />}          />

            {/* Visitor profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Admin only */}
            <Route path="/admin" element={
              <AdminRoute><AdminDashboard /></AdminRoute>
            } />

            <Route path="*" element={
              <div className="min-h-screen star-bg flex items-center justify-center">
                <div className="text-center">
                  <p className="font-orbitron text-6xl text-xenova-blue/20 mb-4">404</p>
                  <p className="font-orbitron text-gray-500 tracking-widest mb-6">SECTOR NOT FOUND</p>
                  <a href="/" className="btn-neon">Return to Archive</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
