import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Property Pulse",
  description: "Find the best property near you!",
  keywords: "real estate, property, rental, housing, rest rooms",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
};

export default MainLayout;
