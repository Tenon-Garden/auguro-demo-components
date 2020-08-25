import { 
   serve,
   ServerRequest,
   serveFile,
   React,
   ReactDOMServer,
   engineFactory,
} from "./deps.tsx";

import { App, Deal, } from "./app.tsx";


const DEBUG_MODE = true;

let root_dir = Deno.cwd();
if (!root_dir.endsWith("demo-auguro/")) {
   root_dir += "/demo-auguro";
}

const server_config = {
   host: "localhost",
   port: 8000,
};

const s = serve(
   server_config,
);

console.log(`
🦕 Deno server running...
🦕 http://${server_config.host}:${server_config.port}/
🦕 Press CTRL+C to quit...
`);

const handlebarsEngine = engineFactory.getHandlebarsEngine();

async function fileExists(path: string) {
   try {
      const stats = await Deno.lstat(path);
      return (stats && stats.isFile);
   } catch(err) {
      console.log(err);
      return (false);
   }
};

async function request_handle(request_obj: ServerRequest, template_map: object) {
   let resp_str = null;
   let code = 500;
   let content_type = "text/plain";
   const req_file = (
      (request_obj.url === "/")
      ? `${root_dir}/static/demo.html`
      : (
         request_obj.url.startsWith("/auguro-illustrations")
         ? `${root_dir}/..${request_obj.url}`
         : `${root_dir}/static${request_obj.url}`
      )
   );
   console.log(req_file);
   const file_ext = req_file.substr(req_file.lastIndexOf(".") + 1);
   console.log(file_ext);
   if (await fileExists(req_file)) {
      switch (file_ext) {
         case ("svg"):
            content_type = "image/svg+xml";
            break;
         case ("css"):
            content_type = "text/css";
            break;
         case ("js"):
            content_type = "text/javascript";
            break;
         case ("html"):
            content_type = "text/html";
            break;
         default:
            content_type = "text/plain";
            break;
      }
      const template_contents = await Deno.readTextFile(req_file);
      resp_str = handlebarsEngine(
         template_contents,
         template_map,
      );
      code = 200;
   } else {
      resp_str = await Deno.readTextFile(`${root_dir}/static/404.html`);
      code = 404;
   }
   return (
      {
         resp: resp_str,
         resp_code: code,
         resp_type: content_type,
      }
   );
}


for await (const req of s) {
   if (DEBUG_MODE) {
      console.log(req.url);
   };
   const template_map = {
      "App": `${App}`,
      "Deal": `${Deal}`,
   };
   const handle_resp = await request_handle(req, template_map);
   console.log(handle_resp);
   const resp_obj = {
      body: handle_resp.resp,
      status: handle_resp.resp_code,
      headers: new Headers(
         { "content-type": handle_resp.resp_type, },
      ),
   };
   req.respond(resp_obj);
};
