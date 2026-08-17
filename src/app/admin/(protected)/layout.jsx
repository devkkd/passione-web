"use client";

import AdminSidebar from "./AdminSidebar";
import ProtectedAdmin from "../ProtectedAdmin";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedAdmin>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          {children}
        </main>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          background: #f7f5f0;
        }

        .admin-layout {
          width: 100%;
          min-height: 100vh;
          background: #f7f5f0;
        }

        .admin-main {
          margin-left: 280px;
          width: calc(100% - 280px);
          min-height: 100vh;

          padding: 42px 42px 60px;

          background: #f7f5f0;

          overflow-x: hidden;
        }

        @media (max-width: 1100px) {
          .admin-main {
            margin-left: 240px;
            width: calc(100% - 240px);
            padding: 34px 30px 50px;
          }
        }

        @media (max-width: 800px) {
          .admin-main {
            margin-left: 0;
            width: 100%;
            padding: 28px 20px 45px;
          }
        }
      `}</style>
    </ProtectedAdmin>
  );
}