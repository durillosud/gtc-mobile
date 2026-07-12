import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ActivityIndicator,
  FlatAlignType,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "@/services/api";
import { GtcIcon } from "@/components/icons/GtcIcon";

interface ScanLog {
  id: string;
  type: "loan" | "return";
  barcode: string;
  status: "success" | "error";
  message: string;
}

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanMode, setScanMode] = useState<"patron" | "book">("patron");
  const [selectedPatron, setSelectedPatron] = useState<{ id: string; name: string } | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<ScanLog[]>([]);

  const safeAreaInsets = useSafeAreaInsets();

  if (!permission) {
    // Carregando permissões
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  if (!permission.granted) {
    // Permissão não concedida
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>Precisamos de permissão para acessar a câmera.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Conceder Acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Adiciona logs de operações na tela
  const addLog = (type: "loan" | "return", barcode: string, status: "success" | "error", message: string) => {
    const newLog: ScanLog = {
      id: Math.random().toString(),
      type,
      barcode,
      status,
      message,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
  };

  // Trata o evento de leitura de código de barras
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!isScanning || loading) return;
    setIsScanning(false);
    Vibration.vibrate(100);

    if (scanMode === "patron") {
      setLoading(true);
      try {
        // Busca o leitor no Bounded Context de Identidade
        const response = await api.get(`/persons/${data}`);
        const patronData = response.data?.data;
        if (patronData) {
          setSelectedPatron({ id: data, name: patronData.name });
          setScanMode("book"); // Alterna automaticamente para escanear livros
          addLog("loan", `Leitor: ${patronData.name}`, "success", "Identificação carregada.");
        } else {
          setSelectedPatron(null);
          addLog("loan", `ID Leitor: ${data}`, "error", "Nenhum leitor correspondente.");
        }
      } catch (err: any) {
        console.error(err);
        setSelectedPatron(null);
        addLog("loan", `ID Leitor: ${data}`, "error", "Falha ao consultar leitor.");
      } finally {
        setLoading(false);
        // Reativa scanner após 2 segundos
        setTimeout(() => setIsScanning(true), 2000);
      }
    } else {
      // Modo Livro (Realiza empréstimo ou devolução)
      setLoading(true);
      const isLoan = !!selectedPatron;
      const type = isLoan ? "loan" : "return";

      try {
        if (isLoan) {
          // Efetua Empréstimo
          await api.post("/circulation/loans", {
            person_id: Number(selectedPatron.id),
            item_number: data,
            library_unit_id: 1,
          });
          addLog("loan", data, "success", `Emprestado para ${selectedPatron.name}`);
        } else {
          // Efetua Devolução
          await api.post("/circulation/returns", {
            item_number: data,
            library_unit_id: 1,
          });
          addLog("return", data, "success", "Devolução registrada.");
        }
      } catch (err: any) {
        console.error(err);
        const errorMsg = err.response?.data?.data?.error || err.response?.data?.error || "Erro de validação.";
        addLog(type, data, "error", errorMsg);
      } finally {
        setLoading(false);
        // Reativa scanner após 2.5 segundos
        setTimeout(() => setIsScanning(true), 2500);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Header do Balcão */}
      <View style={[styles.header, { paddingTop: safeAreaInsets.top + 16 }]}>
        <Text style={styles.headerTitle}>Balcão de Circulação</Text>
        <Text style={styles.headerSubtitle}>Leitor de Código de Barras</Text>
      </View>

      {/* 2. Câmera Scanner */}
      <View style={styles.cameraWrapper}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "code128"],
          }}
        />
        {/* Retículo Visual de Foco */}
        <View style={styles.overlayContainer}>
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
      </View>

      {/* 3. Seleção de Modo & Estado do Leitor */}
      <View style={styles.bottomCard}>
        {/* Alternador de Modo */}
        <View style={styles.modeToggleContainer}>
          <TouchableOpacity
            style={[styles.modeButton, scanMode === "patron" && styles.modeButtonActive, { flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center" }]}
            onPress={() => {
              setScanMode("patron");
              setSelectedPatron(null);
            }}
          >
            <GtcIcon name="users" size={16} color={scanMode === "patron" ? "#fff" : "#64748b"} />
            <Text style={[styles.modeButtonText, scanMode === "patron" && styles.modeButtonTextActive]}>
              Identificar Leitor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, scanMode === "book" && styles.modeButtonActive, { flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center" }]}
            onPress={() => setScanMode("book")}
          >
            <GtcIcon name="scanner" size={16} color={scanMode === "book" ? "#fff" : "#64748b"} />
            <Text style={[styles.modeButtonText, scanMode === "book" && styles.modeButtonTextActive]}>
              Escanear Livros
            </Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Leitor Selecionado */}
        {selectedPatron ? (
          <View style={styles.patronCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.patronLabel}>Leitor Ativo</Text>
              <Text style={styles.patronName}>{selectedPatron.name}</Text>
              <Text style={styles.patronId}>ID: #{selectedPatron.id}</Text>
            </View>
            <TouchableOpacity style={styles.clearPatronButton} onPress={() => setSelectedPatron(null)}>
              <Text style={styles.clearPatronText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noPatronCard}>
            <Text style={styles.noPatronText}>
              Nenhum leitor identificado. Escanear livros efetuará uma{" "}
              <Text style={{ color: "#fb7185", fontWeight: "700" }}>Devolução</Text>.
            </Text>
          </View>
        )}

        {/* 4. Logs de Transações Recentes */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>Histórico Recente</Text>
          {logs.length === 0 ? (
            <Text style={styles.emptyLogs}>Nenhuma leitura registrada nesta sessão.</Text>
          ) : (
            logs.map((log) => (
              <View key={log.id} style={styles.logRow}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, width: 55 }}>
                  <GtcIcon name={log.type === "loan" ? "loan" : "return"} size={14} color={log.type === "loan" ? "#38bdf8" : "#34d399"} />
                  <Text style={styles.logType}>
                    {log.type === "loan" ? "EMP" : "DEV"}
                  </Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 12 }}>
                  <Text style={styles.logBarcode} numberOfLines={1}>
                    {log.barcode}
                  </Text>
                  <Text style={styles.logMessage} numberOfLines={1}>
                    {log.message}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    log.status === "success" ? styles.statusSuccess : styles.statusError,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      log.status === "success" ? styles.statusSuccessText : styles.statusErrorText,
                    ]}
                  >
                    {log.status === "success" ? "OK" : "ERRO"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
    padding: 24,
  },
  permissionText: {
    color: "#94a3b8",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  header: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  cameraWrapper: {
    flex: 1,
    position: "relative",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  viewfinder: {
    width: 240,
    height: 240,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#7c3aed",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  bottomCard: {
    backgroundColor: "#0f172a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  modeToggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(2, 6, 23, 0.5)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: "#7c3aed",
  },
  modeButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
  },
  modeButtonTextActive: {
    color: "#fff",
  },
  patronCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.2)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  patronLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#a78bfa",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  patronName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginTop: 2,
  },
  patronId: {
    fontSize: 12,
    color: "#a78bfa",
    marginTop: 1,
  },
  clearPatronButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearPatronText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  noPatronCard: {
    backgroundColor: "rgba(244, 63, 94, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(244, 63, 94, 0.15)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  noPatronText: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  logsContainer: {
    marginTop: 4,
  },
  logsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  emptyLogs: {
    color: "#475569",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 8,
  },
  logRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(2, 6, 23, 0.3)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  logType: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94a3b8",
  },
  logBarcode: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  logMessage: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusSuccess: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  statusSuccessText: {
    color: "#10b981",
  },
  statusError: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  statusErrorText: {
    color: "#ef4444",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },
});
