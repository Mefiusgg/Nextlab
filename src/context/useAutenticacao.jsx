import { useContext } from "react";
import { AutenticacaoContext } from "./AutenticacaoProvider";

export const useAuth = () => useContext(AutenticacaoContext);