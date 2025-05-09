import { z } from 'zod';

export const CalculatorTool = {
  name: 'calculator',
  inputSchema: z.object({
    a: z.number(),
    b: z.number(),
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
  }),
  handler: async ({ a, b, operation }: any) => {
    let result: number | string;

    switch (operation) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        result = b !== 0 ? a / b : 'Error: División por cero.';
        break;
      default:
        result = 'Operación no soportada.';
    }

    return {
      content: [
        {
          type: 'text',
          text: String(result),
        },
      ],
    };
  },
};

