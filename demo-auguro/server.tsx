import { 
   serve,
   React,
   ReactDOMServer,
} from "./deps.tsx";

import App from "./app.tsx";


const DEBUG_MODE = false;


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
const App = ${App};
ReactDOM.hydrate(React.createElement(App), document.body);`;
const js_content = new TextEncoder().encode(js);

const html_content = `<html>
<head>
  <script type="module" src="${js_filename}"></script>
  <style>* { font-family: Helvetica; }</style>
</head>
<body>
   ${(ReactDOMServer as any).renderToString(<App />)}
</body>
</html>`;

const body_content = new TextEncoder().encode(html_content);

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
   } else {
      const resp_obj = {
         body: body_content,
      };
      req.respond(resp_obj);
   }
};
