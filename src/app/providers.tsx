// src/app/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};


// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import type { ReactNode } from "react";

// const queryClient = new QueryClient();

// type Props = {
//   children: ReactNode;
// };

// export const AppProvider = ({ children }: Props) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//   );
// };