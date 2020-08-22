import { serve } from "./deps.tsx";

const s = serve(
   {
      port: 8000,
   },
);

console.log(`🦕 Deno server running at http://localhost:8000/ 🦕`);

for await (const req of s) {
  req.respond({ body: 'Hello from your first Deno server' });
}

