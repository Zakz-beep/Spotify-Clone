import Stripe from "stripe";
export interface Song{
    id:string
    user_id:string
    author:string
    title:string
    song_path:string
    image_path:string
}
export interface UserDetails{
    id:string;
    first_name:string
    last_name:string
    full_name?:string
    avatar_url?:string
    billing_address?:Stripe.Address
    payment_method?:Stripe.PaymentMethod[Stripe.PaymentMethod.Type];

    
}
export interface Product{
    
    id:string
    active?:boolean
    name?:string
    description?:string
    images?:string
    metadata?:Stripe.Metadata
}
export interface Price{
    id:string
    proudct_id?:string
    active?:boolean
    description?:string
    unit_amont?:number
    currency?:string
    type?:Stripe.Price.Type
    interval?:Stripe.Price.Recurring.Interval
    interval_count?:number
    trial_period_days?:number |null;
    metadata?:Stripe.Metadata
    product?:CSSMathProduct;
}
export interface Subscription{
    id:string
    user_id:string
    status?:Stripe.Subscription.Status;
    metadata?:Stripe.Metadata
    price?:string
    quantity?:number
    cancel_at_period_end?:boolean
    cancel_at?:string
    canceled_at?:string
    current_period_end?:string
    current_period_start?:string
    created?:string
    ended_at?:string
    trial_start?:string
    trial_end?:string
    prices?:Price
}