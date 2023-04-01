import styles from "../../styles/Services.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import digital_image from "../../public/service_digital_image.png";
import figure from "../../public/clients_deco_r.png";
import geometric_figure from "../../public/figure.png";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { FormValues, formResolverService } from "../../form-resolve";
import CtaBtn from "../../components/CtaBtn";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";

export async function getStaticProps() {
  const res = await fetch(
    process.env.CMS_URL +
      "/api/our-services/1?populate[Service][populate]=*&populate[banner_image][populate]=*&populate[body_image][populate]=*&populate[body_text][populate]=*"
  );
  const pageData = await res.json();
  const cmsUrl = process.env.CMS_URL;
  const siteKey = process.env.SITE_KEY;
  return {
    props: {
      pageData,
      cmsUrl,
      siteKey,
    },
  };
}

interface Captcha {
  current: any;
}

export default function Services({ pageData, cmsUrl, siteKey }) {
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: formResolverService,
  });

  const captcha: Captcha = React.createRef();
  const [sucessfulCaptcha, changeSucessfulCaptcha] = useState(null);
  const onChange = () => {
    if (captcha.current.getValue()) {
      changeSucessfulCaptcha(true);
    } else {
      changeSucessfulCaptcha(false);
    }
  };

  const onSubmit = handleSubmit(async (form_data) => {
    const recaptchaValue = captcha.current.getValue();
    if (captcha.current.getValue()) {
      const res = await fetch(cmsUrl + "/api/submit-data-services-form", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: form_data,
          recaptchaValue: recaptchaValue,
        }),
      });

      if (res.status === 200) {
        Router.push("/thanks");
      } else {
        Router.push("/404");
      }
    } else {
      changeSucessfulCaptcha(false);
    }
  });
  const {
    data: {
      attributes: {
        Service: serviceData,
        banner_image: bannerData,
        body_image: bodyImage,
        body_text: bodyText,
      },
    },
  } = pageData;

  const {
    data: {
      attributes: { url: bannerImgUrl },
    },
  } = bannerData;

  const {
    data: {
      attributes: { url: bodyImgUrl },
    },
  } = bodyImage;

  return (
    <>
      <Head>
        <title>
          Proto
        </title>
        <meta
          name="description"
          content="Prepare your organization to add value and speed up the way your company reacts to market change by aligning people, processes and technology."
        ></meta>
      </Head>
      <section className={`${styles.banner}`}>
        <Image
          alt="Mountains"
          src={cmsUrl + bannerImgUrl}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className={`${styles.banner_content}`}>
          <h1>Our Services</h1>
          <ul className={`${styles.services}`}>
            <li>
              <Link href={"#digital"}>{serviceData[0].title}</Link>
            </li>
            <li>
              <Link href={"#customer"}>{serviceData[1].title}</Link>
            </li>
            <li>
              <Link href={"#people"}>{serviceData[2].title}</Link>
            </li>
            <li>
              <Link href={"#people"}>Product Mindset</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className={`${styles.section_digital}`} id="digital">
        <div className={`${styles.digital_content}`}>
          <h3>{serviceData[0].title}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: serviceData[0].description }}
          ></div>
          <div className="buttons">
            <Link href={"/contact"}>
              <a className="cta_button black">Contact Us</a>
            </Link>
            <Link href={"/digital-transformation.pdf"}>
              <a className="cta_button black" target="_blank" rel="noreferrer">
                Know More
              </a>
            </Link>
          </div>
          <div className={`${styles.image}`}>
            <figure>
              <Image alt="Mountains" src={digital_image} quality={100} />
            </figure>
          </div>
        </div>
        <figure className={`${styles.squares_figure}`}>
          <Image alt="Mountains" src={figure} quality={100} />
        </figure>
      </section>
      <section className={`${styles.banner} ${styles.clip}`}>
        <Image
          className={styles.bodyImg}
          alt="Mountains"
          src={cmsUrl + bodyImgUrl}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className={`${styles.banner_content} ${styles.center}`}>
          <p>{bodyText}</p>
        </div>
      </section>
      <section className={`${styles.section_services}`}>
        <article id="customer">
          <h3>{serviceData[1].title}</h3>
          <span
            dangerouslySetInnerHTML={{ __html: serviceData[1].description }}
          ></span>
          <div className="buttons">
            <Link href={"/contact"}>
              <a className="cta_button black">Contact Us</a>
            </Link>
            <Link href={"/customer-experience.pdf"}>
              <a className="cta_button black" target="_blank" rel="noreferrer">
                Know More
              </a>
            </Link>
          </div>
        </article>
        <article id="people">
          <h3>{serviceData[2].title}</h3>
          <span
            dangerouslySetInnerHTML={{ __html: serviceData[2].description }}
          ></span>
          <div className="buttons">
            <Link href={"/contact"}>
              <a className="cta_button black">Contact Us</a>
            </Link>
            <Link href={"/people-first.pdf"}>
              <a className="cta_button black" target="_blank" rel="noreferrer">
                Know More
              </a>
            </Link>
          </div>
        </article>
        <div>
          <figure className={`${styles.geometrics_figure}`}>
            <Image
              alt="Geometric figure"
              src={geometric_figure}
              quality={100}
            />
          </figure>
        </div>
      </section>

      <section className={`${styles.section_form}`}>
        <form className={`${styles.form}`} onSubmit={onSubmit}>
          <h3>Ready to get started?</h3>
          <p>
            Tell us how we can help you, and one of our Digital Leads will get
            in touch shortly.
          </p>
          <div className="input_group">
            <div className="input_form">
              <label>Tell us your name</label>
              <div className="input">
                <input
                  placeholder="First and Last Name*"
                  {...register("full_name")}
                />
              </div>
              {errors?.full_name && (
                <p className="error">{errors.full_name.message}</p>
              )}
            </div>
            <div className="input_form">
              <label>I would like to know more about</label>
              <div className="input">
                <select {...register("category")}>
                  <option value="Digital Transformation">
                    Digital Transformation
                  </option>
                  <option value="Customer Experience">
                    Customer Experience
                  </option>
                  <option value="People First">People First</option>
                </select>
              </div>
              {errors?.category && (
                <p className="error">{errors.category.message}</p>
              )}
            </div>
          </div>
          <div className="input_group">
            <div className="input_form">
              <label>Email address</label>
              <div className="input">
                <input
                  placeholder="email@emailaddress.com*"
                  {...register("email")}
                />
              </div>
              {errors?.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="input_form">
              <label>Phone number</label>
              <div className="input">
                <input
                  placeholder="111-1111-11111 (optional)"
                  {...register("phone")}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              {errors?.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="input_form">
            <label>Company</label>
            <div className="input">
              <input
                placeholder="Company Name (optional)"
                {...register("company_name")}
              />
            </div>
            {errors?.company_name && (
              <p className="error">{errors.company_name.message}</p>
            )}
          </div>
          <div className="input_form">
            <label>Message</label>
            <div className="input">
              <textarea {...register("message")}></textarea>
            </div>
            {errors?.message && (
              <p className="error">{errors.message.message}</p>
            )}
          </div>
          <div className={styles.recaptcha}>
            <ReCAPTCHA ref={captcha} sitekey={siteKey} onChange={onChange} />
          </div>
          {sucessfulCaptcha === false && (
            <div className={styles.errorCaptcha}>
              <p>Please complete the captcha</p>
            </div>
          )}
          <CtaBtn type="black biggy" tag="btn">
            Send
          </CtaBtn>
        </form>
      </section>
      <section className={styles.about}>
        <h2>MORE ABOUT US</h2>
        <div>
          <Link href={"/about"}>
            <a>
              <span>ABOUT US</span>
              <span className="arrow"></span>
            </a>
          </Link>
          <Link href={"https://co.linkedin.com/in/jasson112"}>
            <a>
              <span>CAREERS</span>
              <span className="arrow"></span>
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
