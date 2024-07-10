"use client";

import { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Context = createContext<any>(undefined);
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ city, setCity, loading, setLoading }}>{children}</Context.Provider>
    </QueryClientProvider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
