import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo_footer.png";

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="footer_container">
          <div className="logo">
            <Image alt="Mountains" src={logo} quality={100} />
          </div>
          <div className="footer_item">
            <h2>Contact Us</h2>
            <p>
              Drop us a line <br />
              hello@proto.com
              <br />
              1 888 681 9094 <br/>
              1200 Blvd Saint-Martin West <br/>
              Suite 130 H7S- 2E4 - Laval, Qc - <br/>
              Canada
            </p>
          </div>
          <div className="footer_item follow_item">
            <h2>Follow Us</h2>
            <div className="social_networks">
              <Link
                href={
                  "https://co.linkedin.com/in/jasson112"
                }
              >
                <a target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Link>
            </div>
          </div>
          <div className="footer_item">
            <h2>Explore</h2>
            <p>
              <Link href="/about">About Us</Link> <br />
              <Link href="/services">Our Services</Link> <br />
            </p>
          </div>
        </div>
      </section>
      <footer className="footer_sitemap_wrapper">
        <div className="footer_sitemap_container">
          <Link href="https://www.google.com/">
            <a target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </Link>
          <Link href="https://www.google.com/">
            <a>Terms of Service</a>
          </Link>
          <Link href="https://www.google.com/">
            <a>Site Map</a>
          </Link>
          <Link href="https://www.google.com/">
            <a>Cookie Policy</a>
          </Link>
          <Link href="https://www.google.com/">
            <a>Cookie Preferences</a>
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
