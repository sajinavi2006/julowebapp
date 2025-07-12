import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { cx } from "@emotion/css";

import Carousel from "components/Carousel";
import Layout from "components/Layout";

import { OnBoardingWrapper } from "./styles";
import { Button, Card, Div } from "assets/css/styled";
import { cursorPointer, mb0, mb4, my3, my4 } from "assets/css/stylesFix";
import { text } from "assets/css/stylesValue";

import Onboarding1 from "assets/img/partner/j1/img/onboarding-1.webp";
import Onboarding2 from "assets/img/partner/j1/img/onboarding-2.webp";
import Onboarding3 from "assets/img/partner/j1/img/onboarding-3.webp";
import Logo from "assets/img/logo/logo-name_blue.png";

const content = [
  {
    image: Onboarding1,
    title: "Satu Aplikasi untuk Berbagai Solusi",
    description1:
      "Pinjam tunai, transfer dana, bayar kebutuhan bulanan dan isi pulsa dengan JULO. Cicilan bulanan ringan.",
  },
  {
    image: Onboarding2,
    title: "Limit Maksimal, Cashback Setiap Bulan",
    description1: "Limit  s.d. 15 juta, bunga bersahabat.",
    description2: "Bayar tepat waktu, dapat cashback setiap bulan.",
  },
  {
    image: Onboarding3,
    title: "Data Dijamin Aman",
    description1:
      "JULO berizin resmi OJK KEP-16/D.05/2020 dan bersertifikat ISO 27001:2013. Kerahasiaan data terjamin.",
  },
];

const OnBoardingJ1 = () => {
  const theme = useTheme();
  const themeText = theme?.text;
  const themeCarouselIndicator = theme?.carousel?.indicator;
  const history = useHistory();
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const handleClickNext = (value) => {
    switch (value) {
      case "register":
        history.replace("signup");
        break;
      case "login":
        history.replace("login");
        break;
      default:
        break;
    }
  };
  return (
    <Layout
      hideNavbar={true}
      hideBarBack={true}
      layoutBackground={theme?.colors?.white}
      contentBackground="none"
      layoutContainer={{
        paddingTop: "0px",
      }}
      mainWrapperStyles={{
        display: "block",
      }}
    >
      <OnBoardingWrapper>
        <Div
          display="flex"
          flexDirection="column"
          justifyContent={"space-evenly"}
          textAlign="center"
          height="100vh"
          padding="2rem 0px"
        >
          <Div>
            <img width="76" src={Logo} />
          </Div>
          <Div display="flex" margin="0px 0px 30px 0px">
            <Carousel
              autoPlay={true}
              dotSelectedColor={themeCarouselIndicator?.primary}
              dotUnselectedColor={themeCarouselIndicator?.secondary}
              selectedItem={currentSlide}
              onChange={updateCurrentSlide}
            >
              {content.map((contentItem, index) => (
                <Card
                  key={`onboarding-item-${index}`}
                  padding="15px"
                  height="100%"
                  width="100%"
                  position="relative"
                  boxShadow="none"
                  rounded
                >
                  <Div className={cx(mb4)}>
                    <Div className={`${my4}`}>
                      <img src={contentItem.image} />
                    </Div>
                    <Div>
                      <p className="onboarding-title">{contentItem.title}</p>
                      <p className={cx("onboarding-description", mb0)}>
                        {contentItem.description1}
                      </p>
                      <p className="onboarding-description">
                        {contentItem?.description2}
                      </p>
                    </Div>
                  </Div>
                </Card>
              ))}
            </Carousel>
          </Div>

          <Div>
            <Button
              fluid
              primary
              onClick={() => handleClickNext("register")}
              className={cx(
                text({ size: 18, fixedSize: true, weight: "bold" })
              )}
            >
              Daftar
            </Button>
            <Div
              className={cx(
                my3,
                text({ size: 14, fixedSize: true, color: themeText?.primary })
              )}
              onClick={() => handleClickNext("login")}
            >
              Sudah punya akun?{" "}
              <span
                className={cx(
                  text({
                    color: themeText?.blue,
                    decoration: "underline",
                    weight: "bold",
                  }),
                  cursorPointer
                )}
              >
                Masuk
              </span>
            </Div>
          </Div>
        </Div>
      </OnBoardingWrapper>
    </Layout>
  );
};

export default OnBoardingJ1;
