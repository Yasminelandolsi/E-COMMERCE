import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
