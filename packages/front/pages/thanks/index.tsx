import thanksStyles from "../../styles/Thanks.module.scss";
import Link from "next/link";
import Head from "next/head";
const thanks = () => {
  return (
    <>
      <Head>
        <title>Thank You for Contacting Us | Proto</title>
        <meta
          name="description"
          content="We thank you for getting in touch with us. We will contact you as soon as posible"
        ></meta>
      </Head>
      <section className={thanksStyles.section}>
        <figure className={thanksStyles.figure}>
          <img src="figure.png" />
        </figure>
        <div className={thanksStyles.container}>
          <div className={thanksStyles.content}>
            <h1>
              Thank you for <br /> contacting us
            </h1>
            <p>
              We have received your request. A member of our team will contact
              you shortly.
            </p>
            <Link href="/">
              <a className={thanksStyles.goTo}>Go to main page</a>
            </Link>
          </div>
          <figure className={thanksStyles.content_image}>
            <img src="thanks.png" />
          </figure>
        </div>
      </section>
    </>
  );
};

export default thanks;
