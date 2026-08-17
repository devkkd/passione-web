"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ProtectedAdmin({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        const response = await api.get("/auth/me");

        if (!mounted) return;

        if (response.data?.success) {
          setAuthenticated(true);
        } else {
          router.replace("/admin/login");
        }
      } catch (error) {
        if (!mounted) return;

        console.error("Admin authentication failed:", error);

        router.replace("/admin/login");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, [router]);

  // Authentication check hone tak page mat dikhao
  if (loading) {
    return (
      <div className="admin-auth-loading">
        <div className="admin-loader" />
        <p>Checking authentication...</p>

        <style jsx>{`
          .admin-auth-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #f7f5ef;
            color: #222;
            font-family: Arial, sans-serif;
          }

          .admin-loader {
            width: 32px;
            height: 32px;
            border: 2px solid #ddd;
            border-top-color: #1b807f;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 14px;
          }

          .admin-auth-loading p {
            margin: 0;
            font-size: 13px;
            color: #777;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Agar authenticated nahi hai
  if (!authenticated) {
    return null;
  }

  // Agar authenticated hai
  return children;
}