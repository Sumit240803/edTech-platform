"use client"
import { fetchProfile } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AgentDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "agent") return router.push("/login");

    fetchProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => router.push("/login"));
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.name}! (Agent Dashboard)</h1>
      <p>Here you can manage student applications and track admissions.</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
