











const DANGEROUS_TAGS = [
  "script",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "animate",
  "set",
  "handler",
  "listener",
];

const DANGEROUS_ATTR = /\son\w+\s*=/gi; 
const HREF_JS = /(href|xlink:href)\s*=\s*["']?\s*javascript:/gi;
const DATA_HTML = /(href|xlink:href)\s*=\s*["']?\s*data:text\/html/gi;

export function sanitizeSvg(raw: string): string {
  if (!raw) return "";

  let out = raw;

  
  for (const tag of DANGEROUS_TAGS) {
    const re = new RegExp("<" + tag + "\\b[^>]*>[\\s\\S]*?<\\/" + tag + ">", "gi");
    out = out.replace(re, "");
    
    const re2 = new RegExp("<" + tag + "\\b[^>]*\\/?>", "gi");
    out = out.replace(re2, "");
  }

  
  out = out.replace(DANGEROUS_ATTR, " data-removed=");

  
  out = out.replace(HREF_JS, 'href="#"');
  out = out.replace(DATA_HTML, 'href="#"');

  
  out = out.replace(/\s(src|action|formaction)\s*=\s*["'][^"']*["']/gi, "");

  return out;
}
