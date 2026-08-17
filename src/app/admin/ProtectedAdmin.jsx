"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ProtectedAdmin({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data?.success) {
          setAuthenticated(true);
        } else {
          router.replace("/admin/login");
        }
      } catch (error) {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f5ef",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return children;
}