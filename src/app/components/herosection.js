import "./globals.css";
import Sidebar from "./components/sidebar";
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
 
        {/* Right side content */}
        <div className="ml-64 p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
 
 