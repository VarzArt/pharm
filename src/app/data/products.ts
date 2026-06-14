import type { Product, ProductCategoryOption } from '@/app/types/product'

export const productCategories: ProductCategoryOption[] = [
  { id: 'all', label: 'Все' },
  { id: 'energy-recovery', label: 'Энергия, восстановление' },
  { id: 'joints', label: 'Связки суставы' },
  { id: 'anti-age', label: 'Anti-age' },
  { id: 'weight-control', label: 'Контроль веса' },
  { id: 'beauty-health', label: 'Красота и здоровье' },
]

export const promoCodes = [
  { code: 'XYMERA10', discountPercent: 10 },
  { code: 'PEPTIDE15', discountPercent: 15 },
  { code: 'START20', discountPercent: 20 },
]

export const products: Product[] = [
  {
    id: 'ghk-cupr',
    slug: 'ghk-cupr',
    title: 'GHK-CUPR',
    subtitle: 'Copper Peptide Complex',
    image: '/products/test1.jpg',
    categories: ['beauty-health'],
    isAvailable: true,
    relatedProductIds: ['glow', 'acetyl-epitalon', 'melanotan-2'],
    description:
      'GHK-Cu — природный трипептид, связанный с ионом меди. Используется в исследовательских целях в контексте восстановления, качества кожи и возрастных изменений.',
    mainEffects: [
      'Стимулирует синтез коллагена, эластина и гликозаминогликанов.',
      'Поддерживает процессы регенерации кожи и тканей.',
      'Обладает антиоксидантным и противовоспалительным потенциалом.',
      'Используется в anti-age протоколах для качества кожи, упругости и восстановления.',
    ],
    variants: [
      {
        id: 'ghk-cupr-100mg',
        label: '100mg',
        dosage: '100mg',
        price: 9200,
      },
      {
        id: 'ghk-cupr-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 9200,
      },
      {
        id: 'ghk-cupr-1000mg',
        label: '1000mg',
        dosage: '1000mg',
        price: 9200,
      },
    ],
  },
  {
    id: 'melanotan-2',
    slug: 'melanotan-2',
    title: 'Melanotan 2',
    subtitle: 'α-MSH Analog',
    image: '/products/test2.jpg',
    categories: ['beauty-health'],
    isAvailable: true,
    relatedProductIds: ['bpc-157', 'tb-500', 'kpv'],
    description:
      'Melanotan 2 — синтетический аналог α-меланоцит-стимулирующего гормона. Используется в исследовательских целях.',
    mainEffects: [
      'Стимулирует выработку меланина.',
      'Исследуется в контексте фотопротекции и реакции кожи на ультрафиолет.',
      'Может влиять на аппетит и метаболические процессы.',
    ],
    variants: [
      {
        id: 'melanotan-2-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 5900,
      },
    ],
  },
  {
    id: 'mots-c',
    slug: 'mots-c',
    title: 'MOTS-c',
    subtitle: 'Mitochondrial Peptide',
    image: '/products/test3.jpg',
    categories: ['energy-recovery', 'anti-age'],
    relatedProductIds: ['mots-c', 'kisspeptide', 'kpv'],
    isAvailable: true,
    description:
      'MOTS-c — митохондриальный пептид, кодируемый митохондриальной ДНК. Изучается в контексте энергетического обмена и метаболического здоровья.',
    mainEffects: [
      'Поддерживает функцию митохондрий.',
      'Активирует AMPK — путь энергетического баланса.',
      'Исследуется в контексте чувствительности к инсулину и метаболизма глюкозы.',
      'Может быть связан с выносливостью, восстановлением и anti-age направлением.',
    ],
    variants: [
      {
        id: 'mots-c-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 7900,
      },
    ],
  },
  {
    id: 'bpc-157',
    slug: 'bpc-157',
    title: 'BPC-157',
    subtitle: 'Body Protection Compound',
    image: '/products/test3.jpg',
    categories: ['joints'],
    isAvailable: true,
    relatedProductIds: ['retatrutide', 'tirzepatide', 'mots-c'],
    description:
      'BPC-157 — синтетический пентадекапептид, производный от белка желудочного сока. Используется в исследовательских целях.',
    mainEffects: [
      'Исследуется в контексте восстановления сухожилий, связок, мышц и костей.',
      'Может поддерживать процессы заживления и ангиогенеза.',
      'Изучается в контексте защиты слизистой желудка и кишечника.',
      'Имеет противовоспалительный и нейропротекторный исследовательский потенциал.',
    ],
    variants: [
      {
        id: 'bpc-157-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 6900,
      },
    ],
  },
  {
    id: 'tb-500',
    slug: 'tb-500',
    title: 'TB-500',
    subtitle: 'Thymosin Beta-4',
    image: '/products/test2.jpg',
    categories: ['joints'],
    isAvailable: true,
    relatedProductIds: ['ghk-cupr', 'glow', 'acetyl-epitalon'],
    description:
      'TB-500 — синтетическая версия фрагмента тимозина бета-4. Применяется в исследовательских целях.',
    mainEffects: [
      'Исследуется в контексте подвижности клеток и миграции клеток к месту повреждения.',
      'Может поддерживать процессы восстановления мышц, сухожилий и связок.',
      'Изучается в контексте ангиогенеза и снижения воспаления.',
      'Часто рассматривается в сочетании с BPC-157 в восстановительных протоколах.',
    ],
    variants: [
      {
        id: 'tb-500-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 7400,
      },
    ],
  },
  {
    id: 'retatrutide',
    slug: 'retatrutide',
    title: 'Reta',
    subtitle: 'Retatrutide',
    image: '/products/test1.jpg',
    categories: ['weight-control'],
    isAvailable: true,
    relatedProductIds: ['glow', 'acetyl-epitalon', 'melanotan-2'],
    description:
      'Retatrutide — тройной агонист рецепторов GLP-1, GIP и глюкагона. Изучается в контексте контроля веса и метаболических процессов.',
    mainEffects: [
      'Исследуется в контексте снижения аппетита.',
      'Изучается в направлении контроля веса.',
      'Может быть связан с улучшением контроля глюкозы и метаболического профиля.',
      'Действует через три гормональных пути.',
    ],
    variants: [
      {
        id: 'retatrutide-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 14900,
      },
    ],
  },
  {
    id: 'glow',
    slug: 'glow',
    title: 'Glow',
    subtitle: 'Recovery & Beauty Stack',
    image: '/products/test1.jpg',
    categories: ['beauty-health'],
    isAvailable: true,
    description:
      'Glow — комплексная смесь для исследовательских задач, связанных с восстановлением, качеством кожи и снижением воспалительных процессов.',
    composition: ['GHK-Cu — 50mg', 'TB-500 — 10mg', 'BPC-157 — 10mg', 'KPV — 10mg'],
    relatedProductIds: ['bpc-157', 'tb-500', 'kpv'],
    mainEffects: [
      'GHK-Cu — качество кожи, коллаген, anti-age направление.',
      'TB-500 — подвижность клеток и восстановительные процессы.',
      'BPC-157 — тканевая репарация и ангиогенез.',
      'KPV — противовоспалительное направление.',
      'Комплекс изучается в контексте восстановления после повреждений и улучшения качества тканей.',
    ],
    variants: [
      {
        id: 'glow-80mg',
        label: '80mg',
        dosage: '80mg',
        price: 16900,
      },
    ],
  },
  {
    id: 'acetyl-epitalon',
    slug: 'acetyl-epitalon',
    title: 'Ас-Эпиталон',
    subtitle: 'Acetyl Epitalon',
    image: '/products/test2.jpg',
    categories: ['anti-age', 'beauty-health'],
    isAvailable: true,
    relatedProductIds: ['mots-c', 'kisspeptide', 'kpv'],
    description:
      'Ас-Эпиталон — ацетилированная версия эпиталона, тетрапептида, изучаемого в контексте клеточного старения и циркадных ритмов.',
    mainEffects: [
      'Исследуется в контексте активности теломеразы и теломер.',
      'Может быть связан с anti-age направлением.',
      'Изучается в контексте сна, мелатонина и циркадных ритмов.',
      'Рассматривается в исследованиях, связанных с антиоксидантной и нейропротекторной активностью.',
    ],
    variants: [
      {
        id: 'acetyl-epitalon-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 6400,
      },
    ],
  },
  {
    id: 'kisspeptide',
    slug: 'kisspeptide',
    title: 'Kisspeptide',
    subtitle: 'Kisspeptin-10',
    image: '/products/test3.jpg',
    categories: ['energy-recovery', 'beauty-health'],
    isAvailable: true,
    relatedProductIds: ['retatrutide', 'tirzepatide', 'mots-c'],
    description:
      'Kisspeptide-10 — короткий нейропептид, изучаемый как регулятор гипоталамо-гипофизарно-гонадной оси.',
    mainEffects: [
      'Исследуется в контексте регуляции GnRH, LH и FSH.',
      'Может быть связан с поддержкой уровня половых гормонов естественным путём.',
      'Изучается в контексте либидо, фертильности и репродуктивной функции.',
      'Рассматривается в исследованиях восстановления гормональной оси.',
    ],
    variants: [
      {
        id: 'kisspeptide-5mg',
        label: '5mg',
        dosage: '5mg',
        price: 5900,
      },
    ],
  },
  {
    id: 'tirzepatide',
    slug: 'tirzepatide',
    title: 'Тирзепатид',
    subtitle: 'Tirzepatide',
    image: '/products/test1.jpg',
    categories: ['weight-control'],
    isAvailable: true,
    relatedProductIds: ['ghk-cupr', 'glow', 'acetyl-epitalon'],
    description:
      'Тирзепатид — двойной агонист рецепторов GLP-1 и GIP. Изучается в контексте контроля веса и метаболического здоровья.',
    mainEffects: [
      'Исследуется в направлении снижения веса.',
      'Изучается в контексте контроля уровня сахара в крови.',
      'Может влиять на аппетит и метаболические процессы.',
      'Рассматривается в исследованиях сердечно-сосудистых и метаболических показателей.',
    ],
    variants: [
      {
        id: 'tirzepatide-10mg',
        label: '10mg',
        dosage: '10mg',
        price: 12900,
      },
    ],
  },
  {
    id: 'kpv',
    slug: 'kpv',
    title: 'KPV',
    subtitle: 'Anti-inflammatory Peptide',
    image: '/products/test2.jpg',
    categories: ['energy-recovery', 'joints'],
    isAvailable: true,
    relatedProductIds: ['glow', 'acetyl-epitalon', 'melanotan-2'],
    description:
      'KPV — трипептид, C-терминальный фрагмент α-MSH. Изучается в контексте воспалительных процессов, кожи и слизистых.',
    mainEffects: [
      'Исследуется в контексте ингибирования NF-κB и провоспалительных цитокинов.',
      'Может поддерживать процессы восстановления кожи и слизистых.',
      'Изучается в направлении барьерных функций кишечника и кожи.',
      'Рассматривается в исследованиях ЖКТ, кожных состояний и локального воспаления.',
    ],
    variants: [
      {
        id: 'kpv-5mg',
        label: '5mg',
        dosage: '5mg',
        price: 5400,
      },
    ],
  },
]

//TODO: 2. Сделать команду в бота для сортировки по промокодам
//TODO: 6. Поменять фотографии (Основные + товарные)
