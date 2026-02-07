import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
// ... שאר האימפורטים שלך

// קומפוננטה עוטפת שמכילה את ההדר
const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* כאן ירונדרו העמודים (Login, Posts, etc) */}
      </main>
    </>
  );
};

export default RootLayout;