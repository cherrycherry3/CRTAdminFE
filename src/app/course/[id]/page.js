"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const COURSE_API = `http://127.0.0.1:8000/api/admin/courses/${id}`;
  const UPLOAD_API = `http://127.0.0.1:8000/api/admin/courses/${id}/files`;
  const PDFS_API = `http://127.0.0.1:8000/api/admin/courses/${id}/pdfs`;

  const fileInputRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  // upload states
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [durationSeconds, setDurationSeconds] = useState("");

  // pdf viewer
  const [activePdf, setActivePdf] = useState(null);

  const getToken = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // fetch course + pdfs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, pdfRes] = await Promise.all([
          fetch(COURSE_API, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
          fetch(PDFS_API, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
        ]);

        const courseData = await courseRes.json();
        const pdfData = await pdfRes.json();

        setCourse(courseData);
        setPdfs(pdfData.files || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // open system file manager
  const openFileManager = () => {
    fileInputRef.current.click();
  };

  // select file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // upload file
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const queryParams = new URLSearchParams({
      file_title: fileTitle,
      file_description: fileDescription,
      duration_seconds: durationSeconds,
    });

    const res = await fetch(`${UPLOAD_API}?${queryParams.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    // refresh pdf list
    const pdfRes = await fetch(PDFS_API, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const pdfData = await pdfRes.json();
    setPdfs(pdfData.files || []);

    // reset form
    setFile(null);
    setFileTitle("");
    setFileDescription("");
    setDurationSeconds("");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!course) return <p className="p-6">Course not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Course Info */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-6xl mb-6">
        <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
        <p className="text-gray-500 mb-3">{course.course_code}</p>
        <p className="text-gray-700 mb-4">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>📂 Category: {course.category}</div>
          <div>🎯 Level: {course.level}</div>
          <div>⏱ Duration: {course.duration_hours} hrs</div>
          <div>📅 Completion: {course.expected_completion_days} days</div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-6xl mb-6">
        <h2 className="text-2xl font-semibold mb-4">📤 Upload Course PDF</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            placeholder="File Title"
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
            className="input"
          />

          <input
            type="number"
            placeholder="Duration (seconds)"
            value={durationSeconds}
            onChange={(e) => setDurationSeconds(e.target.value)}
            className="input"
          />

          <input
            placeholder="File Description"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            className="input md:col-span-2"
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={openFileManager}
          className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          📂 Choose PDF
        </button>

        {file && (
          <p className="mt-2 text-sm text-green-600">
            Selected file: <b>{file.name}</b>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          ⬆ Upload File
        </button>
      </div>

      {/* PDF LIST */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">
          📄 Course PDFs ({pdfs.length})
        </h2>

        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex justify-between items-center border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-semibold">{pdf.file_title}</h3>
                  <p className="text-sm text-gray-600">{pdf.file_name}</p>
                  <p className="text-sm text-gray-500">{pdf.description}</p>
                  <p className="text-xs text-gray-400">
                    Uploaded:{" "}
                    {new Date(pdf.uploaded_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => setActivePdf(pdf)}
                  className="px-1 py-1 bg-sky-400 text-black rounded hover:bg-sky-500"
                >
                  View PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLEAN PDF VIEWER MODAL */}
      {activePdf && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[75%] h-[90vh] rounded-2xl shadow-lg flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">
                {activePdf.file_title}
              </h2>
              <button
                onClick={() => setActivePdf(null)}
                className="text-2xl font-bold text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            {/* PDF CONTENT (NO TOOLBAR, NO DOWNLOAD) */}
            <iframe
              src={`${activePdf.file_url}#toolbar=0&navpanes=0&scrollbar=1`}
              className="flex-1 w-full border-none"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
