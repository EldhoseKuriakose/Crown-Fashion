import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H9BVcLZN95zRORBcgYbwwvyeOQOiWXrgqiEcnsZpdfSMwl3osnhXHF7mEiwi6nHBaItkqEoCK9DlxyS2zuajxqI00ejO7AxQB';
    
    /**
     * Callback function triggered when a payment token is received.
     * @param {{any}} token - The payment token received.
     * @returns None
     */
    const onToken = token => {
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown Fashion'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;