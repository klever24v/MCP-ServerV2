import { z } from "zod";

export const TemperatureTool = {
  name: "temperature",
  inputSchema: {
    prompt: z.string(),
  },
  handler: async ({ prompt }: any) => {
    const fakeTemp = 23;
    return {
      content: [
        {
          type: "text",
          text: `Según el prompt "${prompt}", la temperatura es de ${fakeTemp}°C.`,
        },
      ],
    };
  },
};

