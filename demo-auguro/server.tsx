import { 
   serve,
   serveFile,
   React,
   ReactDOMServer,
} from "./deps.tsx";

import { App, Deal, } from "./app.tsx";


const DEBUG_MODE = true;


const server_config = {
   host: "localhost",
   port: 8000,
};

const s = serve(
   server_config,
);

console.log(
   `🦕 Deno server running...
🦕 http://${server_config.host}:${server_config.port}/
🦕 Press CTRL+C to quit...
`
);

const js_filename = "demo.js";
const js = `import React from "https://dev.jspm.io/react@16.13.1";
import ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";
let Deal = ${Deal};
let App = ${App};
ReactDOM.hydrate(React.createElement(App), document.body);`;
const js_content = new TextEncoder().encode(js);

const html_content = `<html>
<head>
  <script type="module" src="${js_filename}"></script>
  <!-- <link rel="stylesheet" type="text/css" href="/static/deal.css"> -->
</head>
<body>
   <main>
     ${(ReactDOMServer as any).renderToString(<App />)}
   </main>
</body>
</html>`;

const body_content = new TextEncoder().encode(html_content);

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch(e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

for await (const req of s) {
   if (DEBUG_MODE) {
      console.log(req.url);
   };
   if (req.url === `/${js_filename}`) {
      const resp_obj = {
         body: js_content,
         headers: new Headers(
            { "content-type": "text/javascript", },
         ),
      };
      req.respond(resp_obj);
   } else if (req.url.endsWith(".svg") || req.url.startsWith("/static/")) {
      if (await fileExists(`.${req.url}`)) {
         const resp_obj = await serveFile(req, `${Deno.cwd()}${req.url}`);
         if (req.url.endsWith(".svg")) {
            resp_obj.headers = new Headers(
               { "content-type": "image/svg+xml", },
            );
         } else if (req.url.endsWith(".css")) {
            resp_obj.headers = new Headers(
               { "content-type": "text/css", },
            );
         } else {
            resp_obj.headers = new Headers(
               { "content-type": "text/plain", },
            );
         }
         req.respond(resp_obj);
      }
      continue;
   } else {
      const resp_obj = {
         body: body_content,
      };
      req.respond(resp_obj);
   }
};
