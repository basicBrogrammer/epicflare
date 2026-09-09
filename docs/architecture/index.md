# Architecture overview

This folder documents the important runtime architecture for `epicflare`.

## Core docs

- [Request Lifecycle](./request-lifecycle.md): how requests are routed in the
  Worker.
- [Authentication](./authentication.md): app session auth and OAuth-protected
  MCP auth.
- [Data Storage](./data-storage.md): what is stored in D1, KV, and Durable
  Objects.
- [Modules](../modules.md): compile-time module/plugin enablement and contract.

## Source of truth in code

- Worker entrypoint: `worker/index.ts`
- Server request handler: `server/handler.ts`
- Router and HTTP route mapping: `server/router.ts` and `server/routes.ts`
- Module enable-list and registry: `modules.ts`, `modules/`
- OAuth handlers: `worker/oauth-handlers.ts`
- MCP auth checks: `worker/mcp-auth.ts`
