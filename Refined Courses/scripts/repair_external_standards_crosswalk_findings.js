const fs = require("fs");
const https = require("https");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();

const repairs = [
  { name: "ENVIRONMENTAL SCIENCE", records: [{ id: 23803, title: "Environmental Science", courseNumber: "2001340" }], prefix: "SC." },
  { name: "MARINE SCIENCE", records: [{ id: 23808, title: "Marine Science 1", courseNumber: "2002500" }], prefix: "SC." },
  { name: "U.S. GOVERNMENT", records: [{ id: 24582, title: "United States Government", courseNumber: "2106310" }], prefix: "SS." },
  {
    name: "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
    records: [
      { id: 21679, title: "Economics with Financial Literacy", courseNumber: "2102335" },
      { id: 21902, title: "Personal Financial Literacy", courseNumber: "2102372" },
    ],
    prefix: "SS.",
  },
  { name: "PSYCHOLOGY", records: [{ id: 24561, title: "Psychology 1", courseNumber: "2107300" }], prefix: "SS." },
  { name: "SOCIOLOGY", records: [{ id: 24567, title: "Sociology", courseNumber: "2108300" }], prefix: "SS." },
];

const marineExtraCodes = [
  "SC.912.E.6.2",
  "SC.912.E.6.3",
  "SC.912.E.6.4",
  "SC.912.E.6.5",
  "SC.912.E.7.1",
  "SC.912.E.7.2",
  "SC.912.E.7.3",
  "SC.912.E.7.4",
  "SC.912.E.7.8",
  "SC.912.L.15.1",
  "SC.912.L.15.4",
  "SC.912.L.17.5",
  "SC.912.L.17.13",
  "SC.912.L.17.20",
  "SC.912.N.2.2",
];

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "MLA-Codex-Standards-Repair/1.0" } }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error(`Timeout fetching ${url}`)));
  });
}

function stripHtml(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function extractCodes(text) {
  return unique(text.match(/(?:SC|SS)\.\d{3}\.[A-Z0-9]{1,4}\.\d+\.\d+/g) || []);
}

async function fetchOfficialCodes(record, prefix) {
  const response = await get(`https://www.cpalms.org/PreviewCourse/LoadCoursePreviewPage?id=${record.id}&backend=false`);
  let allHtml = response.data;
  const loadMoreMatch = response.data.match(/LoadBenchmarksCourses\((\d+),\s*(\d+),\s*(\d+),/);
  if (loadMoreMatch) {
    const parentCourseId = Number(loadMoreMatch[1]);
    const totalBenchmarks = Number(loadMoreMatch[3]);
    const pageSize = 50;
    const totalPages = Math.ceil(totalBenchmarks / pageSize);
    for (let page = 2; page <= totalPages; page += 1) {
      const more = await get(`https://www.cpalms.org/PreviewCourse/GetBenchmarksCourses?ParentCourseId=${parentCourseId}&VersionId=${record.id}&Page=${page}&PageSize=${pageSize}`);
      allHtml += "\n" + more.data;
    }
  }
  return extractCodes(stripHtml(allHtml)).filter((code) => code.startsWith(prefix));
}

function appendOrReplaceAddendum(courseName, records, officialCodes) {
  const crosswalk = path.join(root, courseName, "Course Production", "PHASE_2A_B_CROSSWALK_DRAFT.md");
  let text = fs.readFileSync(crosswalk, "utf8");
  const start = "<!-- EXTERNAL-CPALMS-VERIFICATION-START -->";
  const end = "<!-- EXTERNAL-CPALMS-VERIFICATION-END -->";
  const addendum = [
    start,
    "",
    "## External CPALMS Verification Addendum",
    "",
    "This addendum was generated from the official CPALMS course record(s) on 2026-07-11. These codes are the external source-of-truth content standards that the local MLA crosswalk must remain bounded to and trace through course production, lessons, and assessments.",
    "",
    "| Official CPALMS Record | Source URL |",
    "|---|---|",
    ...records.map((record) => `| ${record.title} #${record.courseNumber} | https://www.cpalms.org/PreviewCourse/Preview/${record.id} |`),
    "",
    "| Official Content Code | Verification Requirement |",
    "|---|---|",
    ...officialCodes.map((code) => `| ${code} | Must be represented in the local crosswalk package and remain within the approved unit and lesson mapping. |`),
    "",
    end,
    "",
  ].join("\n");

  const pattern = new RegExp(`${start}[\\s\\S]*?${end}\\n?`, "m");
  if (pattern.test(text)) text = text.replace(pattern, addendum);
  else text = `${text.trim()}\n\n${addendum}`;
  fs.writeFileSync(crosswalk, text, "utf8");
}

function removeMarineExtraCodes() {
  const dir = path.join(root, "MARINE SCIENCE", "Course Production");
  const changed = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const file = path.join(dir, name);
    const current = fs.readFileSync(file, "utf8");
    const repoPath = `Refined Courses/MARINE SCIENCE/Course Production/${name}`;
    let text = execFileSync("git", ["-c", "safe.directory=C:/Users/acrue/MLA2026-1", "show", `HEAD:${repoPath}`], {
      cwd: root,
      encoding: "utf8",
    });
    for (const code of marineExtraCodes) {
      text = text.replace(new RegExp(code.replace(/\./g, "\\."), "g"), "");
    }
    text = text
      .replace(/;\s*;/g, ";")
      .replace(/\|\s*;/g, "|")
      .replace(/;\s*\|/g, "|")
      .replace(/,\s*,/g, ",")
      .replace(/\(\s*,/g, "(")
      .replace(/,\s*\)/g, ")");
    if (text !== current) {
      fs.writeFileSync(file, text, "utf8");
      changed.push(path.relative(root, file).replaceAll("\\", "/"));
    }
  }
  return changed;
}

async function main() {
  const changed = [];
  changed.push(...removeMarineExtraCodes());
  for (const repair of repairs) {
    const officialCodes = unique((await Promise.all(repair.records.map((record) => fetchOfficialCodes(record, repair.prefix)))).flat());
    appendOrReplaceAddendum(repair.name, repair.records, officialCodes);
    changed.push(`${repair.name}/Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`);
  }
  console.log(JSON.stringify({ changed: unique(changed) }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
