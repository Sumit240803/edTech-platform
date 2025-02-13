import { fetchProfile } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") return router.push("/pages/login");

    fetchProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => router.push("/pages/login"));
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.name}! (Admin Dashboard)</h1>
      <p>Manage users, applications, and system settings.</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
