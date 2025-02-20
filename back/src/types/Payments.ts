export interface Payment {
  success_url: string;
  cancel_url: string;
  failure_url: string;
  currency: string;
  billing: {
    address: {
      country: string;
    };
  },
  processing_channel_id?: string
}
export interface PaymentResponse {
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
export interface PaymentError {
  request_id: string;
  error_type: string;
  error_codes: string[];
}
