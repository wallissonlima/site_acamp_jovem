import React from "react";
import { PaymentStatusChecker } from "../../components/PaymentStatusChecker";

export default function PagamentoPendente() {
  return <PaymentStatusChecker mode="pending" />;
}