import styled from 'styled-components'
import {
  landingHeaderHeight,
  responsiveMobile,
  responsiveTablet
} from '@/utils/styles/globals'

export const Landing = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding-top: calc(${landingHeaderHeight} + 15px);

  overflow: hidden;
`

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  height: fit-content;
  padding: 80px 15px 60px 15px;

  @media screen and (max-width: ${responsiveTablet}) {
    padding: 60px 15px 40px 15px;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    padding: 50px 15px 30px 15px;
  }
`

// ========================================== SECTION HEADER

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 80%;
`

export const SectionHeaderTitle = styled.div`
  display: flex;

  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
  text-align: center;

  color: #ff813b;
`

export const SectionHeaderLegend = styled.div`
  display: flex;

  font-size: 16px;
  line-height: 20px;
  font-weight: 300;
  text-align: center;
`

// ========================================== HEADER

export const Header = styled.section`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${landingHeaderHeight};
  padding: 0 15px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
`

export const HeaderLogo = styled.div`
  display: flex;
`

export const HeaderNavigation = styled.div`
  display: flex;
  column-gap: 15px;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .ant-anchor-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    margin-bottom: -3px;
  }

  .ant-anchor-wrapper::before {
    border: none;
  }

  .ant-anchor {
    display: flex;
    align-items: center;
    height: 100%;
    padding-bottom: 4px;
  }
`

export const HeaderNavigationLink = styled.div`
  display: flex;
  cursor: pointer;
  transition: 0.3s;

  font-size: 14px;
  line-height: 14px;
  font-weight: 300;

  color: rgba(0, 0, 0, 0.8);

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`

export const HeaderAuth = styled.div`
  display: flex;
  column-gap: 5px;
`

// ========================================== HERO BANNER

export const HeroBanner = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin: 60px 0 40px 0;
  padding: 0 15px;

  background-color: #ff813b;

  @media screen and (max-width: ${responsiveTablet}) {
    margin: 20px 0 100px 0;
  }
`

export const HeroBannerWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  column-gap: 40px;

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    align-items: center;
  }
`

export const HeroBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
  width: 55%;
  padding: 60px 0;

  /* border: 2px solid blue; */

  @media screen and (max-width: ${responsiveTablet}) {
    width: 80%;
    align-items: center;
    padding: 60px 0 40px 0;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;
  }
`

export const HeroBannerTitle = styled.div`
  display: flex;

  font-size: 25px;
  line-height: 32px;
  font-weight: 600;

  color: white;

  @media screen and (max-width: ${responsiveTablet}) {
    text-align: center;
  }
`

export const HeroBannerLegend = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;

    color: white;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    text-align: center;
  }
`

export const HeroBannerCta = styled.div`
  display: flex;
  margin-top: 15px;
`

export const HeroBannerImage = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;

  /* border: 2px solid red; */

  img {
    position: absolute;
    height: 125%;

    /* border: 2px solid green; */
  }

  @media screen and (max-width: ${responsiveTablet}) {
    justify-content: center;
    align-items: flex-start;
    height: 180px;

    img {
      height: 150%;
    }
  }
`

// ========================================== FEATURES SECTION

export const FeaturesSection = styled(SectionWrapper)`
  display: flex;
`

export const FeaturesSectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 40px;
`

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc((100% / 3) - (30px / 3));
  row-gap: 5px;

  @media screen and (max-width: ${responsiveTablet}) {
    width: calc((100% / 2) - (30px / 2));
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;
  }
`

export const FeatureIcon = styled.div`
  display: flex;
  column-gap: 8px;
  margin-bottom: 14px;

  p {
    font-size: 36px;
  }
`

export const FeatureTitle = styled.div`
  display: flex;

  font-size: 15px;
  line-height: 18px;
  font-weight: 600;
  text-align: center;
`

export const FeatureLegend = styled.div`
  display: flex;

  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
`

// ========================================== BUSINESS SECTION

export const BusinessSection = styled(SectionWrapper)`
  display: flex;
`

export const BusinessSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;

  @media screen and (max-width: ${responsiveTablet}) {
    row-gap: 30px;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    justify-content: center;
  }
`

export const Business = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  column-gap: 15px;
  width: calc((100% / 8) - (120px / 8));

  @media screen and (max-width: ${responsiveTablet}) {
    width: calc((100% / 4) - (120px / 4));
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: calc((100% / 2) - (120px / 2));
  }
`

export const BusinessIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  font-size: 32px;

  background-color: rgba(255, 122, 0, 0.2);

  &:hover {
    background-color: rgba(255, 122, 0, 0.3);
  }
`

export const BusinessLabel = styled.div`
  display: flex;

  font-size: 13px;
  line-height: 13px;
  font-weight: 500;

  color: rgba(0, 0, 0, 0.9);
`

// ========================================== FAQ SECTION

export const FaqSection = styled(SectionWrapper)`
  display: flex;
`

export const FaqSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

// ========================================== PREMIUM SECTION

export const PremiumSection = styled(SectionWrapper)`
  display: flex;
`

export const PremiumSectionWrapper = styled.div`
  display: flex;
  column-gap: 15px;

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    row-gap: 20px;

    .ant-ribbon-wrapper {
      flex: 1;
    }
  }
`

// ========================================== ABOUTUS SECTION

export const AboutUsSection = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const AboutUsSectionWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  column-gap: 20px;

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    align-items: center;
    row-gap: 25px;
  }
`

export const AboutUsSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  width: 55%;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 80%;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;
  }
`

export const AboutUsSectionTitle = styled.div`
  display: flex;

  font-size: 17px;
  line-height: 22px;
  font-weight: 700;

  /* color: rgba(0, 0, 0, 0.8); */
  color: #ff813b;

  @media screen and (max-width: ${responsiveTablet}) {
    justify-content: center;
    width: 100%;
  }
`

export const AboutUsSectionLegend = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    text-align: justify;

    color: rgba(0, 0, 0, 0.8);

    b {
      color: #ff813b;
    }

    @media screen and (max-width: ${responsiveTablet}) {
      text-align: center;
    }
  }
`

export const AboutUsSectionCta = styled.div`
  display: flex;
  margin-top: 15px;
`
export const AboutUsSectionImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 45%;

  img {
    position: absolute;
    width: 90%;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    width: 60%;

    img {
      position: relative;
    }
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 80%;
  }
`

// ========================================== CTA BANNER

export const CtaBanner = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 70px 0 140px 0;
  padding: 0 15px;

  background-color: #ff813b;

  @media screen and (max-width: ${responsiveTablet}) {
    margin-bottom: 180px;
  }

  @media screen and (max-width: ${responsiveMobile}) {
    margin: 40px 0 180px 0;
  }
`

export const CtaBannerWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  column-gap: 50px;

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    align-items: center;
  }
`

export const CtaBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  width: 55%;
  padding: 35px 0;

  @media screen and (max-width: ${responsiveTablet}) {
    align-items: center;
    width: 80%;
    padding-bottom: 140px;
  }
`

export const CtaBannerTitle = styled.div`
  display: flex;

  font-size: 22px;
  line-height: 24px;
  font-weight: 800;

  color: white;

  @media screen and (max-width: ${responsiveTablet}) {
    justify-content: center;
  }
`

export const CtaBannerLegend = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;

  color: white;

  @media screen and (max-width: ${responsiveTablet}) {
    text-align: center;
  }
`

export const CtaBannerCta = styled.div`
  display: flex;
  margin-top: 15px;
`
export const CtaBannerImage = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
  padding-right: 15px;

  img {
    position: absolute;
    width: 120%;
    min-width: 200px;
    max-width: 360px;
    margin-right: -30px;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    justify-content: center;
    width: 60%;

    img {
      width: 100%;
    }
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 80%;
  }
`

// ========================================== FOOTER

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: #232323;
`

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  row-gap: 10px;
  padding: 30px 0;
`

export const FooterLogo = styled.div`
  display: flex;

  img {
    margin-left: -7px;
  }
`

export const FooterNavigation = styled.div`
  display: flex;
`

export const FooterLinks = styled.div`
  display: flex;
  column-gap: 10px;
`

export const FooterLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  cursor: pointer;

  svg {
    font-size: 20px;

    color: rgba(255, 255, 255, 0.8);
  }

  border: 1px solid rgba(255, 255, 255, 0.8);
`

export const FooterDetails = styled.p`
  width: 100%;
  padding: 15px 0;

  font-size: 13px;
  line-height: 13px;
  font-weight: 300;
  text-align: center;

  b {
    font-weight: 500;

    color: #ff7a00;
  }

  background-color: #141414;
  color: white;
`
