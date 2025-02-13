"use client"
import { useState } from "react";

import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.role === "admin") router.push("/pages/admin");
    else if (data.role === "agent") router.push("/pages/agent");
    else router.push("/pages/student");
      
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 mt-2 w-full" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 mt-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full">Login</button>
      </form>
    </div>
  );
}
