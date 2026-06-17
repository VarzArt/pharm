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
      'GHK-Cu - это природный трипептид (глицил-L-гистидил-L-лизин), связанный с ионом меди (Cu²⁺). Он естественным образом присутствует в плазме крови человека, но уровень снижается с возрастом.',
    mainEffects: [
      'Стимулирует синтез коллагена, эластина и гликозаминогликанов;',
      'Ускоряет заживление ран, регенерацию тканей (кожа, лёгкие, печень, желудок);',
      'Обладает антиоксидантным, противовоспалительным и антиканцерогенным действием;',
      'Модулирует экспрессию более 4000 генов, улучшает ангиогенез (рост сосудов), защищает клетки;',
      'Полезен для кожи (анти-эйдж, упругость, уменьшение морщин), роста волос и общего восстановления.',
    ],
    variants: [
      {
        id: 'ghk-cupr-100mg/vial',
        label: '100mg/1vial',
        dosage: '100mg/vial',
        price: 9200,
      },
      {
        id: 'ghk-cupr-100mg/3ml',
        label: '100mg/3ml',
        dosage: '100mg/3ml',
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
    description: 'Синтетический аналог α-меланоцит-стимулирующего гормона (α-MSH).',
    mainEffects: [
      'Стимулирует выработку меланина → тёмный загар без длительного пребывания на солнце (фотопротекция);',
      'Снижает аппетит, может способствовать потере жира;',
      'Дополнительно: возможное влияние на метаболизм и иммунитет.',
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
      'Митохондриальный пептид (mitochondrial-derived peptide), кодируемый митохондриальной ДНК.',
    mainEffects: [
      'Улучшает функцию митохондрий, активирует AMPK (путь энергетического баланса);',
      'Повышает чувствительность к инсулину, способствует сжиганию жира, снижает висцеральный жир;',
      'Улучшает метаболизм глюкозы, физическую выносливость и восстановление;',
      'Антивозрастное и антидиабетическое действие (в моделях предотвращает ожирение и инсулинорезистентность).',
    ],
    variants: [
      {
        id: 'mots-c-10mg',
        label: '10mg/1vial',
        dosage: '10mg',
        price: 7900,
      },
      {
        id: 'mots-c-50mg',
        label: '50mg/3ml',
        dosage: '50mg',
        price: 11900,
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
      'Body Protection Compound-157 - синтетический пентадекапептид, производный от белка желудочного сока.',
    mainEffects: [
      'Мощная регенерация тканей: сухожилия, связки, мышцы, кости, ЖКТ;',
      'Ускоряет заживление ран, ангиогенез, защищает слизистую желудка и кишечника;',
      'Противовоспалительное, нейропротекторное действие;',
      'Полезен при травмах, язвах, воспалительных заболеваниях кишечника и даже при повреждениях от стероидов.',
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
    description: 'Синтетическая версия фрагмента тимозина бета-4.',
    mainEffects: [
      'Улучшает подвижность клеток (через актин), ускоряет миграцию клеток к месту повреждения;',
      'Стимулирует заживление ран, рост новых сосудов, регенерацию мышц, сухожилий и связок;',
      'Снижает воспаление, улучшает гибкость тканей, может способствовать росту волос;',
      'Часто используется в комбинации с BPC-157 («Wolverine stack») для синергетического восстановления.',
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
      'Тройной агонист рецепторов (GLP-1 + GIP + глюкагон). Препарат для снижения веса (аналог семаглутида/тирзепатида, но мощнее).',
    mainEffects: [
      'Сильное подавление аппетита;',
      'Значительная потеря веса (в исследованиях до 24% за 48 недель на высоких дозах);',
      'Улучшение контроля глюкозы, снижение HbA1c, положительное влияние на метаболизм;',
      'Действует через три гормональных пути для большего эффекта, чем двойные агонисты.',
    ],
    variants: [
      {
        id: 'retatrutide-10mg',
        label: '10mg/1vial',
        dosage: '10mg',
        price: 14900,
      },
      {
        id: 'retatrutide-30mg',
        label: '30mg/3ml',
        dosage: '30mg',
        price: 19900,
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
    composition: ['GHK-Cu — 50mg', 'TB-500 — 10mg', 'BPC-157 — 10mg', 'KPV — 10mg'],
    relatedProductIds: ['bpc-157', 'tb-500', 'kpv'],
    description:
      'Готовая смесь («Glow» или «Wolverine + Glow stack») для комплексного восстановления и красоты.',
    mainEffects: [
      'GHK-Cu - регенерация кожи, коллаген, анти-эйдж, «сияние»;',
      'TB-500 - подвижность клеток, гибкость, быстрое заживление;',
      'BPC-157 - тканевая репарация, ангиогенез, защита ЖКТ;',
      'KPV - мощное противовоспалительное действие;',
      'Ускоренное восстановление после травм и операций, улучшение кожи и эластичности, снижение воспаления и общее омоложение тканей.',
    ],
    variants: [
      {
        id: 'glow-80mg',
        label: '80mg/1vial',
        dosage: '80mg',
        price: 16900,
      },
      {
        id: 'glow-66mg',
        label: '66mg/3ml',
        dosage: '66mg',
        price: 19900,
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
    description: 'Ацетилированная версия эпиталона - тетрапептид из эпифиза (шишковидной железы).',
    mainEffects: [
      'Активирует теломеразу → удлиняет теломеры, замедляет клеточное старение;',
      'Антиоксидантное, нейропротекторное действие;',
      'Нормализует циркадные ритмы, повышает мелатонин, улучшает сон;',
      'Анти-эйдж эффект: иммунитет, гормональный баланс, возможное продление жизни (данные из российских исследований).',
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
      'Короткий нейропептид (10 аминокислот), мощный регулятор гипоталамо-гипофизарно-гонадной оси. Стимулирует выработку GnRH → повышает LH и FSH → увеличивает собственный тестостерон у мужчин и эстроген/прогестерон у женщин.',
    mainEffects: [
      'Повышает уровень половых гормонов естественным путём;',
      'Улучшает либидо, сексуальное желание и возбуждение (полезен при сниженном влечении);',
      'Поддерживает фертильность, сперматогенез, овуляцию;',
      'Применяется в исследованиях для восстановления оси после курсов стероидов (альтернатива или дополнение к ПКТ) и при гипогонадизме.',
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
    description: 'Двойной агонист рецепторов GLP-1 и GIP (торговые названия Mounjaro/Zepbound).',
    mainEffects: [
      'Сильное снижение веса (15–22% за 72 недели в исследованиях);',
      'Контроль уровня сахара в крови при диабете 2 типа;',
      'Подавление аппетита, улучшение метаболизма;',
      'Дополнительно: положительное влияние на сердечно-сосудистую систему.',
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
      'Трипептид - C-терминальный фрагмент α-меланоцит-стимулирующего гормона (α-MSH). Мощное противовоспалительное соединение, которое действует локально, не подавляя иммунитет системно.',
    mainEffects: [
      'Снижает воспаление через ингибирование NF-κB и провоспалительных цитокинов (TNF-α, IL-1, IL-6);',
      'Ускоряет заживление ран, регенерацию кожи и слизистых;',
      'Полезен при заболеваниях ЖКТ (язвенный колит, болезнь Крона, leaky gut, SIBO);',
      'Помогает при кожных проблемах (экзема, псориаз, акне, дерматит);',
      'Антимикробное и мастоцит-стабилизирующее действие;',
      'Улучшает барьерные функции кишечника и кожи.',
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
