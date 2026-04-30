import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { Toaster } from "@/components/ui/sonner";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
    <Toaster />
  </StrictMode>
);