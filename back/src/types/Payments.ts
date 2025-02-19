interface Payment {
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
  currency: string;
  price: number;
  billing: {
    address: {
      country: string;
    };
  };
}
interface PaymentResponse {
  id: string;
  reference: string;
  _links: {
    self: {
      href: string;
    };
    redirect: {
      href: string;
    };
  };
}
interface PaymentError {
  request_id: string;
  error_type: string;
  error_codes: string[];
}
