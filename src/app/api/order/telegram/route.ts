import { NextResponse } from 'next/server'

type OrderItem = {
  productId: string
  productTitle: string
  variantId: string
  dosage: string
  price: number
  quantity: number
  total: number
}

type OrderPayload = {
  customer: {
    name: string
    phone: string
    socialLink?: string
  }
  discounts: {
    promo: {
      code: string
      discountPercent: number
      discountAmount: number
    } | null
  }
  items: OrderItem[]
  totalPrice: number
  finalPrice: number
  totalQuantity: number
}

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

const escapeHtml = (value: string) => {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

const createTelegramMessage = (order: OrderPayload) => {
  const itemsText = order.items
    .map((item, index) => {
      return [
        `<b>${index + 1}. ${escapeHtml(item.productTitle)}</b>`,
        `ID товара: <code>${escapeHtml(item.productId)}</code>`,
        `Вариант: <code>${escapeHtml(item.variantId)}</code>`,
        `Дозировка: ${escapeHtml(item.dosage)}`,
        `Цена: ${formatPrice(item.price)}`,
        `Кол-во: ${item.quantity}`,
        `Сумма: ${formatPrice(item.total)}`,
      ].join('\n')
    })
    .join('\n\n')

  const promoText = order.discounts.promo
    ? [
        `<b>Промокод:</b> ${escapeHtml(order.discounts.promo.code)}`,
        `Скидка: ${order.discounts.promo.discountPercent}%`,
        `Сумма скидки: ${formatPrice(order.discounts.promo.discountAmount)}`,
      ].join('\n')
    : '<b>Промокод:</b> не применён'

  return [
    '🧾 <b>Новый заказ XYMERA</b>',
    '',
    '<b>Клиент</b>',
    `Имя: ${escapeHtml(order.customer.name)}`,
    `Телефон: ${escapeHtml(order.customer.phone)}`,
    `Telegram: ${order.customer.socialLink ? escapeHtml(order.customer.socialLink) : 'не указан'}`,
    '',
    '<b>Состав заказа</b>',
    itemsText,
    '',
    '<b>Скидки</b>',
    promoText,
    '',
    '<b>Итого</b>',
    `Товаров: ${order.totalQuantity}`,
    `Сумма без скидки: ${formatPrice(order.totalPrice)}`,
    `К оплате: ${formatPrice(order.finalPrice)}`,
  ].join('\n')
}

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { message: 'Telegram env variables are not configured' },
        { status: 500 },
      )
    }

    const order = (await request.json()) as OrderPayload

    if (!order.customer.name || !order.customer.phone || !order.items.length) {
      return NextResponse.json({ message: 'Invalid order payload' }, { status: 400 })
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: createTelegramMessage(order),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.ok) {
      return NextResponse.json(
        { message: 'Telegram delivery failed', details: result },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Order sending failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
