import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artifactAPI } from '../services/api';
import Artifact3DViewer from '../components/Artifact3DViewer';

const RARITY_COLOR = { Common: 'text-gray-300', Rare: 'text-blue-300', Legendary: 'text-yellow-300' };

export default function ArtifactDetail() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState('info'); // 'info' | '3d'

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await artifactAPI.getById(id);
        setArtifact(data);
      } catch { /* handled below */ }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen star-bg flex items-center justify-center">
      <div className="text-xenova-blue font-orbitron animate-pulse tracking-widest">LOADING ARTIFACT...</div>
    </div>
  );

  if (!artifact) return (
    <div className="min-h-screen star-bg flex items-center justify-center">
      <div className="text-center">
        <p className="font-orbitron text-red-400 mb-4">ARTIFACT NOT FOUND</p>
        <Link to="/artifacts" className="btn-neon">Back to Gallery</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-orbitron text-gray-600 mb-8">
          <Link to="/" className="hover:text-xenova-blue transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/artifacts" className="hover:text-xenova-blue transition-colors">GALLERY</Link>
          <span>/</span>
          <span className="text-xenova-blue">{artifact.name.toUpperCase()}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: viewer */}
          <div className="glass-card overflow-hidden">
            {/* Tab switcher */}
            <div className="flex border-b border-xenova-blue/20">
              {['info', '3d'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 font-orbitron text-xs tracking-widest transition-all ${
                    tab === t ? 'text-xenova-blue border-b-2 border-xenova-blue' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t === 'info' ? 'IMAGE' : '3D VIEWER'}
                </button>
              ))}
            </div>

            <div className="h-80 md:h-96">
              {tab === 'info' ? (
                artifact.image ? (
                  <img src={artifact.image} alt={artifact.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-xenova-navy text-xenova-blue/30 font-orbitron">
                    NO IMAGE
                  </div>
                )
              ) : (
                <Artifact3DViewer category={artifact.category} />
              )}
            </div>
          </div>

          {/* Right: info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-orbitron border border-xenova-blue/30 px-2 py-0.5 text-xenova-blue/70">
                  {artifact.category}
                </span>
                <span className={`text-xs font-orbitron ${RARITY_COLOR[artifact.rarity]}`}>
                  ◆ {artifact.rarity}
                </span>
              </div>
              <h1 className="font-orbitron text-3xl font-bold neon-text">{artifact.name}</h1>
            </div>

            <p className="text-gray-300 leading-relaxed">{artifact.description}</p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Origin Planet',   value: artifact.originPlanet    },
                { label: 'Discovery Year',  value: artifact.discoveredYear  },
                { label: 'Category',        value: artifact.category        },
                { label: 'Rarity',          value: artifact.rarity          },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card p-3">
                  <p className="text-xs font-orbitron text-gray-500 tracking-wider">{label}</p>
                  <p className="text-sm text-white font-medium mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Link to="/artifacts" className="btn-neon flex-1 text-center text-sm">
                ← Back to Gallery
              </Link>
              <button
                onClick={() => setTab(tab === '3d' ? 'info' : '3d')}
                className="btn-purple flex-1 text-sm"
              >
                {tab === '3d' ? 'View Image' : 'View 3D'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
