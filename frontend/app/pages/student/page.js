"use client"
import { fetchProfile } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") return router.push("/pages/login");

    fetchProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => router.push("/pages/login"));
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.name}! (Student Dashboard)</h1>
      <p>Here you can view your courses, scholarships, and more.</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
