import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'

interface PaymentRequest extends NextApiRequest {
  body: {
    paymentRequestId: string;
    paymentId: string;
  };
}

export default async function handler(req: PaymentRequest, res: NextApiResponse) {
  const { paymentRequestId, paymentId } = req.body;

  const apiKey = 'f8ea5f3cdc1d1aa2ebba3e7897ba581b';
  const authToken = 'b59199cd5fd569725c128e23d0de7be1';
  const verifyUrl = `https://www.instamojo.com/api/1.1/payment-requests/${paymentRequestId}/`;

  try {
    // Make a request to InstaMojo's verification endpoint
    const response = await axios.get(verifyUrl, {
      headers: {
        'X-Api-Key': apiKey,
        'X-Auth-Token': authToken,
      },
    });

    // Check the status of the payment
    const paymentDetails = response.data.payment_request.payments.find(
      (payment: any) => payment.payment_id === paymentId
    );

    if (paymentDetails && paymentDetails.status === 'Credit') {
      res.status(200).json({ success: true, data: paymentDetails });
    } else {
      res.status(400).json({ success: false, message: 'Payment not verified.' });
    }
  } catch (error:any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
