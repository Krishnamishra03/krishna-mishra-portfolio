#!/usr/bin/env node
/**
 * Guided Netlify import for the connected GitHub repo.
 *
 * Finds the GitHub remote of this checkout and prints (and opens) the
 * Netlify one-click import URL, which pre-fills the repo + build settings
 * from netlify.toml so the site is created in a single confirmation click.
 */
import { execSync } from "node:child_process";

const parseGitHub = (url) => {
  const m = url.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/i);
  return m ? { owner: m[1], repo: m[2] } : null;
};

const remotes = (() => {
  try {
    return execSync("git remote -v", { encoding: "utf8" });
  } catch {
    return "";
  }
})();

const gh = remotes
  .split("\n")
  .map((l) => l.split(/\s+/)[1])
  .filter(Boolean)
  .map(parseGitHub)
  .find(Boolean);

if (!gh) {
  console.error(
    [
      "No GitHub remote found in this checkout.",
      "",
      "Connect GitHub first:",
      "  Lovable → + menu → GitHub → Connect project → Create Repository",
      "",
      "Then run this again:  npm run deploy:netlify",
    ].join("\n"),
  );
  process.exit(1);
}

const repoUrl = `https://github.com/${gh.owner}/${gh.repo}`;
const importUrl = `https://app.netlify.com/start/deploy?repository=${encodeURIComponent(repoUrl)}`;

console.log(`\nRepo detected: ${repoUrl}`);
console.log(`\nStep 1 — open this one-click import URL:\n  ${importUrl}`);
console.log(`\nStep 2 — click "Connect to GitHub", pick the repo, confirm.`);
console.log(`Step 3 — leave build settings as detected (netlify.toml), click "Deploy site".\n`);

const opener =
  process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
try {
  execSync(`${opener} "${importUrl}"`, { stdio: "ignore" });
  console.log("Opened in your browser.\n");
} catch {
  console.log("Copy the URL above into your browser.\n");
}
