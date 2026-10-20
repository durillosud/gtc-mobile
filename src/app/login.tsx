import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";

const loginSchema = z.object({
  login: z.string().min(3, "O login deve ter pelo menos 3 caracteres"),
  password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await login(data.login, data.password);
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.data?.error || err.response?.data?.error || "Credenciais inválidas ou erro de rede.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.brandTitle, { color: theme.text }]}>GNUTECA</Text>
          <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]}>Staff Mobile Portal</Text>

          {errorMsg && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}

          {/* Input de Login */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Login</Text>
            <Controller
              control={control}
              name="login"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }, errors.login && styles.inputError]}
                  placeholder="Seu identificador (ex: admin)"
                  placeholderTextColor={theme.textSecondary + "90"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              )}
            />
            {errors.login && <Text style={styles.validationError}>{errors.login.message}</Text>}
          </View>

          {/* Input de Senha */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Senha</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }, errors.password && styles.inputError]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.textSecondary + "90"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              )}
            />
            {errors.password && <Text style={styles.validationError}>{errors.password.message}</Text>}
          </View>

          {/* Botão de Entrar */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent, shadowColor: theme.accent }]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Acessar Painel</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 4,
    marginBottom: 32,
  },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  errorText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(2, 6, 23, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: "rgba(239, 68, 68, 0.5)",
  },
  validationError: {
    color: "#f87171",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
