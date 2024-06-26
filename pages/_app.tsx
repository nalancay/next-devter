import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppLayout } from "@/components/AppLayout";
import { AppProvider } from "@/components/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  );
}
