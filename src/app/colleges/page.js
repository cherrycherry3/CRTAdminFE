"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Globe,
  MapPin,
  X,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CollegePage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    country: "India",
    established_year: "",
    is_active: true,
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_BASE_URL}/api/admin/colleges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setColleges(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({
      name: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      city: "",
      state: "",
      country: "India",
      established_year: "",
      is_active: true,
    });
    setShowModal(true);
  };

  const openEditModal = (college) => {
    setIsEdit(true);
    setEditId(college.id);
    setForm({
      name: college.name,
      description: college.description,
      email: college.email,
      phone: college.phone,
      website: college.website,
      city: college.city,
      state: college.state,
      country: college.country,
      established_year: college.established_year,
      is_active: college.is_active,
    });
    setShowModal(true);
  };

  /* ================= SUBMIT ================= */
  const submitCollege = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const url = isEdit
      ? `${API_BASE_URL}/api/admin/colleges/${editId}`
      : `${API_BASE_URL}/api/admin/colleges`;

    const method = isEdit ? "PUT" : "POST";

    const payload = isEdit
      ? {
          name: form.name,
          description: form.description,
          email: form.email,
          phone: form.phone,
          website: form.website,
          city: form.city,
          state: form.state,
          country: form.country,
          established_year: Number(form.established_year),
          is_active: form.is_active,
        }
      : {
          ...form,
          established_year: Number(form.established_year),
        };

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      alert("Validation error while saving college");
      return;
    }

    setShowModal(false);
    fetchColleges();
  };

  /* ================= DELETE ================= */
  const deleteCollege = async (id) => {
    if (!confirm("Delete this college?")) return;
    const token = localStorage.getItem("access_token");

    await fetch(`${API_BASE_URL}/api/admin/colleges/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchColleges();
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🏫 College Management</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} /> Add College
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((c) => (
            <div
              key={c.id}
              className="bg-white border rounded-2xl p-5 shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{c.name}</h2>
                  <p className="text-sm text-gray-500">{c.code}</p>
                </div>

                <span className="text-xs px-1 py-1 rounded-full bg-white-100 text-green-400">
                  {c.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {c.description}
              </p>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p className="flex gap-2"><Mail size={14}/> {c.email}</p>
                <p className="flex gap-2"><Phone size={14}/> {c.phone}</p>
                <p className="flex gap-2"><Globe size={14}/> {c.website}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={14}/> {c.city}, {c.state}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-2 border rounded-lg"
                  >
                    <Pencil size={16}/>
                  </button>
                  <button
                    onClick={() => deleteCollege(c.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4">
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Update College" : "Add College"}
            </h2>

            <form
              onSubmit={submitCollege}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                "name",
                "email",
                "phone",
                "website",
                "city",
                "state",
                "country",
                "established_year",
              ].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={form[f]}
                  onChange={handleChange}
                  placeholder={f.replace("_", " ").toUpperCase()}
                  className="input"
                  required
                />
              ))}

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="md:col-span-2 input"
              />

              {/* Active toggle */}
              <label className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                Active
              </label>

              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                {isEdit ? "Update College" : "Save College"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 8px 10px;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
