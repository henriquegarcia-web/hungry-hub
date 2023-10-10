import * as S from './styles'
import { CaretRightOutlined } from '@ant-design/icons'

import { PremiumPlan } from '@/components'
import { Anchor, Button, Collapse, theme } from 'antd'

import { useAdminAuth } from '@/contexts/AdminAuthContext'

import {
  IBusiness,
  IFeature,
  businessData,
  getItems,
  featuresData,
  premiumPlansData,
  socialMediasData,
  IMedia,
  IPlans
} from '@/data/landing'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <S.Landing id="home">
      <Header />
      <HeroBanner />
      <FeaturesSection />
      <BusinessSection />
      <PremiumSection />
      <FaqSection />
      <AboutUsSection />
      <CtaBanner />
      <Footer />
    </S.Landing>
  )
}

export default Landing

// ========================================== SECTION HEADER

interface ISectionHeader {
  sectionTitle: string
  sectionLegend: string
}

const SectionHeader = ({ sectionTitle, sectionLegend }: ISectionHeader) => {
  const { token } = theme.useToken()

  return (
    <S.SectionHeader>
      <S.SectionHeaderTitle>{sectionTitle}</S.SectionHeaderTitle>
      <S.SectionHeaderLegend style={{ color: token.colorTextSecondary }}>
        {sectionLegend}
      </S.SectionHeaderLegend>
    </S.SectionHeader>
  )
}

// ========================================== NAVIGATION LINKS

const NavigationLinks = [
  {
    key: 'part-1',
    href: '#home',
    title: <S.HeaderNavigationLink>Início</S.HeaderNavigationLink>
  },
  {
    key: 'part-2',
    href: '#features',
    title: <S.HeaderNavigationLink>Funcionalidades</S.HeaderNavigationLink>
  },
  {
    key: 'part-3',
    href: '#plans',
    title: <S.HeaderNavigationLink>Planos</S.HeaderNavigationLink>
  },
  {
    key: 'part-4',
    href: '#faq',
    title: <S.HeaderNavigationLink>FAQ</S.HeaderNavigationLink>
  },
  {
    key: 'part-5',
    href: '#about',
    title: <S.HeaderNavigationLink>Quem somos?</S.HeaderNavigationLink>
  }
]

// ========================================== HEADER

const Header = () => {
  const { token } = theme.useToken()

  return (
    <S.Header>
      <S.HeaderLogo>
        <img src="/logo_default.png" alt="" />
      </S.HeaderLogo>
      <S.HeaderNavigation>
        <Anchor direction="horizontal" items={NavigationLinks} />
      </S.HeaderNavigation>
      <S.HeaderAuth>
        <Link to="/admin/cadastrar">
          <Button type="default">Cadastre-se</Button>
        </Link>
        <Link to="/admin/entrar">
          <Button type="primary">Entrar</Button>
        </Link>
      </S.HeaderAuth>
    </S.Header>
  )
}

// ========================================== HERO BANNER

const HeroBanner = () => {
  const { token } = theme.useToken()

  return (
    <S.HeroBanner>
      <S.HeroBannerWrapper>
        <S.HeroBannerContent>
          <S.HeroBannerTitle>
            Transforme seu cardápio tradicional em uma experiência digital
          </S.HeroBannerTitle>
          <S.HeroBannerLegend>
            <p>
              Destaque-se da concorrência com cardápios digitais modernos e
              envolventes que cativam os clientes.
            </p>
            <p>
              Nossa plataforma oferece as ferramentas que você precisa para
              destacar seus pratos, atualizar ofertas especiais e criar uma
              experiência memorável para seus clientes.
            </p>
            <p>
              Seja um sucesso online com o <b>HungryHub</b>!
            </p>
          </S.HeroBannerLegend>
          <S.HeroBannerCta>
            <Link to="/admin/cadastrar">
              <Button type="default" style={{ borderColor: '#ffffff' }}>
                Acessar agora
              </Button>
            </Link>
          </S.HeroBannerCta>
        </S.HeroBannerContent>
        <S.HeroBannerImage>
          <img src="/hero_banner.png" alt="" />
        </S.HeroBannerImage>
      </S.HeroBannerWrapper>
    </S.HeroBanner>
  )
}

// ========================================== FEATURES SECTION

const FeaturesSection = () => {
  const { token } = theme.useToken()

  return (
    <S.FeaturesSection id="features">
      <SectionHeader
        sectionTitle="Recursos Poderosos para Restaurantes e Empresas de Alimentos"
        sectionLegend="Descubra como o HungryHub simplifica a gestão do cardápio e melhora a experiência do cliente."
      />

      <S.FeaturesSectionWrapper>
        {featuresData.map((feature: IFeature) => (
          <S.Feature key={feature.featureId}>
            <S.FeatureIcon>
              <p>{feature.featureIcon}</p>
            </S.FeatureIcon>
            <S.FeatureTitle style={{ color: token.colorTextHeading }}>
              {feature.featureTitle}
            </S.FeatureTitle>
            <S.FeatureLegend style={{ color: token.colorTextSecondary }}>
              {feature.featureLegend}
            </S.FeatureLegend>
          </S.Feature>
        ))}
      </S.FeaturesSectionWrapper>
    </S.FeaturesSection>
  )
}

// ========================================== BUSINESS SECTION

const BusinessSection = () => {
  const { token } = theme.useToken()

  return (
    <S.BusinessSection>
      <SectionHeader
        sectionTitle="Quem Pode Se Beneficiar do HungryHub?"
        sectionLegend="Desde pequenos cafés a restaurantes de alta gastronomia, o HungryHub é perfeito para todas as empresas de alimentos."
      />

      <S.BusinessSectionWrapper>
        {businessData.map((business: IBusiness) => (
          <S.Business key={business.businessId}>
            <S.BusinessIcon>{business.businessIcon}</S.BusinessIcon>
            <S.BusinessLabel>{business.businessName}</S.BusinessLabel>
          </S.Business>
        ))}
      </S.BusinessSectionWrapper>
    </S.BusinessSection>
  )
}

// ========================================== FAQ SECTION

const FaqSection = () => {
  const { token } = theme.useToken()

  // const getItems: () => CollapseProps['items'] = () => getItems

  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: token.colorBgContainerDisabled,
    borderRadius: 8,
    border: 'none',
    width: '100%'
  }

  return (
    <S.FaqSection id="faq">
      <SectionHeader
        sectionTitle="Perguntas Frequentes"
        sectionLegend="Encontre respostas para as perguntas mais comuns sobre o HungryHub."
      />

      <S.FaqSectionWrapper>
        <Collapse
          bordered={false}
          // defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </S.FaqSectionWrapper>
    </S.FaqSection>
  )
}

// ========================================== PREMIUM SECTION

const PremiumSection = () => {
  const { token } = theme.useToken()

  const { userData, isAdminPremium } = useAdminAuth()

  return (
    <S.PremiumSection id="plans">
      <SectionHeader
        sectionTitle="Escolha o Plano Ideal para o Seu Negócio"
        sectionLegend="Oferecemos opções de planos flexíveis para atender às necessidades específicas de cada empresa."
      />

      <S.PremiumSectionWrapper>
        {premiumPlansData?.map((plan: IPlans) => (
          <PremiumPlan
            key={plan.planId}
            plan={plan}
            userData={userData}
            isAdminPremium={isAdminPremium}
            // isLoadingCheckout={isLoadingCheckout}
            // handleCheckout={handleCheckout}
          />
        ))}
      </S.PremiumSectionWrapper>
    </S.PremiumSection>
  )
}

// ========================================== ABOUTUS SECTION

const AboutUsSection = () => {
  const { token } = theme.useToken()

  return (
    <S.AboutUsSection id="about">
      <SectionHeader
        sectionTitle="Conheça a HungryHub"
        sectionLegend="Nossa missão é revolucionar a forma como as empresas de alimentos compartilham seus cardápios."
      />

      <S.AboutUsSectionWrapper>
        <S.AboutUsSectionImage>
          <img src="/about_us_01.svg" alt="" />
        </S.AboutUsSectionImage>
        <S.AboutUsSectionContent>
          <S.AboutUsSectionLegend>
            <S.AboutUsSectionTitle>Nossa Visão</S.AboutUsSectionTitle>
            <p>
              A <b>HungryHub</b> nasceu da paixão por unir a gastronomia com a
              tecnologia. Fundada em 2023, nossa jornada começou com a missão de
              revolucionar a forma como as empresas de alimentos compartilham
              seus cardápios.
            </p>
          </S.AboutUsSectionLegend>
          <S.AboutUsSectionLegend>
            <S.AboutUsSectionTitle>Nosso Compromisso</S.AboutUsSectionTitle>
            <p>
              Nosso compromisso é com a inovação, a sustentabilidade e a
              satisfação do cliente. Estamos constantemente aprimorando nossa
              plataforma para atender às crescentes demandas do setor de
              alimentos."
            </p>
          </S.AboutUsSectionLegend>
          <S.AboutUsSectionCta>
            {/* <Button type="primary">Ver mais</Button> */}
          </S.AboutUsSectionCta>
        </S.AboutUsSectionContent>
      </S.AboutUsSectionWrapper>
    </S.AboutUsSection>
  )
}

// ========================================== CTA BANNER

const CtaBanner = () => {
  const { token } = theme.useToken()

  return (
    <S.CtaBanner>
      <S.CtaBannerWrapper>
        <S.CtaBannerContent>
          <S.CtaBannerTitle>Comece Hoje Mesmo!</S.CtaBannerTitle>
          <S.CtaBannerLegend>
            Junte-se a nós e transforme a maneira como você apresenta seus
            cardápios aos clientes. Experimente o <b>HungryHub</b> agora!
          </S.CtaBannerLegend>
          <S.CtaBannerCta>
            <Link to="/admin/cadastrar">
              <Button type="default" style={{ borderColor: '#ffffff' }}>
                Acessar agora
              </Button>
            </Link>
          </S.CtaBannerCta>
        </S.CtaBannerContent>
        <S.CtaBannerImage>
          <img src="/cta_banner.png" alt="" />
        </S.CtaBannerImage>
      </S.CtaBannerWrapper>
    </S.CtaBanner>
  )
}

// ========================================== FOOTER

const Footer = () => {
  const { token } = theme.useToken()

  return (
    <S.Footer>
      <S.FooterWrapper>
        <S.FooterLogo>
          <img src="/logo_dark.png" alt="" />
        </S.FooterLogo>
        <S.FooterNavigation>
          {/* <Anchor direction="horizontal" items={NavigationLinks} /> */}
        </S.FooterNavigation>
        <S.FooterLinks>
          {socialMediasData.map((media: IMedia) => (
            <S.FooterLink key={media.mediaId}>{media.mediaIcon}</S.FooterLink>
          ))}
        </S.FooterLinks>
      </S.FooterWrapper>
      <S.FooterDetails>
        <b>© HungryHub 2023</b> | Desenvolvido por VISO TI
      </S.FooterDetails>
    </S.Footer>
  )
}
