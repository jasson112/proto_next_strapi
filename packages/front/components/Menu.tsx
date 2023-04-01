import Image from "next/image";
import React, { Component, useState } from "react";
import logo from "../public/logo.png";
import hamburger from "../public/hamburger.png";
import x from "../public/x.png";
import CtaBtn from "./CtaBtn";
import { useRouter } from "next/router";
import Link from "next/link";
import { withRouter, NextRouter } from "next/router";

interface MenuState {
  openMenu: boolean;
}

interface WithRouterProps {
  router: NextRouter;
}
interface MenuProps extends WithRouterProps {}
class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
  }
  state: MenuState = {
    openMenu: false,
  };
  // const router = useRouter();
  // const [openMenu, setOpenMenu] = useState(false);
  toggleMenu = (event) => {
    this.setState({ openMenu: !this.state.openMenu });
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      this.setState({ openMenu: false });
    }
  };

  render = () => {
    return (
      <>
        <header>
          <nav className="menu_container">
            <div className="menu_hamburger">
              <div
                className="open"
                onClick={this.toggleMenu}
                style={{ display: !this.state.openMenu ? "block" : "none" }}
              >
                <Image
                  alt="Mountains"
                  src={hamburger}
                  quality={100}
                  width={25}
                  height={25}
                />
              </div>

              <div
                className="close"
                onClick={this.toggleMenu}
                style={{ display: !this.state.openMenu ? "none" : "block" }}
              >
                <Image
                  alt="Mountains"
                  src={x}
                  quality={100}
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <div className="menu_logo">
              <Link href="/">
                <a>
                  <Image alt="Mountains" src={logo} quality={100} />
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <Link href="/services">
                <a
                  className={`menu_item_link ${
                    this.props.router?.route === "/services" ? "active" : ""
                  }`}
                >
                  Our Services
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <Link href="/about">
                <a
                  className={`menu_item_link ${
                    this.props.router?.route === "/about" ? "active" : ""
                  }`}
                >
                  About Us 
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noreferrer"
                className={`menu_item_link ${
                  this.props.router?.route === "/careers" ? "active" : ""
                }`}
              >
                Careers
              </a>
            </div>
            <div className="menu_item">
              <CtaBtn type="yell" href="/contact">Contact us</CtaBtn>
            </div>
            <div className="menu_hamburger">
              <Image
                alt="Mountains"
                src={hamburger}
                quality={100}
                width={25}
                height={17}
                style={{ visibility: "hidden" }}
              />
            </div>
            <div
              className="menu_mobile"
              style={{ display: !this.state.openMenu ? "none" : "flex" }}
            >
              <div className="menu_item">
                <Link href="/services">
                  <a
                    className={`menu_item_link ${
                      this.props.router?.route === "/services" ? "active" : ""
                    }`}
                  >
                    Our Services
                  </a>
                </Link>
              </div>
              <div className="menu_item">
                <Link href="/about">
                  <a
                    className={`menu_item_link ${
                      this.props.router?.route === "/about" ? "active" : ""
                    }`}
                  >
                    About Us
                  </a>
                </Link>
              </div>
              <div className="menu_item">
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={`menu_item_link ${
                    this.props.router?.route === "/careers" ? "active" : ""
                  }`}
                >
                  Careers
                </a>
              </div>
              <div className="menu_item">
                <CtaBtn type="yell-ligth" href="/contact">Contact us</CtaBtn>
              </div>
            </div>
          </nav>
          <nav className={`menu_little ${
                    this.props.router?.route === "/" ? "" : "disabled"
                  }`}>
            <div className="menu_item">
              <Link href="#middle_name">
                <a
                  className={`menu_item_link ${
                    this.props.router?.asPath === "/#middle_name" ? "active" : ""
                  }`}
                >
                  Revolutionizing Companies
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <Link href="#we_do_best">
                <a
                  className={`menu_item_link ${
                    this.props.router?.asPath === "/#we_do_best" ? "active" : ""
                  }`}
                >
                  What We Do Best
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <Link href="#clients">
                <a
                  className={`menu_item_link ${
                    this.props.router?.asPath === "/#clients" ? "active" : ""
                  }`}
                >
                  Clients Who Have Trusted Us
                </a>
              </Link>
            </div>
            <div className="menu_item">
              <Link href="/#in_numbers">
                <a
                  className={`menu_item_link ${
                    this.props.router?.asPath === "/#in_numbers" ? "active" : ""
                  }`}
                >
                  Proto in Numbers
                </a>
              </Link>
            </div>
          </nav>
        </header>
      </>
    );
  };
}

export default withRouter(Menu);
