import Styles from "../styles/admin.module.css";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";

const Home = () => {
  return (<>
    <div className={Styles.admin}>
      <HeadTag title="Home" />
   <Header />

   {/* crousel */}
   <Carousel />







    </div>
   <Footer />
    </>
  );
};

export default Home;
