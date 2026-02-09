"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

export default function CoursePage() {
  const API_URL = "http://127.0.0.1:8000/api/admin/courses";
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const fetchCourses = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Course Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          ➕ Add Course
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              onClick={() => router.push(`/course/${c.id}`)}
              className="bg-white rounded-2xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition relative"
            >
              {/* Status */}
              <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                Active
              </span>

              <h2 className="text-xl font-bold mb-1">{c.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                {c.course_code}
              </p>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {c.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1">
                <div>📂 Category: {c.category}</div>
                <div>🎯 Level: {c.level}</div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditCourse(c);
                  }}
                  className="px-3 py-1 text-sm bg-white-200 rounded hover:bg-emerald-200"
                >
                  ✏️ 
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(c.id);
                  }}
                  className="px-3 py-1 text-sm bg-white-200 rounded hover:bg-red-200"
                >
                  🗑 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAdd && (
        <AddCourseModal
          onClose={() => setShowAdd(false)}
          onSuccess={fetchCourses}
        />
      )}

      {editCourse && (
        <EditCourseModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onSuccess={fetchCourses}
        />
      )}
    </div>
  );
}
