import { z } from "zod";
import * as fs from 'fs';

export const FileSystemTool = {
  name: "filesystem",
  inputSchema: {
    path: z.string(),
    action: z.enum(["read", "write", "delete"]),
    content: z.string().optional(), // Aseguramos que 'content' sea opcional para el caso de lectura y eliminación
  },
  handler: async ({ path, action, content }: any) => {
    try {
      let result: string;

      if (action === "read") {
        // Leer el archivo de forma síncrona
        result = fs.readFileSync(path, 'utf-8');
      } else if (action === "write") {
        if (content) {
          // Escribir en el archivo
          fs.writeFileSync(path, content, 'utf-8');
          result = `El archivo fue escrito correctamente en ${path}.`;
        } else {
          result = "Se debe proporcionar contenido para escribir en el archivo.";
        }
      } else if (action === "delete") {
        // Eliminar el archivo
        if (fs.existsSync(path)) {
          fs.unlinkSync(path); // Elimina el archivo de forma síncrona
          result = `El archivo ${path} ha sido eliminado correctamente.`;
        } else {
          result = `El archivo ${path} no existe.`;
        }
      } else {
        result = `Acción "${action}" no soportada aún.`;
      }

      return {
        content: [{ type: "text", text: result }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error al procesar el archivo: ${error.message}` }],
      };
    }
  },
};
