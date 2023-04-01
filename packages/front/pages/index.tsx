import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import Image from "next/image";
import feat1 from "../public/feat1.png";
import feat2 from "../public/feat2.png";
import React from "react";
import CtaBtn from "../components/CtaBtn";
import LinedTitle from "../components/LinedTitle";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import Head from "next/head";

export async function getStaticProps() {
  const res = await fetch(
    process.env.CMS_URL +
      "/api/homes/1?populate[Banner][populate]=*&populate[Content][populate]=*&populate[Client][populate]=*&populate[Story][populate]=*&populate[Service][populate]=*"
  );
  const pageData = await res.json();
  const cmsUrl = process.env.CMS_URL;
  const siteKey2 = process.env.SITE_KEY2;

  return {
    props: {
      pageData,
      cmsUrl,
      siteKey2,
    },
  };
}

export default function Home({ pageData, cmsUrl, siteKey2 }) {
  const {
    data: {
      attributes: {
        Banner: bannerData,
        Content: contentData,
        Client: clientData,
        Story: storiesData,
        Service: serviceData,
      },
    },
  } = pageData;

  const bannerList = bannerData.map(function (banner) {
    const {
      title,
      subtitle,
      id,
      background_images: {
        data: {
          attributes: { url: imgUrl },
        },
      },
    } = banner;
    return (
      <SplideSlide key={id}>
        <Image
          alt="Mountains"
          src={cmsUrl + imgUrl}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmDypHgADZgGmNTAUDwAAAABJRU5ErkJggg=="
          quality={100}
          loading="lazy"
        />
        <div className="banner_content">
          <h1 className="banner_title">{title}</h1>
          <p className="banner_subtitle">{subtitle}</p>
          <CtaBtn href="/services">Learn More</CtaBtn>
        </div>
      </SplideSlide>
    );
  });

  const clientList = clientData.map(function (client) {
    const {
      id,
      image: {
        data: {
          attributes: { url: imgUrl },
        },
      },
    } = client;
    return (
      <SplideSlide key={id}>
        <div>
          <Image
            alt="Mountains"
            src={cmsUrl + imgUrl}
            layout="fill"
            quality={100}
            //loading="eager"
            placeholder="blur"
            blurDataURL="data:image/png;base64,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"
          />
        </div>
      </SplideSlide>
    );
  });

  const storiesList = storiesData.map(function (story) {
    const {
      id,
      subtitle,
      description,
      image: {
        data: {
          attributes: { url: imgUrl },
        },
      },
    } = story;
    return (
      <SplideSlide key={id}>
        <div className="story_item">
          <div className="story_item_img_container">
            <Image
              alt="Mountains"
              src={cmsUrl + imgUrl}
              quality={100}
              //width={260}
              layout="fill"
              loading="eager"
              priority
              //placeholder="blur"
              //blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmDypHgADZgGmNTAUDwAAAABJRU5ErkJggg=="
            />
          </div>
          <h2>{subtitle}</h2>
          <p>{description}</p>
        </div>
      </SplideSlide>
    );
  });

  const serviceList = serviceData.map(function (service) {
    const {
      id,
      subtitle,
      title,
      description,
      image: {
        data: {
          attributes: { url: imgUrl },
        },
      },
    } = service;
    return (
      <Link href="/services" key={id}>
        <div className="service">
          <figure>
            <Image
              alt="Mountains"
              src={cmsUrl + imgUrl}
              quality={100}
              width="100%"
              height="100%"
              layout="responsive"
              className="service_img"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmDypHgADZgGmNTAUDwAAAABJRU5ErkJggg=="
            />
          </figure>

          <h3>{subtitle}</h3>
          <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
          <span dangerouslySetInnerHTML={{ __html: description }}></span>
        </div>
      </Link>
    );
  });

  return (
    <>
      <Head>
        <title>Business Digital Transformation Consulting | Proto</title>
        <meta
          name="description"
          content="Our digital transformation consultants are constantly revolutionizing the way organizations work. Unlock new business values through human capabilities."
        ></meta>
      </Head>
      <section>
        <Splide
          aria-label="My Favorite Images"
          className="splide banner"
          options={{
            height: 532,
            arrows: false,
            breakpoints: {
              1000: {
                height: 690,
              },
            },
          }}
        >
          {bannerList}
        </Splide>
      </section>
      <section className="feat_wrapper" id="middle_name">
        <div className="feat_content item_1">
          <h2 className="feat_content_title">{contentData.first_title}</h2>
          <span
            className="feat_content_subtitle"
            dangerouslySetInnerHTML={{ __html: contentData.first_description }}
          ></span>
          <CtaBtn href="/about" type="light">
            Learn more
          </CtaBtn>
        </div>
        <div className="feat_content item_2">
          <Image
            alt="Mountains"
            src={feat1}
            quality={100}
            sizes="(max-width: 768em) 100px"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmDypHgADZgGmNTAUDwAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="feat_content item_3">
          <Image
            alt="Mountains"
            src={feat2}
            quality={100}
            sizes="(max-width: 768em) 100px"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmDypHgADZgGmNTAUDwAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="feat_content item_4">
          <h2 className="feat_content_title">{contentData.second_title}</h2>
          <span
            className="feat_content_subtitle"
            dangerouslySetInnerHTML={{ __html: contentData.second_description }}
          ></span>
          <CtaBtn href="/services" type="light">
            Learn more
          </CtaBtn>
        </div>
      </section>
      <section className="services_wrapper" id="we_do_best">
        <div className="services_container">
          <LinedTitle title1="Services" title2="See all our services" />
          <div className="services_list">{serviceList}</div>
        </div>
      </section>
      <section className="clients_wrapper" id="clients">
        <h2>Some of our clients</h2>
        <p>
          We are proud of what we do and what we have accomplished, but we are
          even more proud of the companies we have partnered with.
        </p>
        <Splide
          aria-label="My Favorite Images"
          className="splide clients_slider"
          options={{
            height: 90,
            arrows: true,
            pagination: false,
            perPage: 3,
            perMove: 3,
            gap: 120,
            lazyLoad: "nearby",
            breakpoints: {
              1279: {
                gap: 0,
                arrows: false,
                pagination: true,
                perPage: 1,
                perMove: 1,
                focus: "center",
                padding: "20%",
                centerMode: true,
                variableWidth: true,
              },
            },
          }}
        >
          {clientList}
        </Splide>
      </section>
      <section className="stories_wrapper" id="in_numbers">
        <LinedTitle
          title1="Proto success stories"
          title2="Proto in numbers"
        />
      </section>
      <section className="stories_slider_wrapper">
        <Splide
          aria-label="My Favorite Images"
          className="splide stories_slider"
          options={{
            height: 660,
            arrows: true,
            pagination: false,
            perPage: 4,
            gap: 17,
            centerMode: true,
            variableWidth: true,
            currentSlide: 3,
            centeredSlides: true,
            focus: "center",
            type: "loop",
            updateOnMove: true,
            autoWidth: true,
            fixedWidth: "100px",
            breakpoints: {
              1280: {
                perPage: 3,
                gap: 17,
                autoWidth: true,
                fixedWidth: "100px",
              },
            },
          }}
        >
          {storiesList}
        </Splide>
      </section>
      <ContactForm cmsUrl={cmsUrl} siteKey2={siteKey2} />
    </>
  );
}
