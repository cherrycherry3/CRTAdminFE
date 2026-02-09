"use client";
import React, { useState } from "react";

export default function AddCourseModal({ onClose, onSuccess }) {
  const API_URL = "http://127.0.0.1:8000/api/admin/courses";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course_code: "",
    category: "",
    level: "BEGINNER",
    duration_hours: "",
    expected_completion_days: "",
    thumbnail_url: "",
    teacher_id: "",
  });

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        ...formData,
        duration_hours: Number(formData.duration_hours),
        expected_completion_days: Number(
          formData.expected_completion_days
        ),
        teacher_id: Number(formData.teacher_id),
      }),
    });

    if (!res.ok) {
      alert("Validation error");
      return;
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Course</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="TITLE"
              required
              onChange={handleChange}
              className="input"
            />

            <input
              name="course_code"
              placeholder="COURSE CODE"
              required
              onChange={handleChange}
              className="input"
            />

            <input
              name="category"
              placeholder="CATEGORY"
              required
              onChange={handleChange}
              className="input"
            />

            <select
              name="level"
              onChange={handleChange}
              className="input"
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>

            <input
              type="number"
              name="duration_hours"
              placeholder="DURATION HOURS"
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="expected_completion_days"
              placeholder="COMPLETION DAYS"
              onChange={handleChange}
              className="input"
            />

            <input
              name="thumbnail_url"
              placeholder="THUMBNAIL URL"
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="teacher_id"
              placeholder="TEACHER ID"
              required
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            required
            onChange={handleChange}
            className="input w-full"
          />

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Course
          </button>
        </form>
      </div>
    </div>
  );
}
