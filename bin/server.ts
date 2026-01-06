import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import url from "url";
import livereload from "livereload";

const hostname = "localhost";
const port = 3000;
const lport = 35729;

const MIME_TYPES = new Map<string, string>([ 
  [ "html", "text/html; charset=UTF-8" ],
  [ "js", "application/javascript" ],
  [ "css", "text/css" ],
  [ "png", "image/png" ],
  [ "jpg", "image/jpg" ],
  [ "gif", "image/gif" ],
  [ "ico", "image/x-icon" ],
  [ "svg", "image/svg+xml" ],
  [ "tsv", "text/tab-separated-values" ] 
]);

http
  .createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url!, true);
    const filePath = path.join("dist", parsedUrl.pathname!);

    try {
      const content = await fs.readFile(filePath);
      const ext = path.extname(filePath).substring(1).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME_TYPES.get(ext) || "application/octet-stream",
      });
      res.end(content);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

livereload
  .createServer({
    port: lport,
    exts: ["js", "html", "css"],
  })
  .watch("dist");
