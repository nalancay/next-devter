import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "./AppContext";
import { AppLayout } from "@/components/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProvider>
  );
}
