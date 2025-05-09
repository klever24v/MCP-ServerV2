import { Injectable } from "@nestjs/common";
import { mcpTools } from "../tools/index.js";

@Injectable()
export class McpService {
  private toolsMap = new Map(mcpTools.map((tool) => [tool.name, tool]));

  async handle(toolName: string, params: any) {
    const tool = this.toolsMap.get(toolName);
    if (!tool) throw new Error(`Tool "${toolName}" not found`);
    return tool.handler(params);
  }
}
