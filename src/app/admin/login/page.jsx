"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      if (response.data?.success) {
        router.replace("/admin/dashboard");
        router.refresh();
      } else {
        setError(
          response.data?.message || "Login failed."
        );
      }
    } catch (error) {
      console.error("Admin Login Error:", error);

      setError(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-logo">
          PASSIONE
          <span>JEWELRY ADMIN</span>
        </div>

        <div className="admin-login-heading">
          <h1>Admin Login</h1>

          <p>
            Sign in to manage your Passione Jewelry store.
          </p>
        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter admin email"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          box-sizing: border-box;
          background: #f7f5ef;
        }

        .admin-login-card {
          width: 100%;
          max-width: 430px;
          background: #ffffff;
          border: 1px solid #e5e1d8;
          padding: 45px;
          box-sizing: border-box;
          box-shadow: 0 20px 60px
            rgba(0, 0, 0, 0.08);
        }

        .admin-logo {
          text-align: center;
          color: #1b807f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          letter-spacing: 5px;
          margin-bottom: 35px;
        }

        .admin-logo span {
          display: block;
          margin-top: 7px;
          color: #888;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 3px;
        }

        .admin-login-heading {
          text-align: center;
          margin-bottom: 28px;
        }

        .admin-login-heading h1 {
          margin: 0;
          color: #222;
          font-family: Georgia,
            "Times New Roman", serif;
          font-size: 30px;
          font-weight: 400;
        }

        .admin-login-heading p {
          margin: 10px 0 0;
          color: #777;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.6;
        }

        .admin-login-error {
          margin-bottom: 20px;
          padding: 12px 14px;
          background: #fff1f1;
          border: 1px solid #edcccc;
          color: #b42318;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.5;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-field label {
          color: #333;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        .form-field input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          box-sizing: border-box;
          border: 1px solid #d8d3ca;
          outline: none;
          background: #fff;
          color: #222;
          font-family: Arial, sans-serif;
          font-size: 13px;
        }

        .form-field input:focus {
          border-color: #1b807f;
        }

        .form-field input:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .admin-login-form button {
          width: 100%;
          height: 50px;
          margin-top: 5px;
          border: none;
          background: #1b807f;
          color: #ffffff;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1.5px;
          transition: background 0.2s ease,
            opacity 0.2s ease;
        }

        .admin-login-form button:hover {
          background: #166d6c;
        }

        .admin-login-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 500px) {
          .admin-login-page {
            padding: 18px;
          }

          .admin-login-card {
            padding: 30px 22px;
          }

          .admin-logo {
            font-size: 23px;
          }

          .admin-login-heading h1 {
            font-size: 26px;
          }
        }
      `}</style>
    </main>
  );
}