import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Passion Jewellery",
  description: "Luxury Jewellery Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}