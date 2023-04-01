import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import about from "../../public/proto_about.svg";
import done from "../../public/done.svg";
import doceo from "../../public/doceo.svg";
import proto from "../../public/proto_about.svg";
import LinedTitle from "../../components/LinedTitle";
import banner from "../../public/banner_about.png";
import trophy from "../../public/trophy.png";
import world from "../../public/world.png";
import cake from "../../public/cake.png";
import bulb from "../../public/bulb.png";
import discovery from "../../public/discovery.svg";
// import map from "../../public/map.svg";
// import chart from "../../public/chart.svg";
// import leadership from "../../public/leadership.svg";
// import org from "../../public/org.svg";
import React, { Component, ReactNode } from "react";
import ApproachItem from "../../components/ApproachItem";
import ContactForm from "../../components/ContactForm";
import Head from "next/head";

interface Card {
  map(arg0: (people: any) => JSX.Element): ReactNode;
  id: Number;
}

interface BodyText {
  id: Number;
  title: string;
  first_subtitle: string;
  first_description: string;
  second_subtitle: string;
  second_description: string;
}

interface Approach {
  map(arg0: (people: any) => JSX.Element): ReactNode;
  id: Number;
}

interface History {
  map(arg0: (people: any) => JSX.Element): ReactNode;
  id: Number;
}
interface Attributes {
  banner_title: string;
  Card: Card;
  Body_text: BodyText;
  Approach: Approach;
  text_below_approach_container: string;
  History: History;
  banner_image: any;
}
interface Data {
  id: Number;
  attributes: Attributes;
}
interface pageData {
  data: Data;
}

export async function getStaticProps() {
  const res = await fetch(
    process.env.CMS_URL +
      "/api/about-uses/1?populate[Card][populate]=*&populate[banner_image][populate]=*&populate[Body_text][populate]=*&populate[Approach][populate]=*&populate[History][populate]=*"
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

interface AboutState {
  splideProgress: string;
  pageIndex: string;
}

interface AboutProps {
  pageData: pageData;
  cmsUrl: string;
  siteKey2: string;
}
class About extends Component<AboutProps, AboutState> {
  state: AboutState = {
    splideProgress: "0%",
    pageIndex: "1",
  };

  checkMove = (splide) => {
    console.log(splide.index);
    const splideEnd = splide.Components.Controller.getEnd() + 1;
    const splideRate = Math.min((splide.index + 1) / splideEnd, 1);
    this.setState({
      splideProgress: String(100 * splideRate) + "%",
      pageIndex: splide.index + 1,
    });
  };

  render() {
    const {
      data: {
        attributes: {
          Card: cardData,
          Body_text: bodyText,
          Approach: approachData,
          text_below_approach_container: text_below_approach_container,
          History: historyData,
          banner_image: bannerData,
        },
      },
    } = this.props.pageData;

    const {
      data: {
        attributes: { url: bannerImgUrl },
      },
    } = bannerData;

    const cmsUrl = this.props.cmsUrl;
    const siteKey2 = this.props.siteKey2;

    const peopleList = cardData.map(function (people) {
      const {
        id,
        title,
        name,
        description,
        image: {
          data: {
            attributes: { url: imgUrl },
          },
        },
      } = people;
      return (
        <SplideSlide key={id}>
          <div className="people_content">
            <div className="people_image">
              <Image
                alt="Mountains"
                src={cmsUrl + imgUrl}
                quality={100}
                width={500}
                height={400}
              />
            </div>
            <div className="people_wrapper">
              <h2 className="people_title">{title}</h2>
              <h3 className="people_subtitle">{name}</h3>
              <span
                className="people_text"
                dangerouslySetInnerHTML={{ __html: description }}
              ></span>
            </div>
          </div>
        </SplideSlide>
      );
    });

    const approachList = approachData.map(function (approach) {
      const {
        id,
        title,
        description,
        // image: {
        //   data: {
        //     attributes: { url: imgUrl },
        //   },
        // },
      } = approach;
      return (
        <ApproachItem key={id} title={title} icon={discovery}>
          {description}
        </ApproachItem>
      );
    });

    const historyList = historyData.map(function (history) {
      const {
        id,
        year,
        description,
        // image: {
        //   data: {
        //     attributes: { url: imgUrl },
        //   },
        // },
      } = history;
      return (
        <SplideSlide key={id}>
          <div className="year_content">
            <div className="year_wrapper">
              <h2 className="year_title">{year}</h2>
              <p className="year_text">{description}</p>
            </div>
          </div>
        </SplideSlide>
      );
    });

    return (
      <>
        <Head>
          <title>Learn About Our Experts and Our Approach | Proto</title>
          <meta
            name="description"
            content="Our expertise in agile and collaborative ways of working help our clients successfully navigate their innovation and transformation journeys."
          ></meta>
        </Head>
        <section className="title_wrapper">
          <div className="title_container">
            <h1>Optimizing your business results is what power us</h1>
          </div>
          <Image
            alt="Mountains"
            src={cmsUrl + bannerImgUrl}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </section>
        <section className="people_wrapper">
          <div className="people_slider_wrapper">
            <div className="people_slider-progress_wrapper">
              <span>{this.state.pageIndex}</span>
              <div className="people_slider-progress">
                <div
                  className="people_slider-progress-bar"
                  style={{ width: this.state.splideProgress }}
                ></div>
              </div>
            </div>

            <Splide
              aria-label="My Favorite Images"
              className="people_slider"
              onMounted={this.checkMove}
              onMove={this.checkMove}
              options={{
                height: 647,
                arrows: true,
                pagination: false,
                padding: 200,
                variableWidth: true,
                centerMode: true,
                centeredSlides: true,
                focus: "center",
                type: "loop",
                gap: 50,
                updateOnMove: true,
                lazyLoad: "nearby",
                breakpoints: {
                  768: {
                    height: 850,
                    padding: "10%",
                    gap: 10,
                  },
                  1000: {
                    height: 850,
                    padding: "5%",
                    gap: 10,
                  },
                },
              }}
            >
              {peopleList}
            </Splide>
          </div>
        </section>
        <section className="who_wrapper">
          <div className="who_container">
            <div className="who_column1">
              <h2 dangerouslySetInnerHTML={{ __html: bodyText.title }}></h2>
              <h3
                dangerouslySetInnerHTML={{ __html: bodyText.first_subtitle }}
              ></h3>
              <span
                dangerouslySetInnerHTML={{ __html: bodyText.first_description }}
              ></span>
              <h4
                dangerouslySetInnerHTML={{ __html: bodyText.second_subtitle }}
              ></h4>
              <span
                dangerouslySetInnerHTML={{
                  __html: bodyText.second_description,
                }}
              ></span>
            </div>
            <div className="who_column2">
              <div className="who_satisfaction">
                <div className="percent">
                  <div className="icon">
                    <Image
                      alt="Mountains"
                      src={trophy}
                      width="76"
                      height={76}
                      quality={100}
                    />
                  </div>
                  <h3>95%</h3>
                  <p>CUSTOMER SATISFACTION INDEX</p>
                </div>
                <div className="global">
                  <div className="icon">
                    <Image
                      alt="Mountains"
                      src={world}
                      width="76"
                      height={76}
                      quality={100}
                    />
                  </div>
                  <h3>GLOBAL PRESENCE</h3>
                  <div className="global_enchaced_title">
                    <h3>IN</h3>
                    <h4>3</h4>
                    <h3>CONTINENTS</h3>
                  </div>
                </div>
                <div className="years">
                  <h3>+22</h3>
                  <h4>YEARS</h4>
                  <div className="icon">
                    <Image
                      alt="Mountains"
                      src={cake}
                      width="76"
                      height={76}
                      quality={100}
                    />
                  </div>
                </div>
                <div className="languages">
                  <h3>+4</h3>
                  <h4>LANGUAGES: SPANISH, ENGLISH, FRENCH, ITALIAN</h4>
                  <div className="icon">
                    <Image
                      alt="Mountains"
                      src={bulb}
                      width="76"
                      height={76}
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="approach_wrapper">
          <div className="approach_content">
            <LinedTitle title1="Our Approach" title2="What we do" />
            <div className="approach_list">{approachList}</div>
            <span
              className="approach_foot"
              dangerouslySetInnerHTML={{
                __html: text_below_approach_container,
              }}
            ></span>
          </div>
        </section>
        <section className="people_wrapper">
          <div className="people_subtitle_wrapper">
            <hr />
            <h3>Each Unit Is a Unique Part of the Family</h3>
            <hr />
          </div>
          <div className="people_family">
            <div className="family_item">
              <Image alt="Mountains" src={about} quality={100} height={55} />
            </div>
            <div className="family_item">
              <Image alt="Mountains" src={proto} quality={100} height={55} />
            </div>
            <div className="family_item">
              <Image alt="Mountains" src={doceo} quality={100} height={55} />
            </div>
            <div className="family_item">
              <Image alt="Mountains" src={done} quality={100} height={55} />
            </div>
          </div>
        </section>
        <section className="history_wrapper">
          <div className="history_container">
            <h2>Our History</h2>
            <Splide
              aria-label="My Favorite Images"
              className="history_slider"
              options={{
                height: 472,
                arrows: true,
                pagination: false,
                gap: 43,
                autoWidth: true,
                perPage: 3,
                lazyLoad: "nearby",
                breakpoints: {
                  1000: {
                    padding: "60px",
                    perPage: 1,
                    centerMode: true,
                    centeredSlides: true,
                    focus: "center",
                    updateOnMove: true,
                  },
                },
              }}
            >
              {historyList}
            </Splide>
          </div>
        </section>
        <ContactForm cmsUrl={cmsUrl} siteKey2={siteKey2} />
      </>
    );
  }
}

export default About;
