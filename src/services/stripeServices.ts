import * as dotenv from "dotenv";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

export default {
    createPaymentSheet: async (amount: string) => {
        const customer =  await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2022-11-15'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
        };
    },
}