"use client";
import { fetchProfile, getMyApplications, getAllCourses, createCourse } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") return router.push("/pages/login");

    fetchProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => router.push("/pages/login"));

    getMyApplications(token)
      .then(({ data }) => setApplications(data))
      .catch((err) => console.log(err));

    getAllCourses(1, 10, token)
      .then(({ data }) => setCourses(data.courses))
      .catch((err) => console.log(err));
  }, []);

  const handleEnroll = async (courseName) => {
    const token = localStorage.getItem("token");

    try {
      await createCourse({ name: courseName }, token);
      alert(`Successfully enrolled in ${courseName}`);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  return user ? (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">Here you can view your courses, applications, and enroll in new courses.</p>

       
        

        {/* Submitted Applications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">My Applications</h2>
          {applications.length > 0 ? (
            <ul className="space-y-3">
              {applications.map((app) => (
                <li key={app._id} className="bg-gray-50 p-4 rounded-md shadow-sm border hover:shadow-md transition">
                  <span className="font-semibold text-gray-800">{app.course}</span> <br />
                  <span className="text-sm text-gray-500">Status: {app.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No applications submitted yet.</p>
          )}
        </div>

        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses</h2>
          {courses.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {courses.map((course) => (
                <li key={course._id} className="bg-gray-50 p-4 rounded-md shadow-sm border hover:shadow-md transition">
                  {course.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No courses yet.</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading...</p>
  );
}
