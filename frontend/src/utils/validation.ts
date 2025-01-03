import * as z from 'zod';

export const productSchema = z.object({
  nome: z.string().nonempty('O nome é obrigatório'),
  preco: z.number().positive('O preço deve ser um número positivo'),
  quantidade: z.number().int().nonnegative('A quantidade deve ser maior ou igual a zero'),
});