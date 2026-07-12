import React, { createContext, useState, useEffect, useContext } from "react";
import api from "@/services/api";

interface User {
  id?: string;
  name: string;
  login?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginVal: string, passwordVal: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há uma sessão ativa tentando buscar alguma info no BFF
  const checkSession = async () => {
    try {
      // Como os cookies HttpOnly persistem no cookie jar nativo do iOS/Android,
      // qualquer requisição protegida informará se estamos logados.
      // Tentaremos fazer uma chamada para buscar o ID 1 da unidade central ou material
      const response = await api.get("/catalog/materials/1001");
      // Se não der erro 401, a sessão está válida
      if (response.status === 200 || response.status === 404) {
        // Mock ou recupere o usuário do estado persistido
        setUser({ name: "Bibliotecário Móvel" });
      }
    } catch (err: any) {
      console.log("Sessão móvel inativa ou expirada:", err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (loginVal: string, passwordVal: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/bff/auth/login", {
        login: loginVal,
        password: passwordVal,
      });

      // Se sucesso, o BFF retornou as credenciais nos cookies HTTP-Only e o usuário em data
      const userData = response.data?.data?.user || response.data?.user || { name: "Bibliotecário Móvel" };
      setUser(userData);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/bff/auth/logout", {});
    } catch (error) {
      console.error("Erro ao realizar logout no mobile:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
