import "./globals.css";

import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Passione Gioielli",
  description: "Luxury Jewellery Store",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}