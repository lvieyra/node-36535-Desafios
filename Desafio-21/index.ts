import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const port = 8080;

localStorage.clear();

const requestHandler = async (req: Request): Promise<Response> => {
    let colors: string[] = [];
    if (localStorage.getItem("colors")) {
        colors = JSON.parse(localStorage.getItem("colors") || "");
    }
    if (req.method === "POST") {
        const { color } = await req.json();
        colors.push(color);
    }
    localStorage.setItem("colors", JSON.stringify(colors));
    return new Response(JSON.stringify(colors));
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

await serve(requestHandler, { port });

