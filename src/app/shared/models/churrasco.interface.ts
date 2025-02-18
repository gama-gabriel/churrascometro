import { Bebida } from "./bebida.interface";
import { Carne } from "./carne.interface";

export interface Churrasco {
    id?: string;
    nome: string;
    quantidade_adultos: number;
    quantidade_criancas: number;
    carnes: Carne[];
    bebidas: Bebida[];
}