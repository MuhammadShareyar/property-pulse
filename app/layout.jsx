import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";
import { MessageCountProvider } from "@/context/MessageCountContext";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property Pulse",
  description: "Find the best property near you!",
  keywords: "real estate, property, rental, housing, rest rooms",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <MessageCountProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessageCountProvider>
    </AuthProvider>
  );
};

export default MainLayout;
