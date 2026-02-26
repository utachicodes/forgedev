# ForgeDev Neural AI Environment — Design Document

**Date:** 2026-02-26
**Status:** Approved
**Scope:** Full platform pivot to neural AI-native environment

---

## Overview

ForgeDev is evolving from an ML training / DevOps platform into a unified neural AI-native workspace. The new direction combines the feel of Notion (structured knowledge), Cursor (AI-first IDE), n8n (visual workflows), and ChatGPT (conversational AI) into one cohesive product.

The existing modules (AI Training, DevOps, Testing, Web Suite) are absorbed as tabs within the new shell.

---

## Architecture

### Pattern: Tab-Based Module Switcher

A persistent `AppShell` replaces the current Next.js page structure:

```
┌─────────────────────────────────────────────────────┐
│  Top Bar: Logo | Global Search | Notifications | User │
├──────┬──────────────────────────────────────────────┤
│      │                                              │
│ Left │           Active Module Panel                │
│ Dock │        (full-height, full-width)             │
│(icons│                                              │
│ only)│                                              │
│      │                                              │
└──────┴──────────────────────────────────────────────┘
```

**8 Module Tabs (left dock, icon + hover label):**

| # | Tab | Route | Description |
|---|-----|-------|-------------|
| 1 | Mindmap | `/forge/mindmap` | Neural graph workspace |
| 2 | Chat | `/forge/chat` | Multi-mode conversational AI |
| 3 | Agents | `/forge/agents` | Agent creator + orchestration |
| 4 | IDE | `/forge/ide` | AI-powered code editor |
| 5 | Workflows | `/forge/workflows` | Visual automation builder |
| 6 | Research | `/forge/research` | Web research + reports |
| 7 | Training | `/forge/training` | Existing AI training module |
| 8 | Settings | `/forge/settings` | Models, API keys, preferences |

---

## Database Additions (Postgres + pgvector)

### New Tables

```sql
-- Mindmap nodes
MindmapNode {
  id          UUID PK
  workspaceId UUID FK
  type        ENUM(idea, document, agent, code_file, workflow, research)
  label       TEXT
  positionX   FLOAT
  positionY   FLOAT
  embedding   VECTOR(1536)   -- pgvector, for auto-connect
  parentId    UUID FK (self)
  metadata    JSONB
  createdAt   TIMESTAMP
  updatedAt   TIMESTAMP
}

-- Chat sessions
ChatSession {
  id            UUID PK
  userId        UUID FK
  mode          ENUM(normal, files, node, research, agent)
  agentId       UUID FK (nullable)
  messages      JSONB        -- [{role, content, citations?}]
  memoryContext VECTOR(1536) -- long-term memory embedding
  createdAt     TIMESTAMP
  updatedAt     TIMESTAMP
}

-- User-created agents
Agent {
  id             UUID PK
  userId         UUID FK
  name           TEXT
  description    TEXT
  avatarUrl      TEXT
  systemPrompt   TEXT
  modelEndpoint  TEXT        -- any OpenAI-compatible URL
  modelId        TEXT        -- e.g. "gpt-4o"
  apiKeyEncrypted TEXT       -- AES-256 encrypted
  temperature    FLOAT       -- 0.0–2.0
  tools          JSONB       -- ["web_search", "pdf_reader", "code_exec", "api_caller"]
  memoryEnabled  BOOLEAN
  supervisorMode BOOLEAN
  handoffRules   JSONB       -- [{condition, targetAgentId}]
  createdAt      TIMESTAMP
  updatedAt      TIMESTAMP
}

-- Visual workflows
WorkflowGraph {
  id            UUID PK
  userId        UUID FK
  workspaceId   UUID FK
  name          TEXT
  description   TEXT
  nodes         JSONB        -- React Flow node definitions
  edges         JSONB        -- React Flow edge definitions
  triggerConfig JSONB        -- {type: "schedule", cron: "0 9 * * *"} etc.
  isActive      BOOLEAN
  lastRunAt     TIMESTAMP
  createdAt     TIMESTAMP
  updatedAt     TIMESTAMP
}

-- Research reports
ResearchReport {
  id        UUID PK
  userId    UUID FK
  query     TEXT
  mode      ENUM(quick, deep, fact_check)
  sources   JSONB        -- [{url, title, snippet, relevanceScore}]
  content   TEXT         -- Markdown report
  citations JSONB        -- [{index, url, title}]
  verdict   TEXT         -- for fact_check mode
  createdAt TIMESTAMP
}

-- Code files (IDE virtual filesystem)
CodeFile {
  id        UUID PK
  projectId UUID FK
  path      TEXT
  content   TEXT
  language  TEXT
  createdAt TIMESTAMP
  updatedAt TIMESTAMP
}
```

---

## Module 1: Neural Mindmap

### Tech
- `@xyflow/react` (React Flow) for the graph canvas
- Framer Motion for node animations (idle pulse, enter transitions)
- pgvector cosine similarity for auto-connect

### Node Types

| Type | Color | Can Transform To |
|------|-------|-----------------|
| Idea | Purple | Agent, Document |
| Document | Blue | Chat node |
| Agent | Orange | Workflow |
| Code File | Green | IDE panel |
| Workflow | Teal | Workflow Builder |
| Research | Red | Research panel |

### Behaviors

1. **AI Auto-Expand (Brainstorm Mode):** Right-click → "Expand with AI" → LLM generates 3–5 child idea nodes via the model abstraction layer
2. **Embedding auto-connect:** On node create/rename, Python service computes embedding, finds top-3 closest nodes by cosine similarity, renders faint dashed edges
3. **Node → Panel:** Double-click any node → switches to corresponding module tab with that resource loaded
4. **Animated idle:** Nodes pulse gently using Framer Motion `animate` loop when not interacted with
5. **Mini-map:** Bottom-right navigator for large graphs

### Persistence
Nodes + edges auto-saved on drag/create. One mindmap per workspace (multi-mindmap support later).

---

## Module 2: Advanced Chat System

### 5 Chat Modes

| Mode | Behavior |
|------|----------|
| **Normal** | Standard LLM chat via model abstraction layer |
| **With Files** | Upload PDF/TXT/code → chunked, embedded, stored → RAG retrieval |
| **With Node** | Chat scoped to a mindmap node's content + its subgraph |
| **Research** | Auto-triggers Research Engine — web search + citations injected as context |
| **Custom Agent** | Routes through a user-created Agent with its system prompt, tools, and memory |

### Memory
- **Short-term:** Last N messages in session context (default: 20, configurable)
- **Long-term:** Key facts extracted by LLM after each session → stored as embeddings → similarity search on new session start

### Streaming
Server-Sent Events (SSE): `Express → ReadableStream → Next.js` — token-by-token rendering with blinking cursor.

### UI Layout
- Left panel: chat history list (grouped by date)
- Right panel: active conversation
- Floating toolbar: file attach + mode switcher
- Research mode: inline citation chips `[1]`, `[2]`
- Code blocks: syntax highlight + copy + "Open in IDE" action

---

## Module 3: Agent Creator

### Configuration Fields
- Name, avatar, description
- **Model endpoint:** any OpenAI-compatible URL
- **API Key:** AES-256 encrypted at rest, never sent to frontend
- **Model ID:** free-text (`gpt-4o`, `claude-opus-4-6`, `llama3.2`)
- **System prompt:** multi-line editor with variable slots (`{{user_name}}`, `{{date}}`)
- **Temperature:** 0–2 slider
- **Tools (toggles):** Web Search, PDF Reader, Code Execution (sandboxed), API Caller, Calculator
- **Memory toggle:** enables long-term vector memory per agent

### Multi-Agent Orchestration
- **Supervisor mode:** one agent spawns sub-agents with handoff conditions
  - Example: "if topic = code → hand to Code Agent"
- **Agent pipeline:** chain agents A → B → C (output of A = input of B)
- Each agent step shown as a mini-flow diagram in the Agent detail view

### Execution
- Server-side in Express: `POST /forge/agents/:id/run`
- Tool calls dispatched to Python AI engine:
  - Web search → `/research/search`
  - Code exec → sandboxed `/exec/run`
- Streaming responses forwarded via SSE

---

## Module 4: Cursor-like AI IDE

### Stack
- `@monaco-editor/react` — Monaco (VS Code engine)
- Virtual filesystem in `CodeFile` table (Postgres)
- `xterm.js` — integrated terminal
- `node-pty` — server-side PTY over WebSocket

### AI Features
- **Inline suggestions:** debounced cursor position → surrounding context → model → ghost text (accept with Tab)
- **Multi-file context picker:** pin up to 5 files, prepended to all prompts
- **Ctrl+K command palette:**
  - Explain selection
  - Refactor selection
  - Generate tests for function
  - Fix errors (uses Monaco diagnostics)
  - Add docs
- **Right-side chat panel:** inline chat scoped to current file

### Local Models (Ollama)
User sets Ollama endpoint (`http://localhost:11434/v1`) in Settings — IDE uses same model abstraction layer, no special-casing.

### Layout
```
┌─────────────────────────────────────────────────────┐
│ File Explorer │   Monaco Editor (split up to 3)  │Chat│
│               │                                   │    │
│               │                                   │    │
├───────────────┴───────────────────────────────────┴────┤
│                  Terminal (xterm.js)                    │
└─────────────────────────────────────────────────────────┘
```

---

## Module 5: Visual Workflow Builder

### Tech
React Flow (same library as Mindmap, different canvas instance) with workflow-specific node types.

### Node Types

| Category | Nodes |
|----------|-------|
| **Triggers** | Manual, Webhook, Schedule (cron), Event (mindmap change, file save) |
| **AI** | LLM Call, Agent Run, Summarize, Classify, Extract |
| **Data** | HTTP Request, Database Query, File Read/Write, PDF Parse |
| **Logic** | If/Else, Loop, Merge, Split, Transform (JS expression) |
| **Output** | Send Email, Write to DB, API Webhook, Create Mindmap Node |

### Execution Engine
- Stored as `WorkflowGraph` (nodes + edges JSON) in Postgres
- Execution: `POST /forge/workflows/:id/run` in Express
- Sequential execution (parallel branches handled via Promise.all)
- Real-time status via SSE (node turns green/red as it runs)

### Templates
Pre-built: "Research + Summarize", "Chat to Report", "Code Review Pipeline", "Daily Digest"

### Scheduling
Cron expressions stored per workflow, evaluated by `node-cron` in the Express API.

---

## Module 6: Research Engine

### Python FastAPI Routes (`/research/`)

| Endpoint | Description |
|----------|-------------|
| `POST /research/search` | Query → Serper/DuckDuckGo + httpx + BeautifulSoup scraping |
| `POST /research/ingest-pdf` | PyMuPDF extraction → chunked → pgvector embeddings |
| `POST /research/report` | search → retrieve → deduplicate → LLM synthesis → citations |
| `GET /research/fact-check` | Claim → search → supporting/contradicting sources → verdict |

### Frontend
- Query input with mode: Quick Search / Deep Report / Fact Check
- Source cards: favicon, title, snippet, relevance score
- Report: formatted markdown with inline citation chips
- Export to PDF via `html2pdf.js`

---

## Module 7: Model Abstraction Layer

### Interface (`apps/api/lib/model-provider.ts`)

```typescript
interface ModelProvider {
  chat(messages: Message[], options: ChatOptions): AsyncGenerator<string>
  embed(text: string): Promise<number[]>
}
```

### Provider Detection & Routing

| Endpoint Pattern | Provider | SDK Used |
|-----------------|----------|----------|
| `api.openai.com` | OpenAI | `openai` npm package |
| `api.anthropic.com` | Anthropic | `@anthropic-ai/sdk` |
| `localhost:11434` | Ollama | Raw HTTP (OpenAI-compat) |
| Any other URL | Custom | Raw HTTP (OpenAI-compat) |

### Fallback Logic
- Primary provider fails → 2 retries with exponential backoff
- If backup provider configured → auto-failover
- Error surfaced to client with provider name and status code

### Settings UI
Per-user provider configuration stored in the `User` model (new `providerConfig` JSONB field):
```json
{
  "providers": [
    { "id": "primary", "endpoint": "https://api.openai.com/v1", "apiKey": "enc:...", "modelId": "gpt-4o" },
    { "id": "backup", "endpoint": "http://localhost:11434/v1", "apiKey": null, "modelId": "llama3.2" }
  ]
}
```

---

## Implementation Phases

### Phase 1 — Foundation
1. AppShell (top bar + left dock + routing)
2. Model Abstraction Layer
3. Settings module (API key management)
4. DB migrations (all new tables + pgvector extension)

### Phase 2 — Core Modules
5. Advanced Chat System (Normal + streaming)
6. Agent Creator (single agent, no orchestration)
7. Neural Mindmap (basic nodes + edges, no auto-connect)

### Phase 3 — Advanced Features
8. Chat modes (Files, Node, Research, Agent)
9. Agent orchestration (supervisor + pipeline)
10. Mindmap auto-expand + embedding auto-connect

### Phase 4 — Power Tools
11. Cursor-like AI IDE (Monaco + file tree)
12. Visual Workflow Builder
13. Research Engine
14. IDE terminal (xterm.js + node-pty)

### Phase 5 — Polish
15. Workflow templates
16. Long-term memory across sessions
17. PDF export for research reports
18. Split-screen multitasking

---

## Key Libraries to Add

| Library | Purpose | App |
|---------|---------|-----|
| `@xyflow/react` | Mindmap + Workflow canvases | web |
| `@monaco-editor/react` | AI IDE | web |
| `xterm` + `xterm-addon-fit` | Terminal | web |
| `html2pdf.js` | Research PDF export | web |
| `openai` | OpenAI SDK (abstraction layer) | api |
| `@anthropic-ai/sdk` | Anthropic SDK (abstraction layer) | api |
| `node-cron` | Workflow scheduling | api |
| `node-pty` | PTY for terminal | api |
| `PyMuPDF` (fitz) | PDF text extraction | ai-engine |
| `httpx` + `beautifulsoup4` | Web scraping | ai-engine |
| `pgvector` Python client | Vector storage | ai-engine |

---

## Security Considerations

- API keys encrypted with AES-256 before storage, decrypted only server-side at request time
- Code execution sandbox: isolated Docker container or VM2 (Node.js sandboxed eval)
- Web scraping rate limiting: max 10 URLs per research request
- Agent tool calls require explicit user-granted permissions per agent
- SSE endpoints protected by JWT middleware

---

*Design approved by user on 2026-02-26.*
