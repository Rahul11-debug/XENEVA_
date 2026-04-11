import { useState, useEffect } from 'react';
import { artifactAPI } from '../services/api';
import ArtifactCard from '../components/ArtifactCard';

const CATEGORIES = ['All', 'Weapon', 'Communication', 'Navigation', 'Ritual', 'Technology', 'Biology', 'Unknown'];

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All');
  const [error, setError]         = useState('');

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      const { data } = await artifactAPI.getAll({ search, category });
      setArtifacts(data);
    } catch {
      setError('Failed to load artifacts. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArtifacts(); }, [search, category]);

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-widest text-xenova-blue/60 mb-3">COLLECTION · {artifacts.length} ITEMS</p>
          <h1 className="section-title text-4xl md:text-5xl mb-4">Artifact Gallery</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Recovered relics from across the Xenova star systems, cataloged and preserved for study.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xenova-blue/50 font-orbitron">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artifacts, planets..."
              className="w-full bg-xenova-card border border-xenova-blue/20 rounded px-4 py-2.5 pl-9
                         text-white placeholder-gray-600 text-sm focus:outline-none focus:border-xenova-blue/60
                         focus:shadow-neon transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs font-orbitron tracking-wider px-3 py-2 border rounded transition-all duration-200 ${
                  category === cat
                    ? 'border-xenova-blue bg-xenova-blue/20 text-xenova-blue'
                    : 'border-xenova-blue/20 text-gray-500 hover:border-xenova-blue/40 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {error ? (
          <div className="glass-card p-8 text-center text-red-400 font-orbitron">{error}</div>
        ) : loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="glass-card h-72 animate-pulse" />
            ))}
          </div>
        ) : artifacts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-orbitron text-4xl text-xenova-blue/20 mb-4">◈</p>
            <p className="font-orbitron text-gray-500 tracking-widest">NO ARTIFACTS FOUND</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {artifacts.map((a) => <ArtifactCard key={a._id} artifact={a} />)}
          </div>
        )}
      </div>
    </div>
  );
}
