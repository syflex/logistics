import { build } from "esbuild";
import { glob } from "glob";

const files = await glob("lib/api/ts-resolvers/**/*.ts");

await build({
  sourcemap: "inline",
  sourcesContent: false,
  format: "esm",
  target: "esnext",
  platform: "node",
  external: ["@aws-appsync/utils"],
  outdir: "lib/api/js-resolvers",
  entryPoints: files,
  bundle: true,
});