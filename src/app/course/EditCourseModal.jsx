"use client";
import React, { useState } from "react";

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const API_URL = "http://127.0.0.1:8000/api/admin/courses";

  const [formData, setFormData] = useState({
    title: course.title || "",
    description: course.description || "",
    category: course.category || "",
    level: course.level || "BEGINNER",
    duration_hours: course.duration_hours || "",
    expected_completion_days: course.expected_completion_days || "",
    thumbnail_url: course.thumbnail_url || "",
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

    const res = await fetch(`${API_URL}/${course.id}`, {
      method: "PUT",
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
      }),
    });

    if (!res.ok) {
      alert("Update failed (validation error)");
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
          <h2 className="text-2xl font-semibold">Edit Course</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="TITLE"
              className="input"
              required
            />

            <input
              value={course.course_code}
              disabled
              className="input bg-gray-100 cursor-not-allowed"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="CATEGORY"
              className="input"
              required
            />

            <select
              name="level"
              value={formData.level}
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
              value={formData.duration_hours}
              onChange={handleChange}
              placeholder="DURATION HOURS"
              className="input"
            />

            <input
              type="number"
              name="expected_completion_days"
              value={formData.expected_completion_days}
              onChange={handleChange}
              placeholder="COMPLETION DAYS"
              className="input"
            />

            <input
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleChange}
              placeholder="THUMBNAIL URL"
              className="input"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="input w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}
