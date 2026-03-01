import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "NPE Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />

          <div className="main-area">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}