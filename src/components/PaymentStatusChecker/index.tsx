import React, { useMemo } from "react";
import {
  Actions,
  BrandBadge,
  Card,
  Description,
  IconCircle,
  Page,
  PrimaryButton,
  StatusTag,
  Title,
} from "./styles";

type PaymentStatusCheckerProps = {
  mode: "success" | "pending" | "error";
};

export function PaymentStatusChecker({ mode }: PaymentStatusCheckerProps) {
  const content = useMemo(() => {
    if (mode === "success") {
      return {
        title: "Pagamento realizado com sucesso",
        description:
          "Recebemos sua solicitação de pagamento com sucesso. Em breve você poderá acompanhar a confirmação e os próximos passos.",
        icon: "✓",
        statusLabel: "Pagamento aprovado",
      };
    }

    if (mode === "pending") {
      return {
        title: "Pagamento pendente",
        description:
          "Seu pagamento está em análise. Isso pode levar alguns instantes, mas não se preocupe: assim que houver confirmação, o status será atualizado.",
        icon: "!",
        statusLabel: "Aguardando confirmação",
      };
    }

    return {
      title: "Não foi possível concluir o pagamento",
      description:
        "Houve um problema ao processar seu pagamento. Você pode tentar novamente em alguns instantes ou voltar para a página inicial.",
      icon: "✕",
      statusLabel: "Falha no pagamento",
    };
  }, [mode]);

  return (
    <Page mode={mode}>
      <Card mode={mode}>
        <BrandBadge>Acampa Jovem</BrandBadge>

        <IconCircle mode={mode}>{content.icon}</IconCircle>

        <StatusTag mode={mode}>{content.statusLabel}</StatusTag>

        <Title>{content.title}</Title>

        <Description>{content.description}</Description>

        <Actions>
          <PrimaryButton href="/home">Voltar ao início</PrimaryButton>
        </Actions>
      </Card>
    </Page>
  );
}