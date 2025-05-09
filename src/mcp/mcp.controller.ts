import { Controller, Post, Body } from "@nestjs/common";
import { McpService } from "./mcp.service";

@Controller("mcp")
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Post()
  async handleTool(@Body() body: { toolName: string; params: any }) {
    return this.mcpService.handle(body.toolName, body.params);
  }
  
}
