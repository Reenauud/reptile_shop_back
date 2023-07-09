import { Query, Resolver, Authorized, Arg, ObjectType, Field, Mutation } from "type-graphql";
import stripeServices from "../services/stripeServices";


@ObjectType()
class Payment {
    @Field()
    paymentIntent!: string;
    @Field()
    ephemeralKey!: string;
    @Field()
    customer!: string;
    @Field()
    publishableKey!: string;
}

@Resolver()
export class StripeResolvers {
    //@Authorized()
    @Mutation(() => Payment)
    async createPaymentSession(
        @Arg("amount") amount: string
    ): Promise<Object> {
        try {
            let paymentSheetDetails = await stripeServices.createPaymentSheet(amount);
            return paymentSheetDetails;
        } catch (e) {
            throw new Error("Erreur en procédant au paiement.")
        }
    }

}