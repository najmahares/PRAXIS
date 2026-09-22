import fs from "node:fs";
import path from "node:path";

function stripJs(src) {
  let out = "", i = 0, n = src.length;
  while (i < n) {
    const c = src[i], c2 = src[i + 1];

    // JSX {/* ... */}
    if (c === "{" && c2 === "/" && src[i + 2] === "*") {
      i += 3;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") out += "\n";
        i++;
      }
      i += 2;
      while (i < n && /\s/.test(src[i])) { if (src[i] === "\n") out += "\n"; i++; }
      if (src[i] === "}") i++;
      continue;
    }

    // //
    if (c === "/" && c2 === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }

    // /* */
    if (c === "/" && c2 === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") out += "\n";
        i++;
      }
      i += 2;
      continue;
    }

    // strings
    if (c === '"' || c === "'" || c === "`") {
      const q = c; out += c; i++;
      while (i < n) {
        if (src[i] === "\\") { out += src[i] + (src[i + 1] ?? ""); i += 2; continue; }
        out += src[i];
        if (src[i] === q) { i++; break; }
        i++;
      }
      continue;
    }

    // regex literal
    if (c === "/" && c2 !== "/" && c2 !== "*") {
      let j = out.length - 1;
      while (j >= 0 && /\s/.test(out[j])) j--;
      const prev = j >= 0 ? out[j] : "";
      if ("(,=:[!&|?{};".includes(prev) || prev === "") {
        let k = i + 1, inClass = false;
        while (k < n) {
          const r = src[k];
          if (r === "\\") { k += 2; continue; }
          if (r === "[") inClass = true;
          else if (r === "]") inClass = false;
          else if (r === "/" && !inClass) { k++; break; }
          else if (r === "\n") break;
          k++;
        }
        if (k <= n && src[k - 1] === "/") {
          while (k < n && /[a-z]/i.test(src[k])) k++;
          out += src.slice(i, k);
          i = k;
          continue;
        }
      }
    }

    out += c; i++;
  }
  return out;
}

function stripCss(src) {
  let out = "", i = 0, n = src.length;
  while (i < n) {
    const c = src[i], c2 = src[i + 1];
    if (c === "/" && c2 === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        if (src[i] === "\n") out += "\n";
        i++;
      }
      i += 2;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c; out += c; i++;
      while (i < n) {
        if (src[i] === "\\") { out += src[i] + (src[i + 1] ?? ""); i += 2; continue; }
        out += src[i];
        if (src[i] === q) { i++; break; }
        i++;
      }
      continue;
    }
    out += c; i++;
  }
  return out;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "test-results", "playwright-report"].includes(e.name)) continue;
    if (e.name.endsWith(".bak")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|js|jsx|mjs|cjs|css)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

let touched = 0, saved = 0;
const files = [];
for (const f of walk("frontend/src")) {
  const src = fs.readFileSync(f, "utf8");
  const out = f.endsWith(".css") ? stripCss(src) : stripJs(src);
  if (out !== src) {
    fs.writeFileSync(f, out);
    touched++;
    saved += src.length - out.length;
    files.push("  " + f);
  }
}

console.log("Stripped comments from " + touched + " file(s), saved " + saved.toLocaleString() + " bytes");
files.slice(0, 20).forEach((l) => console.log(l));
if (files.length > 20) console.log("  ... and " + (files.length - 20) + " more");
console.log("NOTE: no cleanup pass. Empty {} blocks and .catch(() => {}) untouched.");
