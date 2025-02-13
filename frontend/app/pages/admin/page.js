"use client";
import { fetchProfile, getPendingApplications, createCourse, getAllCourses } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") return router.push("/pages/login");

    fetchProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => router.push("/pages/login"));

    getPendingApplications(token)
      .then(({ data }) => setApplications(data))
      .catch((err) => console.log(err));

    getAllCourses(1, 10, token)
      .then(({ data }) => setCourses(data.courses))
      .catch((err) => console.log(err));
  }, []);

  const handleAddCourse = async () => {
    const token = localStorage.getItem("token");
    if (!newCourse) return alert("Course name cannot be empty!");

    try {
      await createCourse({ name: newCourse }, token);
      setNewCourse("");
      getAllCourses(1, 10, token)
        .then(({ data }) => setCourses(data.courses))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return user ? (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">Manage users, applications, and system settings.</p>

        {/* View Applications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Applications</h2>
          {applications.length > 0 ? (
            <ul className="space-y-3">
              {applications.map((app) => (
                <li
                  key={app._id}
                  className="bg-gray-50 p-4 rounded-md shadow-sm border hover:shadow-md transition"
                >
                  <span className="font-semibold text-gray-800">{app.studentId.name}</span> -{" "}
                  <span className="text-blue-600">{app.course}</span> <br />
                  <span className="text-sm text-gray-500">Status: {app.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No pending applications.</p>
          )}
        </div>

        {/* Add Courses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Course</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              placeholder="Enter course name"
              className="border p-2 rounded-md w-full"
            />
            <button
              onClick={handleAddCourse}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Display Courses */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Courses</h2>
          {courses.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="bg-gray-50 p-4 rounded-md shadow-sm border hover:shadow-md transition"
                >
                  {course.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No courses available.</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading...</p>
  );
}
