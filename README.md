# 🧠 MCP Server con NestJS
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---
Este proyecto es un servidor modular extensible construido con NestJS que actúa como un MCP (Model Context Protocol) Server.
Su propósito es permitir que modelos LLM (como Claude, GPT, etc.) o clientes externos puedan interactuar con una colección de herramientas especializadas a través de peticiones HTTP.
Cada herramienta es registrada dinámicamente con un nombre, un esquema de entrada validado con Zod, y una función handler que ejecuta su lógica.


## 🚀 Características

- ✨ Arquitectura modular (basada en herramientas).
- 📦 Herramientas reutilizables: `calculator`, `temperature`, `filesystem`, `code-analyzer-local`.
- 🧠 Preparado para integrarse con LLMs.
- 📝 Generación automática de archivos Markdown con descripciones de código.
- 📁 Soporte para lectura/escritura/eliminación de archivos.
- 🔧 Configuración con `.env` y rutas dinámicas.

---

## 📁 Estructura del Proyecto

```
src/
├── docs/                         # Resultados en Markdown
├── mcp/                          # Módulo MCP con controlador y servicio
├── tools/                        # Herramientas disponibles
│   ├── calculator.tool.ts
│   ├── code-analyzer-local.tool.ts
│   ├── filesystem.tool.ts
│   ├── temperature.tool.ts
│   └── index.ts
├── app.module.ts
├── main.ts
```

---

## 🧰 Herramientas Disponibles

Todas las herramientas están disponibles mediante el endpoint:  
**`POST /mcp`**

### 🔹 `calculator`
- **Descripción**: Realiza operaciones matemáticas básicas.
- **Parámetros**:
  - `a` *(number)*
  - `b` *(number)*
  - `operation`: `"add"`, `"subtract"`, `"multiply"`, `"divide"`
- **Ejemplo**:
```json
{
  "toolName": "calculator",
  "params": {
    "a": 10,
    "b": 2,
    "operation": "multiply"
  }
}
```

---

### 🔹 `temperature`
- **Descripción**: Devuelve una temperatura ficticia basada en un prompt.
- **Parámetros**:
  - `prompt` *(string)*
- **Ejemplo**:
```json
{
  "toolName": "temperature",
  "params": {
    "prompt": "Temperatura en Madrid"
  }
}
```

---

### 🔹 `filesystem`
- **Descripción**: Lee, escribe o elimina archivos del sistema.
- **Parámetros**:
  - `path` *(string)*
  - `action`: `"read"`, `"write"`, `"delete"`
  - `content` *(string, opcional)*: Requerido si `action = write`
- **Ejemplo**:
```json
{
  "toolName": "filesystem",
  "params": {
    "path": "src/main.ts",
    "action": "read"
  }
}
```

---

### 🔹 `code-analyzer-local`
- **Descripción**: Analiza archivos de un proyecto y genera un `.md` descriptivo.
- **Parámetros**:
  - `directory` *(string)*: Carpeta a analizar.
  - `outputName` *(string, opcional)*: Nombre del archivo de salida.
- **Ejemplo**:
```json
{
  "toolName": "code-analyzer-local",
  "params": {
    "directory": "mcp-server/src"
  }
}
```
## 🛡️ Validación con Zod

### ¿Qué es Zod?

[Zod](https://github.com/colinhacks/zod) es una biblioteca de validación y parsing de esquemas para TypeScript. Permite definir estructuras de datos de forma declarativa y luego validar que los datos cumplan con esos esquemas. Es especialmente útil al trabajar con **Modelos de Lenguaje (LLMs)**, donde la salida puede variar o no seguir una estructura estricta.

### ¿Para qué se usa en este proyecto?

Zod se utiliza para validar las respuestas generadas por el modelo LLM y asegurarse de que cumplen con el formato esperado. Esto permite:

- Detectar errores de estructura en tiempo de ejecución.
- Garantizar que la información recibida sea procesable por otras partes del sistema.
- Mejorar la robustez de los agentes o pipelines basados en LLM.

---

## 📦 Instalación

```bash
npm install zod

---
Usamos Zod para definir y validar esta estructura:
import { z } from "zod";

// Definición del esquema esperado
const TaskSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});

// Ejemplo de salida de un LLM (como texto JSON)
const llmOutput = `{
  "title": "Escribir documentación",
  "completed": false
}`;

try {
  const parsed = TaskSchema.parse(JSON.parse(llmOutput));
  console.log("✅ Datos válidos:", parsed);
} catch (err) {
  console.error("❌ Validación fallida:", err);
}


## ⚙️ Configuración `.env`

```env
PORT=3000
ANALYSIS_DIR=./src/docs
```

---

## 🧪 Probar el servidor

```bash
npm install
$ npm run start:dev 
```

### Consultar herramientas:
```bash
curl -X POST http://localhost:3000/mcp -H "Content-Type: application/json" -d '{"toolName":"calculator","params":{"a":5,"b":3,"operation":"add"}}'
```

---
## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## 🧑‍💻 Autor

Desarrollado por klever - 2025

---

## 📝 Licencia

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
Este proyecto está bajo la licencia MIT.

