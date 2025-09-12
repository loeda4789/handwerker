import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { configuration, successUrl, cancelUrl } = await request.json()

    // Preis basierend auf Konfiguration berechnen
    const calculatePrice = (config: any) => {
      let basePrice = 99 // Basis-Preis in Cent
      
      // Zusätzliche Kosten für Premium-Features
      if (config.layout.variant === 'premium') basePrice += 50
      if (config.style.package === 'luxury') basePrice += 30
      if (config.features.sideContact) basePrice += 20
      
      return basePrice
    }

    const price = calculatePrice(configuration)

    // Stripe Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Handwerker Website',
              description: `Website mit ${configuration.layout.variant} Variante und ${configuration.style.package} Design`,
              images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/website-preview.jpg`],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        configuration: JSON.stringify(configuration),
        source: 'website-designer'
      },
      customer_email: undefined, // Wird vom Benutzer eingegeben
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe Checkout Session Fehler:', error)
    return NextResponse.json(
      { error: 'Fehler beim Erstellen der Checkout-Session' },
      { status: 500 }
    )
  }
}
