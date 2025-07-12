import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { cx } from "@emotion/css";

import Carousel from "components/Carousel";
import Layout from "components/Layout";

import { OnBoardingWrapper } from "./styles";
import { Button, Card, Div } from "assets/css/styled";
import { my4 } from "assets/css/stylesFix";
import { text } from "assets/css/stylesValue";

import Onboarding1 from "assets/img/partner/rentee/img/onboarding-1.svg";
import Onboarding2 from "assets/img/partner/rentee/img/onboarding-2.svg";
import Onboarding3 from "assets/img/partner/rentee/img/onboarding-3.svg";
import Onboarding4 from "assets/img/partner/rentee/img/onboarding-4.svg";
import Logo from "assets/img/logo/logo-rentee_by_julo.webp";

const content = [
  {
    image: Onboarding1,
    title: "Gunakan Kode Referral",
    description: (
      <Div>
        <Div>Jangan lupa masukkan kode referral</Div>
        <Div className={cx(text({ weight: "bold" }))}>“RENTEEJULO”</Div>
        <Div>
          untuk mendapatkan cashback sebesar{" "}
          <span className={cx(text({ weight: "bold" }))}>Rp 100.000</span>
        </Div>
      </Div>
    ),
  },
  {
    image: Onboarding2,
    title: "Upgrade Device Setiap Tahun",
    description:
      "Upgrade devicemu agar semua lancar. Kerjaan, bikin konten, orderan atau janjian, semua aman!",
  },
  {
    image: Onboarding3,
    title: "Paling Murah dari Cicilan Manapun",
    description: "Dengan bunganya yang rendah plus cashback hingga 3%",
  },
  {
    image: Onboarding4,
    title: "Rasakan Kemudahan Gonta Ganti HP tiap tahun",
    description:
      "Mau upgrade device, semua jadi mudah, tinggal cicil sesuai kemampuanmu.",
  },
];

const OnBoardingRentee = () => {
  const theme = useTheme();
  const themeCarouselIndicator = theme?.carousel?.indicator;
  const history = useHistory();
  const { search } = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const handleClickNext = () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide >= content.length - 1) {
      history.replace(`/rentee/signup${search}`);
    }
  };
  return (
    <Layout
      hideNavbar={true}
      hideBarBack={true}
      layoutBackground={theme?.colors?.backgroundColorPrimaryGradient}
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
          textAlign="center"
          height="100vh"
          padding="2rem 0px"
        >
          <Div>
            <img src={Logo} />
          </Div>
          <Div display="flex" style={{ flex: 1, marginBottom: "30px" }}>
            <Carousel
              autoPlay={false}
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
                  <p className="onboarding-header">Keuntungan memakai Rentee</p>
                  <Div className={`${my4}`}>
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={contentItem.image}
                    />
                  </Div>
                  <Div>
                    <p className="onboarding-title">{contentItem.title}</p>
                    <p className="onboarding-description">
                      {contentItem.description}
                    </p>
                  </Div>
                </Card>
              ))}
            </Carousel>
          </Div>

          <Button onClick={handleClickNext} fluid primary>
            Lanjutkan
          </Button>
        </Div>
      </OnBoardingWrapper>
    </Layout>
  );
};

export default OnBoardingRentee;
