import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Index } from "./routes/index";
import { Toaster } from "@/components/ui/sonner";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Index />
    <Toaster />
  </StrictMode>
);
