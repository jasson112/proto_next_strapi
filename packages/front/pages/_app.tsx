"use strict";
import App from "next/app";
import "../styles/globals.scss";
import "normalize.css/normalize.css";
import Layout from "../components/Layout";
import TagManager from "react-gtm-module";
import React from "react";

const tagManagerArgs = {
  gtmId: "GTM-P6R57G8",
};

interface AppState {
  fetchPromise: boolean;
}

class MyApp extends App<AppState> {
  constructor(props) {
    super(props);
    this.state = {
      fetchPromise: false,
    };
  }

  state: AppState = {
    fetchPromise: false,
  };

  componentDidMount() {
    
    if (this.state.fetchPromise) {
      // already mounted previously
      console.log("NOT MOUNT", this.state.fetchPromise);
    } else {
      TagManager.initialize(tagManagerArgs);
      this.state.fetchPromise = true;
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.StrictMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.StrictMode>
    );
  }
}

export default MyApp;
