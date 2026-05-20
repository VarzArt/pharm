import type { Product, ProductCategoryOption } from '@/app/types/product'

export const productCategories: ProductCategoryOption[] = [
  { id: 'all', label: 'Все' },
  { id: 'joints', label: 'Связки суставы' },
  { id: 'weight-loss', label: 'Похудение' },
  { id: 'anti-age', label: 'Анти эйдж' },
]

export const products: Product[] = [
  {
    id: 'bpc-157',
    slug: 'bpc-157',
    title: 'BPC-157',
    subtitle: 'Bioactive Peptide Complex',
    image: '/products/test3.jpg',
    category: 'joints',
    isAvailable: true,
    description:
      'Пентадекапептид BPC-157 — синтетический фрагмент белка BPC. Высокая степень очистки, лиофилизированная форма.',
    composition: ['Bacteriostatic Water Vial', 'Sterile Water — 5ml', 'Benzyl Alcohol (0.9%)'],
    variants: [
      {
        id: 'bpc-157-5mg',
        label: '5mg',
        dosage: '5mg / 2mL',
        price: 4900,
      },
      {
        id: 'bpc-157-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 6900,
      },
      {
        id: 'bpc-157-15mg',
        label: '15mg',
        dosage: '15mg / 2mL',
        price: 8900,
      },
    ],
  },
  {
    id: 'tb-500',
    slug: 'tb-500',
    title: 'TB-500 Vial',
    subtitle: 'Thymosin Beta-4',
    image: '/products/test2.jpg',
    category: 'joints',
    isAvailable: true,
    description:
      'TB-500 — исследовательский пептид на основе тимозина бета-4. Предназначен исключительно для лабораторных исследований.',
    composition: ['TB-500 Vial', 'Sterile Water — 5ml', 'Protective Package'],
    variants: [
      {
        id: 'tb-500-5mg',
        label: '5mg',
        dosage: '5mg / 2mL',
        price: 5200,
      },
      {
        id: 'tb-500-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 7400,
      },
      {
        id: 'tb-500-20mg',
        label: '20mg',
        dosage: '20mg / 2mL',
        price: 10900,
      },
    ],
  },
  {
    id: 'cartalax',
    slug: 'cartalax',
    title: 'Cartalax',
    subtitle: 'Joint Support Peptide',
    image: '/products/test3.jpg',
    category: 'joints',
    isAvailable: true,
    description:
      'Cartalax — исследовательский пептидный комплекс для лабораторных задач, связанных с соединительными тканями.',
    composition: ['Cartalax Vial', 'Sterile Water — 5ml', 'Premium Box'],
    variants: [
      {
        id: 'cartalax-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 5700,
      },
      {
        id: 'cartalax-20mg',
        label: '20mg',
        dosage: '20mg / 2mL',
        price: 8200,
      },
      {
        id: 'cartalax-30mg',
        label: '30mg',
        dosage: '30mg / 2mL',
        price: 11200,
      },
    ],
  },

  {
    id: 'aod-9604',
    slug: 'aod-9604',
    title: 'AOD-9604',
    subtitle: 'Metabolic Peptide Complex',
    image: '/products/test1.jpg',
    category: 'weight-loss',
    isAvailable: true,
    description:
      'AOD-9604 — исследовательский пептидный комплекс для лабораторных исследований метаболических процессов.',
    composition: ['AOD-9604 Vial', 'Sterile Water — 5ml', 'Protective Insert'],
    variants: [
      {
        id: 'aod-9604-5mg',
        label: '5mg',
        dosage: '5mg / 2mL',
        price: 5400,
      },
      {
        id: 'aod-9604-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 7900,
      },
      {
        id: 'aod-9604-15mg',
        label: '15mg',
        dosage: '15mg / 2mL',
        price: 9900,
      },
    ],
  },
  {
    id: 'fragment-176-191',
    slug: 'fragment-176-191',
    title: 'Fragment 176-191',
    subtitle: 'Research Peptide',
    image: '/products/test2.jpg',
    category: 'weight-loss',
    isAvailable: true,
    description:
      'Fragment 176-191 — пептид для исследовательских задач в области метаболических процессов.',
    composition: ['Fragment Vial', 'Sterile Water — 5ml', 'Bacteriostatic Water'],
    variants: [
      {
        id: 'fragment-176-191-5mg',
        label: '5mg',
        dosage: '5mg / 2mL',
        price: 5900,
      },
      {
        id: 'fragment-176-191-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 8600,
      },
      {
        id: 'fragment-176-191-15mg',
        label: '15mg',
        dosage: '15mg / 2mL',
        price: 10800,
      },
    ],
  },
  {
    id: 'tesamorelin',
    slug: 'tesamorelin',
    title: 'Tesamorelin',
    subtitle: 'Advanced Peptide Formula',
    image: '/products/test1.jpg',
    category: 'weight-loss',
    isAvailable: true,
    description: 'Tesamorelin — лабораторный пептидный комплекс для исследовательского применения.',
    composition: ['Tesamorelin Vial', 'Sterile Water — 5ml', 'Premium Package'],
    variants: [
      {
        id: 'tesamorelin-2mg',
        label: '2mg',
        dosage: '2mg / 2mL',
        price: 6900,
      },
      {
        id: 'tesamorelin-5mg',
        label: '5mg',
        dosage: '5mg / 2mL',
        price: 9800,
      },
      {
        id: 'tesamorelin-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 14900,
      },
    ],
  },

  {
    id: 'ghk-cu',
    slug: 'ghk-cu',
    title: 'GHK-Cu',
    subtitle: 'Copper Peptide Complex',
    image: '/products/test1.jpg',
    category: 'anti-age',
    isAvailable: true,
    description:
      'GHK-Cu — медный пептидный комплекс исследовательского назначения с высокой степенью очистки.',
    composition: ['GHK-Cu Vial', 'Sterile Water — 5ml', 'Protective Box'],
    variants: [
      {
        id: 'ghk-cu-25mg',
        label: '25mg',
        dosage: '25mg / 2mL',
        price: 4900,
      },
      {
        id: 'ghk-cu-50mg',
        label: '50mg',
        dosage: '50mg / 2mL',
        price: 6100,
      },
      {
        id: 'ghk-cu-100mg',
        label: '100mg',
        dosage: '100mg / 2mL',
        price: 9200,
      },
    ],
  },
  {
    id: 'epitalon',
    slug: 'epitalon',
    title: 'Epitalon',
    subtitle: 'Bioactive Peptide Complex',
    image: '/products/test2.jpg',
    category: 'anti-age',
    isAvailable: true,
    description:
      'Epitalon — исследовательский пептидный комплекс для лабораторных задач в области биохимии.',
    composition: ['Epitalon Vial', 'Bacteriostatic Water', 'Premium Box'],
    variants: [
      {
        id: 'epitalon-10mg',
        label: '10mg',
        dosage: '10mg / 5mL',
        price: 6400,
      },
      {
        id: 'epitalon-20mg',
        label: '20mg',
        dosage: '20mg / 5mL',
        price: 9100,
      },
      {
        id: 'epitalon-30mg',
        label: '30mg',
        dosage: '30mg / 5mL',
        price: 11900,
      },
    ],
  },
  {
    id: 'thymalin',
    slug: 'thymalin',
    title: 'Thymalin',
    subtitle: 'Research Peptide Formula',
    image: '/products/test3.jpg',
    category: 'anti-age',
    isAvailable: true,
    description:
      'Thymalin — пептидный комплекс исследовательского назначения в лиофилизированной форме.',
    composition: ['Thymalin Vial', 'Sterile Water — 5ml', 'Protective Package'],
    variants: [
      {
        id: 'thymalin-10mg',
        label: '10mg',
        dosage: '10mg / 2mL',
        price: 5800,
      },
      {
        id: 'thymalin-20mg',
        label: '20mg',
        dosage: '20mg / 2mL',
        price: 8300,
      },
      {
        id: 'thymalin-30mg',
        label: '30mg',
        dosage: '30mg / 2mL',
        price: 10900,
      },
    ],
  },
]
