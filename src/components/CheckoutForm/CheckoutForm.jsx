import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import Button from '../button/button';
import { removeAllFromUserCart } from '../../utils/firebase.utils';
import { clearCart } from '../../store/cartItems/cartItemsSlice';
import { clearUserCart } from '../../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.USER.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment status: ' + paymentIntent.status + '🎉');
      if (currentUser) {
        removeAllFromUserCart();
        dispatch(clearUserCart());
      } else {
        dispatch(clearCart());
      }
      navigate('completion');
    } else {
      setMessage('Unexpected state');
    }
    setIsProcessing(false);
  };

  return (
    <>
      <h3 className='fw-bold'>Contact info</h3>
      <form className='mt-3 mb-4'>
        <LinkAuthenticationElement />
      </form>
      <h3 className='fw-bold'>Shipping</h3>
      <form className='mt-3 mb-4'>
        <AddressElement options={{ mode: 'shipping' }} />
      </form>
      <h3 className='fw-bold'>Payment</h3>
      <form id='payment-form' onSubmit={handleSubmit} className='mt-3'>
        <PaymentElement />
        <div className='mt-4'>
          <Button disabled={isProcessing} id='submit'>
            <span id='button-text'>
              {isProcessing ? 'Processing ... ' : 'Pay now'}
            </span>
          </Button>
        </div>

        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </>
  );
}
