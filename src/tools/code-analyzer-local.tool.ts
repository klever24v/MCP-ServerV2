// tools/code-analyzer-local.tool.ts
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { FileSystemTool } from "./filesystem.tool";
import * as dotenv from "dotenv";

dotenv.config();

export const CodeAnalyzerLocalTool = {
  name: "code-analyzer-local",
  inputSchema: z.object({
    directory: z.string(),
    outputName: z.string().optional(),
  }),
  handler: async ({ directory, outputName }: any) => {
    const docsDir =
      process.env.ANALYSIS_DIR || path.join(directory, "docs");

    // Crear directorio si no existe
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const files = fs
      .readdirSync(directory)
      .filter((f) => fs.statSync(path.join(directory, f)).isFile());

    const allDescriptions: Promise<string>[] = [];

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const readPromise = FileSystemTool.handler({
        path: fullPath,
        action: "read",
      }).then((result: any) => {
        const snippet = result.content[0]?.text
          .split("\n")
          .slice(0, 5)
          .join("\n");
        return `## ${file}\n\n\`\`\`\n${snippet}\n\`\`\`\n`;
      });

      allDescriptions.push(readPromise);
    }

    const resolvedDescriptions = await Promise.all(allDescriptions);
    const markdownContent = resolvedDescriptions.join("\n\n");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = outputName
      ? `${outputName}.md`
      : `code-description-${timestamp}.md`;

    const outputPath = path.join(docsDir, filename);

    await FileSystemTool.handler({
      path: outputPath,
      action: "write",
      content: markdownContent,
    });

    return {
      content: [
        {
          type: "text",
          text: `Análisis completado. El archivo está disponible en ${outputPath}`,
        },
      ],
    };
  },
};
