//헤더랑 푸터 고정하려고 레이아웃 따로 만들었어용
import React from "react";
import Header from "./Header";
import Footer from "./footer";
import styles from "./layout.module.css";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
