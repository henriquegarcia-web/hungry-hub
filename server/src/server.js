require('dotenv').config()

const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.js')

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment')

const port = 5000

app.use(express.json())
app.use(bodyParser.json())

const [monthly, annual] = [
  'price_1NxefkHkYVVmWVJMd2PjzGKU',
  'price_1NxegnHkYVVmWVJMVkBKZ2Id'
]

const lifetime = 'price_1NxehFHkYVVmWVJMeWCVFKP4'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://agendi-fy-pro-default-rtdb.firebaseio.com'
})

app.use(
  cors({
    origin: process.env.HOST
  })
)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const stripeSession = async (plan, custumerEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: custumerEmail,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan,
          quantity: 1
        }
      ],
      success_url: `${process.env.HOST}/admin/checkout-status/success`,
      cancel_url: `${process.env.HOST}/admin/checkout-status/cancel`
    })

    return session
  } catch (error) {
    return error
  }
}

// ======================== CREATE SUBSCRIPTION ======================== //

app.post('/api/v1/create-subscription-checkout-session', async (req, res) => {
  const { plan, custumerId, custumerEmail } = req.body

  let planId = null
  if (plan == 'monthly_plan') planId = monthly
  else if (plan == 'annual_plan') planId = annual

  try {
    const session = await stripeSession(planId, custumerEmail)
    const user = await admin.auth().getUser(custumerId)

    await admin
      .database()
      .ref('adminAccounts')
      .child(user.uid)
      .update({
        adminSubscription: {
          sessionId: session.id
        }
      })

    return res.json({ session })
  } catch (error) {
    res.send(error)
  }
})

// ========================== PAYMENT SUCCESS ========================== //

app.post('/api/v1/payment-success', async (req, res) => {
  const { sessionId, firebaseId } = req.body

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      const subscriptionId = session.subscription

      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const user = await admin.auth().getUser(firebaseId)
        const planId = subscription.plan.id

        let planType = ''
        if (subscription.plan.amount === 3990) planType = 'monthly_plan'
        else if (subscription.plan.amount === 27990) planType = 'annual_plan'

        const startDate = moment
          .unix(subscription.current_period_start)
          .format('DD-MM-YYYY')
        const endDate = moment
          .unix(subscription.current_period_end)
          .format('DD-MM-YYYY')
        const durationIsSeconds =
          subscription.current_period_end - subscription.current_period_start
        const durationIsDays = moment
          .duration(durationIsSeconds, 'seconds')
          .asDays()

        await admin
          .database()
          .ref('adminAccounts')
          .child(user.uid)
          .update({
            adminSubscription: {
              sessionId: null,
              planId: planId,
              planType: planType,
              planStartDate: startDate,
              planEndDate: endDate,
              planDuration: durationIsDays
            }
          })
      } catch (error) {
        console.error('Falha ao inscrever usuário')
      }
      return res.json({ message: 'Pagamento concluído com sucesso' })
    } else {
      return res.json({ message: 'Falha ao concluir pagamento' })
    }
  } catch (error) {
    res.send(error)
  }
})

app.get('/teste', async (req, res) => {
  res.send('Teste')
})

app.listen(port, () => {
  console.log('Servidor rodando na porta:', port)
})
