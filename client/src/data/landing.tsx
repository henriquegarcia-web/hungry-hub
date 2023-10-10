import { LiaFacebook, LiaInstagram, LiaLinkedin } from 'react-icons/lia'

import type { CSSProperties } from 'react'
import type { CollapseProps } from 'antd'

// ======================================= INTERFACES

export interface IFeature {
  featureId: string
  featureIcon: string
  featureIconSecondary: string
  featureTitle: string
  featureLegend: string
}

export interface IBusiness {
  businessId: string
  businessIcon: string
  businessName: string
  businessColor: string
}

export interface IMedia {
  mediaId: string
  mediaIcon: React.ReactNode
  mediaLabel: string
  mediaLink: string
}

export interface IBenefit {
  benefitId: string
  benefitLabel: string
}

export interface IPlans {
  planId: string
  planLimited: boolean
  planEconomic: boolean
  planLabel: string
  planDescription: string
  planPrice: string
  planPriceLabel: string
  planPriceId: string
  planBenefits: IBenefit[]
}

// ======================================= DATA

const featuresData = [
  {
    featureId: 'feature_01',
    featureIcon: '✨',
    featureIconSecondary: '💻✨',
    featureTitle: 'Cardápios Digitais Personalizáveis',
    featureLegend:
      'Crie cardápios online que refletem a identidade da sua empresa com facilidade.'
  },
  {
    featureId: 'feature_02',
    featureIcon: '🔄',
    featureIconSecondary: '⏰',
    featureTitle: 'Atualizações em Tempo Real',
    featureLegend:
      'Mantenha seus cardápios sempre atualizados para evitar frustrações dos clientes.'
  },
  {
    featureId: 'feature_03',
    featureIcon: '🌟',
    featureIconSecondary: '📊',
    featureTitle: 'Flexibilidade e Segmentação',
    featureLegend:
      'Destaque ofertas especiais, cardápios sazonais e atenda às necessidades de diferentes públicos.'
  },
  {
    featureId: 'feature_04',
    featureIcon: '😃',
    featureIconSecondary: '🍽️',
    featureTitle: 'Experiência do Cliente Aprimorada',
    featureLegend:
      'Proporcione uma experiência agradável aos clientes, permitindo que eles naveguem facilmente pelos cardápios e façam pedidos convenientemente.'
  },
  {
    featureId: 'feature_05',
    featureIcon: '💰',
    featureIconSecondary: '🌳',
    featureTitle: 'Economia de Custos',
    featureLegend:
      'Elimine os gastos com impressão de cardápios físicos, economizando em papel, tinta e mão de obra.'
  },
  {
    featureId: 'feature_06',
    featureIcon: '🥗',
    featureIconSecondary: '🌾',
    featureTitle: 'Suporte para Restrições Alimentares',
    featureLegend:
      'Crie cardápios especiais para atender às necessidades dos clientes com restrições alimentares.'
  }
]

const businessData = [
  {
    businessId: 'business_01',
    businessIcon: '🍕',
    businessName: 'Pizzarias',
    businessColor: ''
  },
  {
    businessId: 'business_02',
    businessIcon: '🍔',
    businessName: 'Hamburgueria',
    businessColor: ''
  },
  {
    businessId: 'business_03',
    businessIcon: '🍣',
    businessName: 'Sushi',
    businessColor: ''
  },
  {
    businessId: 'business_04',
    businessIcon: '☕️',
    businessName: 'Cafeteria',
    businessColor: ''
  },
  {
    businessId: 'business_05',
    businessIcon: '🍰',
    businessName: 'Confeitaria',
    businessColor: ''
  },
  {
    businessId: 'business_06',
    businessIcon: '🍨',
    businessName: 'Sorveteria',
    businessColor: ''
  },
  {
    businessId: 'business_07',
    businessIcon: '🍛',
    businessName: 'Restaurantes',
    businessColor: ''
  },
  {
    businessId: 'business_08',
    businessIcon: '🍽',
    businessName: 'Muito mais',
    businessColor: ''
  }
]

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => [
  {
    key: '1',
    label: 'Como os clientes acessam o cardápio online?',
    children: (
      <p>
        Os clientes podem acessar o cardápio online do restaurante através de um
        link fornecido pelo estabelecimento ou escaneando um código QR
        disponível no local.
      </p>
    ),
    style: panelStyle
  },
  {
    key: '2',
    label:
      'Posso personalizar o cardápio para refletir a identidade da minha empresa?',
    children: (
      <p>
        Sim, o HungryHub oferece opções de personalização. Você pode adicionar
        logotipos, imagens de pratos e descrições que se alinham com a
        identidade da sua empresa.
      </p>
    ),
    style: panelStyle
  },
  {
    key: '3',
    label: 'Quais são os benefícios financeiros de usar o HungryHub?',
    children: (
      <p>
        Ao optar por um cardápio online, você economiza em custos de impressão
        recorrentes, como papel, tinta e mão de obra. Isso resulta em economia a
        longo prazo para o seu negócio.
      </p>
    ),
    style: panelStyle
  },
  {
    key: '4',
    label:
      'Os clientes podem fazer pedidos diretamente através do cardápio online?',
    children: (
      <p>
        Nessa versão de cardápio online do HungryHub, não. Mas você pode ativar
        a funcionalidade de pedidos pelo WhatsApp, onde o cliente é
        redirecionado para o contato desejado para que possa realizar seu
        pedido.
      </p>
    ),
    style: panelStyle
  },
  {
    key: '5',
    label:
      'O HungryHub oferece suporte técnico para administradores de restaurantes?',
    children: (
      <p>
        Sim, oferecemos suporte técnico para ajudar os administradores a
        aproveitar ao máximo a plataforma HungryHub e solucionar quaisquer
        problemas que possam surgir.
      </p>
    ),
    style: panelStyle
  },
  {
    key: '6',
    label: 'Posso cancelar a qualquer momento?',
    children: (
      <p>
        Com excessão do acesso vitalício, sim. Os planos de assinaturas podem
        ser cancelados a qualquer momento.
      </p>
    ),
    style: panelStyle
  }
]

const premiumPlansData = [
  {
    planId: 'monthly_plan',
    planLimited: false,
    planEconomic: false,
    planLabel: 'Plano Mensal',
    planDescription:
      'Desfrute de acesso total ao nosso cardápio online por um mês inteiro.',
    planPrice: 'R$ 29,90',
    planPriceLabel: '/ mês',
    planPriceId: '',
    planBenefits: [
      {
        benefitId: 'benefit_monthly_01',
        benefitLabel: 'Suporte prioritário pelo WhatsApp'
      },
      {
        benefitId: 'benefit_monthly_02',
        benefitLabel: 'Categorias e produtos ilimitados'
      },
      {
        benefitId: 'benefit_monthly_03',
        benefitLabel: 'Gestão avançada de cardápios e informações da empresa'
      },
      {
        benefitId: 'benefit_monthly_04',
        benefitLabel: 'Personalização de design'
      },
      {
        benefitId: 'benefit_monthly_05',
        benefitLabel: 'Relatórios avançados de desempenho'
      },
      {
        benefitId: 'benefit_monthly_06',
        benefitLabel: 'Pedidos pelo WhatsApp'
      },
      {
        benefitId: 'benefit_monthly_07',
        benefitLabel: 'Divulgação em formato QR Code, link e mídias sociais'
      },
      {
        benefitId: 'benefit_monthly_08',
        benefitLabel: 'Acesso a novos recursos em primeira mão'
      },
      {
        benefitId: 'benefit_monthly_09',
        benefitLabel: 'Assistência na migração'
      }
    ]
  },
  {
    planId: 'annual_plan',
    planLimited: false,
    planEconomic: true,
    planLabel: 'Plano Anual',
    planDescription:
      'Com este plano, você terá acesso ilimitado ao nosso cardápio online por um ano inteiro.',
    planPrice: 'R$ 299,90',
    planPriceLabel: '/ ano',
    planPriceId: '',
    planBenefits: [
      {
        benefitId: 'benefit_annual_01',
        benefitLabel: 'Suporte prioritário pelo WhatsApp'
      },
      {
        benefitId: 'benefit_annual_02',
        benefitLabel: 'Categorias e produtos ilimitados'
      },
      {
        benefitId: 'benefit_annual_03',
        benefitLabel: 'Gestão avançada de cardápios e informações da empresa'
      },
      {
        benefitId: 'benefit_annual_04',
        benefitLabel: 'Personalização de design'
      },
      {
        benefitId: 'benefit_annual_05',
        benefitLabel: 'Relatórios avançados de desempenho'
      },
      {
        benefitId: 'benefit_annual_06',
        benefitLabel: 'Pedidos pelo WhatsApp'
      },
      {
        benefitId: 'benefit_annual_07',
        benefitLabel: 'Divulgação em formato QR Code, link e mídias sociais'
      },
      {
        benefitId: 'benefit_annual_08',
        benefitLabel: 'Acesso a novos recursos em primeira mão'
      },
      {
        benefitId: 'benefit_annual_09',
        benefitLabel: 'Assistência na migração'
      }
    ]
  },
  {
    planId: 'lifetime_plan',
    planLimited: true,
    planEconomic: false,
    planLabel: 'Acesso Vitalício',
    planDescription:
      'Com uma única taxa, você garante acesso vitalício ao nosso cardápio online, sem qualquer limitação.',
    planPrice: 'R$ 349,90',
    planPriceLabel: '/ sempre',
    planPriceId: '',
    planBenefits: [
      {
        benefitId: 'benefit_lifetime_01',
        benefitLabel: 'Suporte prioritário pelo WhatsApp'
      },
      {
        benefitId: 'benefit_lifetime_02',
        benefitLabel: 'Categorias e produtos ilimitados'
      },
      {
        benefitId: 'benefit_lifetime_03',
        benefitLabel: 'Gestão avançada de cardápios e informações da empresa'
      },
      {
        benefitId: 'benefit_lifetime_04',
        benefitLabel: 'Personalização de design'
      },
      {
        benefitId: 'benefit_lifetime_05',
        benefitLabel: 'Relatórios avançados de desempenho'
      },
      {
        benefitId: 'benefit_lifetime_06',
        benefitLabel: 'Pedidos pelo WhatsApp'
      },
      {
        benefitId: 'benefit_lifetime_07',
        benefitLabel: 'Divulgação em formato QR Code, link e mídias sociais'
      },
      {
        benefitId: 'benefit_lifetime_08',
        benefitLabel: 'Acesso a novos recursos em primeira mão'
      },
      {
        benefitId: 'benefit_lifetime_09',
        benefitLabel: 'Assistência na migração'
      },
      {
        benefitId: 'benefit_lifetime_10',
        benefitLabel: 'Acesso vitalício à recursos e futuras atualizações'
      }
    ]
  }
]

// O plano mensal é perfeito para aqueles que desejam flexibilidade. Desfrute de acesso total ao nosso cardápio online por um mês inteiro.
// O plano anual é a escolha econômica para os que planejam a longo prazo. Com este plano, você terá acesso ilimitado ao nosso cardápio online por um ano inteiro.
// O plano vitalício é a opção definitiva para aqueles que desejam uma experiência ininterrupta e duradoura. Com uma única taxa, você garante acesso vitalício ao nosso cardápio online, sem qualquer limitação.

const socialMediasData = [
  {
    mediaId: 'media_instagram',
    mediaIcon: <LiaInstagram />,
    mediaLabel: 'Instagram',
    mediaLink: 'https://www.instagram.com/hungryhub.cardapio/'
  },
  {
    mediaId: 'media_facebook',
    mediaIcon: <LiaFacebook />,
    mediaLabel: 'Facebook',
    mediaLink: ''
  },
  {
    mediaId: 'media_linkedin',
    mediaIcon: <LiaLinkedin />,
    mediaLabel: 'LinkedIn',
    mediaLink: ''
  }
]

export {
  featuresData,
  businessData,
  getItems,
  premiumPlansData,
  socialMediasData
}
