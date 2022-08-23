import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import TermStyle from "../styles/terms.module.css";
export default function HelpAndSupport() {
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Help And Support" />
   <Header />

    <div className={TermStyle.term}>
<h1>Help And Support</h1>
<p>Last updated: August 21, 2022</p>


     </div>
    </div>
   <Footer />
    </div>
  )
}
