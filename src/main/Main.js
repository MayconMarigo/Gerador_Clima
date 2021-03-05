import { Fragment } from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./Main.css";

export default function Main() {
  return (
    <Fragment>
      <div className="main">
        <div className="container">
          <Header />
          <Body />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}
