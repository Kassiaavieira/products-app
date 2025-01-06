import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório e não pode ser vazio'),
  price: z.number().positive('O preço deve ser um número positivo'),
  amount: z.number()
    .int('A quantidade deve ser um número inteiro')
    .gt(0, 'A quantidade deve ser maior que zero'),
});
