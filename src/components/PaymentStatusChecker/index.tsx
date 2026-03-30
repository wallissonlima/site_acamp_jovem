import React, { useEffect, useMemo, useState } from "react";
import { inscricaoStatusService, type StatusPagamento, type TipoInscricao } from "../../services/payment/inscricaoStatusService";


type PaymentStatusCheckerProps = {
  mode: "success" | "pending" | "error";
};

export function PaymentStatusChecker({ mode }: PaymentStatusCheckerProps) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusPagamento | null>(null);
  const [nome, setNome] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const inscricaoId = localStorage.getItem("inscricaoId");
  const inscricaoTipo = localStorage.getItem("inscricaoTipo") as TipoInscricao | null;

  const titulo = useMemo(() => {
    if (status === "APROVADO") return "Pagamento aprovado";
    if (status === "PENDENTE" || status === "EM_PROCESSAMENTO") return "Pagamento em análise";
    if (status === "RECUSADO") return "Pagamento recusado";
    if (status === "CANCELADO") return "Pagamento cancelado";

    if (mode === "success") return "Confirmando pagamento";
    if (mode === "pending") return "Pagamento pendente";
    return "Não foi possível concluir o pagamento";
  }, [status, mode]);

  const descricao = useMemo(() => {
    if (status === "APROVADO") {
      return "Recebemos a confirmação do seu pagamento. Sua inscrição foi concluída com sucesso.";
    }

    if (status === "PENDENTE" || status === "EM_PROCESSAMENTO") {
      return "Seu pagamento ainda está sendo processado. Isso pode levar alguns instantes.";
    }

    if (status === "RECUSADO") {
      return "O pagamento foi recusado. Você pode tentar novamente com outra forma de pagamento.";
    }

    if (status === "CANCELADO") {
      return "O pagamento foi cancelado.";
    }

    if (mode === "success") {
      return "Estamos consultando o status mais recente da sua inscrição.";
    }

    if (mode === "pending") {
      return "Seu pagamento ficou pendente. Vamos verificar se ele foi confirmado.";
    }

    return "Houve um problema ao finalizar o pagamento. Verifique o status da sua inscrição.";
  }, [status, mode]);

  useEffect(() => {
    if (!inscricaoId || !inscricaoTipo) {
      setMensagemErro("Não foi possível localizar os dados da inscrição.");
      setLoading(false);
      return;
    }

    let intervalId: number | undefined;

    const verificarStatus = async () => {
      try {
        const data = await inscricaoStatusService.buscarInscricao(
          inscricaoTipo,
          inscricaoId
        );

        setNome(data.name);
        setStatus(data.statusPagamento);

        if (
          data.statusPagamento === "APROVADO" ||
          data.statusPagamento === "RECUSADO" ||
          data.statusPagamento === "CANCELADO"
        ) {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar status:", error);
        setMensagemErro("Não foi possível consultar o status da inscrição.");
      } finally {
        setLoading(false);
      }
    };

    verificarStatus();
    intervalId = window.setInterval(verificarStatus, 3000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [inscricaoId, inscricaoTipo]);

  const limparDados = () => {
    localStorage.removeItem("inscricaoId");
    localStorage.removeItem("inscricaoTipo");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>Acampa Jovem</div>

        <h1 style={styles.title}>{titulo}</h1>

        <p style={styles.description}>{descricao}</p>

        {loading && <p style={styles.loading}>Verificando status do pagamento...</p>}

        {!loading && mensagemErro && (
          <div style={styles.alertError}>{mensagemErro}</div>
        )}

        {!loading && !mensagemErro && (
          <div style={styles.infoBox}>
            <p style={styles.infoLine}>
              <strong>Inscrição:</strong> {inscricaoId}
            </p>

            {nome ? (
              <p style={styles.infoLine}>
                <strong>Nome:</strong> {nome}
              </p>
            ) : null}

            <p style={styles.infoLine}>
              <strong>Status:</strong> {status || "Não identificado"}
            </p>
          </div>
        )}

        <div style={styles.actions}>
          <a href="/" style={styles.primaryButton} onClick={limparDados}>
            Voltar ao início
          </a>

          {(status === "RECUSADO" || status === "CANCELADO") && (
            <a href="/" style={styles.secondaryButton}>
              Tentar novamente
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background:
      "linear-gradient(180deg, #f7f8fa 0%, #eef2f7 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "680px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e9edf3",
  },
  badge: {
    display: "inline-block",
    marginBottom: "16px",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#f3f6fb",
    color: "#2f5d9f",
    fontWeight: 700,
    fontSize: "13px",
  },
  title: {
    margin: 0,
    marginBottom: "12px",
    fontSize: "32px",
    lineHeight: 1.15,
    color: "#111827",
  },
  description: {
    margin: 0,
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#4b5563",
  },
  loading: {
    margin: 0,
    marginBottom: "16px",
    color: "#1f2937",
    fontWeight: 600,
  },
  infoBox: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "20px",
  },
  infoLine: {
    margin: "0 0 10px 0",
    color: "#111827",
    fontSize: "15px",
  },
  alertError: {
    marginBottom: "20px",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    color: "#be123c",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: "12px",
    background: "#111827",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
    textDecoration: "none",
    fontWeight: 700,
  },
};