"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

export default function CoursePage() {
  const router = useRouter();

  // ✅ DIRECT API ENDPOINT (HARDCODED)
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_URL,"1111")
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // ✅ FETCH COURSES (SAFE)
  const fetchCourses = async () => {
    setLoading(true);
     console.log(`${API_URL}/api/admin/courses`,"22")
    try {
      const res = await fetch(`${API_URL}/api/admin/courses`, {
       
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();
      console.log("Courses API response:", data);

      // ✅ ALWAYS SET ARRAY
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (Array.isArray(data.data)) {
        setCourses(data.data);
      } else if (Array.isArray(data.courses)) {
        setCourses(data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Fetch courses error:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE COURSE
  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      fetchCourses();
    } catch (error) {
      console.error("Delete course error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Course Management</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          ➕ Add Course
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.isArray(courses) &&
            courses.map((c) => (
              <div
                key={c.id}
                onClick={() => router.push(`/course/${c.id}`)}
                className="bg-white rounded-2xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition relative"
              >
                {/* STATUS */}
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

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCourse(c);
                    }}
                    className="px-3 py-1 text-sm rounded hover:bg-emerald-200"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(c.id);
                    }}
                    className="px-3 py-1 text-sm rounded hover:bg-red-200"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ADD MODAL */}
      {showAdd && (
        <AddCourseModal
          onClose={() => setShowAdd(false)}
          onSuccess={fetchCourses}
        />
      )}

      {/* EDIT MODAL */}
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
