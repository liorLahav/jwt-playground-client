import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
// ... שאר האימפורטים שלך

// קומפוננטה עוטפת שמכילה את ההדר
const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default RootLayout;