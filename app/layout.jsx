import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse",
  description: "Find the best property near you!",
  keywords: "real estate, property, rental, housing, rest rooms",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
