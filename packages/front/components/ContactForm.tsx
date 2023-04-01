import React, { useRef, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { FormValues, formResolver } from "../form-resolve";
import CtaBtn from "../components/CtaBtn";
import ReCAPTCHA from "react-google-recaptcha";

interface ContactFormInterface {
  cmsUrl: string;
  siteKey2: string;
}

export default function ContactForm({
  cmsUrl,
  siteKey2,
}: ContactFormInterface) {
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: formResolver,
  });
  const captcha = useRef(null);
  const [sucessfulCaptcha, changeSucessfulCaptcha] = useState(null);
  const onChange = () => {
    if (captcha.current.getValue()) {
      changeSucessfulCaptcha(true);
    } else {
      changeSucessfulCaptcha(false);
    }
  };
  const onSubmit = handleSubmit(async (form_data) => {
    const recaptchaValue = await captcha.current.executeAsync();
    if (recaptchaValue) {
      const res = await fetch(cmsUrl + "/api/submit-data-home-form", {
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
  return (
    <section className="contact_wrapper">
      <div className="contact_container">
        <h2>Let&apos;s Talk!</h2>
        <p>
          Tell us how we can help you and one of our Digital Leads will get in
          touch shortly.
        </p>
        <form className="contact_form" onSubmit={onSubmit}>
          <div className="input_wrapper">
            <div>
              <input placeholder="Name" {...register("name")} />
              <p className="error">
                {errors?.name && errors.name.message}&nbsp;
              </p>
            </div>
            <div>
              <input
                placeholder="Phone with Country Code"
                {...register("phone")}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <p className="error">
                {errors?.phone && errors.phone.message}&nbsp;
              </p>
            </div>
          </div>
          <div className="input_wrapper">
            <div>
              <input placeholder="Company Name" {...register("company_name")} />
              <p className="error">
                {errors?.company_name && errors.company_name.message}&nbsp;
              </p>
            </div>
            <div>
              <input placeholder="Email" {...register("email")} />
              <p className="error">
                {errors?.email && errors.email.message}&nbsp;
              </p>
            </div>
          </div>
          <div className="input_wrapper">
            <div>
              <textarea
                placeholder="Message"
                {...register("message")}
              ></textarea>
              <p className="error">
                {errors?.message && errors.message.message}&nbsp;
              </p>
            </div>
          </div>
          <div className="input_wrapper">
            <div className="terms">
              <label>
                <input type="checkbox" {...register("tc")} />
                <span className="checkmark"></span>
                <span className="checkmark_label">
                  I agree to Proto&lsquo;s{" "}
                </span>
              </label>
              <p className="error">{errors?.tc && errors.tc.message}&nbsp;</p>
            </div>
            <ReCAPTCHA
              ref={captcha}
              size="invisible"
              sitekey={siteKey2}
              onChange={onChange}
            />
            <CtaBtn type="biggy" tag="btn">
              Send Message
            </CtaBtn>
          </div>
        </form>
      </div>
    </section>
  );
}
