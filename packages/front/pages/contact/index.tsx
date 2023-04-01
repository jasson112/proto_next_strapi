import React from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { FormValues, formResolver } from "../../form-resolve";
import styles from "../../styles/contact.module.scss";
import banner_image from "../../public/contact_banner.png";
import contact_image from "../../public/contact_image.png";
import contact_deco from "../../public/contact_deco.png";
import CtaBtn from "../../components/CtaBtn";
import Head from "next/head";

export function getStaticProps() {
  return {
    props: {
      cmsUrl: process.env.CMS_URL,
    },
  };
}

function Contact({ cmsUrl }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: formResolver,
  });
  const onSubmit = handleSubmit(async (form_data) => {
    const res = await fetch(cmsUrl + "/api/contact-emails", {
      method: "POST",
      //body: JSON.stringify({ data: data }),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: form_data }),
    });
    if (res.status === 200) {
      Router.push("/thanks");
    } else {
      Router.push("/404");
    }
  });
  return (
    <>
      <Head>
        <title>Discover Our Consulting Services Tailored to your Needs | Proto</title>
        <meta
          name="description"
          content="Let's talk! Tell us how we can help you. We are here to improve your outcomes with business agility."
        ></meta>
      </Head>
      <section className={`${styles.banner}`}>
        <Image
          alt="Mountains"
          src={banner_image}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className={`${styles.banner_content}`}>
          <div>
            <Image alt="Mountains" src={contact_image} quality={100} />
          </div>
          <div>
            <h1>CONTACT US</h1>
            <p>hello@proto.com</p>
          </div>
        </div>
      </section>
      <section className={`${styles.form_section}`}>
        <h2>Let’s collaborate</h2>
        <p>
          Tell us how we can help you and one of our Digital Leads will get in
          touch shortly.
        </p>
        <form className={`${styles.form}`} onSubmit={onSubmit}>
          <div className="input_group">
            <div className="input_form">
              <label>Name</label>
              <div className="input">
                <input
                  {...register("name")}
                  placeholder="First and Last Name"
                />
              </div>
              {errors?.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div className="input_form">
              <label>Phone with Country Code</label>
              <div className="input">
                <input
                  {...register("phone")}
                  placeholder="111-1111-11111"
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
          <div className="input_group">
            <div className="input_form">
              <label>Company Name</label>
              <div className="input">
                <input
                  {...register("company_name")}
                  placeholder="Company Name"
                />
              </div>
              {errors?.company_name && (
                <p className="error">{errors.company_name.message}</p>
              )}
            </div>
            <div className="input_form">
              <label>Email</label>
              <div className="input">
                <input
                  {...register("email")}
                  placeholder="email@emailaddress.com*"
                />
              </div>
              {errors?.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>
          <div className="input_form">
            <label>Message</label>
            <div className="input">
              <textarea className="big" {...register("message")}></textarea>
            </div>
            {errors?.message && (
              <p className="error">{errors.message.message}</p>
            )}
          </div>

          <div className="input_group">
            <div className="input_form">
              <div className="checkbox">
                <input type="checkbox" {...register("tc")} />
              </div>
              <label>
                I agree to Proto&apos;s Privacy Policy
              </label>
              {errors?.tc && <p className="error">{errors.tc.message}</p>}
            </div>
            <CtaBtn type="black biggy" tag="btn">
              Send Message
            </CtaBtn>
          </div>
        </form>
      </section>
      <figure className={`${styles.form_deco}`}>
        <Image src={contact_deco} quality={100} />
      </figure>
    </>
  );
}

export default Contact;
