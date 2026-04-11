import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { artifactAPI } from "../services/api";

const CATEGORIES = [
  "Weapon",
  "Communication",
  "Navigation",
  "Ritual",
  "Technology",
  "Biology",
  "Unknown",
];
const RARITIES = ["Common", "Rare", "Legendary"];

const EMPTY_FORM = {
  name: "",
  description: "",
  image: "",
  category: "Technology",
  originPlanet: "",
  discoveredYear: 2200,
  rarity: "Common",
};

export default function AdminDashboard() {
  const { isAdmin, user } = useAuth();

  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg] = useState("");

  if (!isAdmin) return <Navigate to="/login" replace />;

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await artifactAPI.getAll({});
      setArtifacts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (a) => {
    setEditId(a._id);
    setForm({
      name: a.name,
      description: a.description,
      image: a.image,
      category: a.category,
      originPlanet: a.originPlanet,
      discoveredYear: a.discoveredYear,
      rarity: a.rarity,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));

      if (editId) {
        await artifactAPI.update(editId, payload);
        flash("✓ Artifact updated successfully");
      } else {
        await artifactAPI.create(payload);
        flash("✓ Artifact created successfully");
      }
      setShowForm(false);
      setEditId(null);
      fetchAll();
    } catch (err) {
      flash("✗ " + (err.response?.data?.message || "Save failed"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await artifactAPI.delete(id);
      flash("✓ Artifact deleted");
      setDeleteId(null);
      fetchAll();
    } catch {
      flash("✗ Delete failed");
    }
  };

  const field = (key, label, type = "text", extra = {}) => (
    <div key={key}>
      <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          rows={3}
          required
          className="w-full bg-xenova-navy border border-xenova-blue/20 rounded px-3 py-2
                     text-white text-sm focus:outline-none focus:border-xenova-blue/50 resize-none"
          {...extra}
        />
      ) : type === "select" ? (
        <select
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full bg-xenova-navy border border-xenova-blue/20 rounded px-3 py-2
                     text-white text-sm focus:outline-none focus:border-xenova-blue/50"
        >
          {extra.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          required={extra.required !== false}
          className="w-full bg-xenova-navy border border-xenova-blue/20 rounded px-3 py-2
                     text-white text-sm focus:outline-none focus:border-xenova-blue/50"
          {...extra}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen star-bg pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-orbitron text-xs text-xenova-blue/60 tracking-widest mb-1">
              ADMIN CONSOLE · {user?.username?.toUpperCase()}
            </p>
            <h1 className="section-title text-3xl">Admin Dashboard</h1>
          </div>
          <button onClick={openAdd} className="btn-neon whitespace-nowrap">
            + Add Artifact
          </button>
        </div>

        {/* Flash message */}
        {msg && (
          <div
            className={`mb-6 p-3 rounded border font-orbitron text-xs text-center tracking-widest ${
              msg.startsWith("✓")
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {msg}
          </div>
        )}

        {showForm && (
          <div className="glass-card p-8 mb-10 border-xenova-blue/30 shadow-neon">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron text-lg text-xenova-blue">
                {editId ? "Edit Artifact" : "New Artifact"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-5">
              {field("name", "ARTIFACT NAME")}
              {field("originPlanet", "ORIGIN PLANET")}
              {field("category", "CATEGORY", "select", { options: CATEGORIES })}
              {field("rarity", "RARITY", "select", { options: RARITIES })}
              {field("discoveredYear", "DISCOVERED YEAR", "number", {
                min: 2100,
                max: 2300,
              })}
              {field("image", "IMAGE URL", "text", {
                required: false,
                placeholder: "https://...",
              })}
              <div className="md:col-span-2">
                {field("description", "DESCRIPTION", "textarea")}
              </div>

              <div className="md:col-span-2 flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-neon opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-purple disabled:opacity-50"
                >
                  {saving
                    ? "SAVING..."
                    : editId
                      ? "UPDATE ARTIFACT"
                      : "CREATE ARTIFACT"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Artifacts", value: artifacts.length },
            {
              label: "Legendary",
              value: artifacts.filter((a) => a.rarity === "Legendary").length,
            },
            {
              label: "Rare",
              value: artifacts.filter((a) => a.rarity === "Rare").length,
            },
            {
              label: "Common",
              value: artifacts.filter((a) => a.rarity === "Common").length,
            },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className="font-orbitron text-2xl font-bold neon-text">
                {value}
              </p>
              <p className="font-orbitron text-xs text-gray-500 tracking-widest mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-xenova-blue/10 flex items-center justify-between">
            <h2 className="font-orbitron text-sm text-gray-300 tracking-widest">
              ARTIFACT CATALOG
            </h2>
            <span className="text-xs text-gray-600 font-orbitron">
              {artifacts.length} ENTRIES
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center font-orbitron text-xenova-blue/50 animate-pulse tracking-widest">
              LOADING...
            </div>
          ) : artifacts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 font-orbitron tracking-widest">
                NO ARTIFACTS. ADD ONE ABOVE.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-xenova-blue/10">
                    {[
                      "Name",
                      "Category",
                      "Planet",
                      "Year",
                      "Rarity",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-orbitron text-xs text-gray-500 tracking-widest"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {artifacts.map((a) => (
                    <tr
                      key={a._id}
                      className="border-b border-xenova-blue/5 hover:bg-xenova-blue/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-medium">
                        {a.name}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{a.category}</td>
                      <td className="px-4 py-3 text-gray-400">
                        {a.originPlanet}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {a.discoveredYear}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-orbitron ${
                            a.rarity === "Legendary"
                              ? "text-yellow-300"
                              : a.rarity === "Rare"
                                ? "text-blue-300"
                                : "text-gray-400"
                          }`}
                        >
                          {a.rarity}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(a)}
                            className="text-xs font-orbitron text-xenova-blue/70 hover:text-xenova-blue
                                       border border-xenova-blue/20 hover:border-xenova-blue/50
                                       px-3 py-1 rounded transition-all"
                          >
                            EDIT
                          </button>
                          {deleteId === a._id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(a._id)}
                                className="text-xs font-orbitron text-red-400 border border-red-400/30
                                           hover:bg-red-400/10 px-2 py-1 rounded"
                              >
                                CONFIRM
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="text-xs text-gray-500 hover:text-gray-300 px-2"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteId(a._id)}
                              className="text-xs font-orbitron text-red-500/60 hover:text-red-400
                                         border border-red-500/20 hover:border-red-400/40
                                         px-3 py-1 rounded transition-all"
                            >
                              DELETE
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
