const fs = require("fs");
const https = require("https");
const path = require("path");

const root = process.cwd();

const courses = [
  { name: "BIOLOGY", cpalms: [{ id: 23776, title: "Biology 1", courseNumber: "2000310" }], contentPrefix: "SC." },
  { name: "CHEMISTRY", cpalms: [{ id: 23853, title: "Chemistry 1", courseNumber: "2003340" }], contentPrefix: "SC." },
  { name: "PHYSICS", cpalms: [{ id: 23835, title: "Physics 1", courseNumber: "2003380" }], contentPrefix: "SC." },
  { name: "EARTH SPACE SCIENCE", cpalms: [{ id: 23797, title: "Earth/Space Science", courseNumber: "2001310" }], contentPrefix: "SC." },
  { name: "ANATOMY AND PHYSIOLOGY", cpalms: [{ id: 23782, title: "Anatomy and Physiology", courseNumber: "2000350" }], contentPrefix: "SC." },
  { name: "ENVIRONMENTAL SCIENCE", cpalms: [{ id: 23803, title: "Environmental Science", courseNumber: "2001340" }], contentPrefix: "SC." },
  { name: "MARINE SCIENCE", cpalms: [{ id: 23808, title: "Marine Science 1", courseNumber: "2002500" }], contentPrefix: "SC." },
  { name: "WORLD HISTORY", cpalms: [{ id: 22644, title: "World History", courseNumber: "2109310" }], contentPrefix: "SS." },
  { name: "U.S. HISTORY", cpalms: [{ id: 22636, title: "United States History", courseNumber: "2100310" }], contentPrefix: "SS." },
  { name: "U.S. GOVERNMENT", cpalms: [{ id: 24582, title: "United States Government", courseNumber: "2106310" }], contentPrefix: "SS." },
  {
    name: "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
    cpalms: [
      { id: 21679, title: "Economics with Financial Literacy", courseNumber: "2102335" },
      { id: 21902, title: "Personal Financial Literacy", courseNumber: "2102372" },
    ],
    contentPrefix: "SS.",
  },
  { name: "PSYCHOLOGY", cpalms: [{ id: 24561, title: "Psychology 1", courseNumber: "2107300" }], contentPrefix: "SS." },
  { name: "SOCIOLOGY", cpalms: [{ id: 24567, title: "Sociology", courseNumber: "2108300" }], contentPrefix: "SS." },
];

const frameworkSources = [
  {
    name: "Florida B.E.S.T. / CPALMS embedded expectations",
    url: "https://www.cpalms.org/public/search/Standard",
    requiredTerms: ["Florida", "B.E.S.T.", "ELA"],
  },
  {
    name: "Common Core Literacy",
    url: "https://www.thecorestandards.org/ELA-Literacy/",
    requiredTerms: ["Common Core"],
  },
  {
    name: "SAT Reading and Writing",
    url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing",
    requiredTerms: ["SAT", "evidence", "information", "graphics"],
  },
  {
    name: "ACT College and Career Readiness Standards",
    url: "https://www.act.org/content/act/en/college-and-career-readiness/standards.html",
    requiredTerms: ["ACT", "Reading", "Science", "English"],
  },
];

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "MLA-Codex-Standards-Audit/1.0" } }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, url, data }));
    });
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error(`Timeout fetching ${url}`));
    });
  });
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
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

function extractCodes(text) {
  return unique(text.match(/(?:SC|SS|ELA|MA|ELD|HE)\.\d{3}\.[A-Z0-9]{1,4}\.\d+\.\d+|(?:ELA|MA|ELD)\.K12\.[A-Z0-9.]+/g) || []);
}

function filterContentCodes(codes, prefix) {
  return codes.filter((code) => code.startsWith(prefix));
}

function readProductionText(course) {
  const dir = path.join(root, course, "Course Production");
  if (!fs.existsSync(dir)) return "";
  return fs
    .readdirSync(dir)
    .filter((name) => name.toLowerCase().endsWith(".md"))
    .map((name) => fs.readFileSync(path.join(dir, name), "utf8"))
    .join("\n");
}

async function fetchCourseRecord(record) {
  const url = `https://www.cpalms.org/PreviewCourse/LoadCoursePreviewPage?id=${record.id}&backend=false`;
  const response = await get(url);
  const visibleText = stripHtml(response.data);
  const loadMoreMatch = response.data.match(/LoadBenchmarksCourses\((\d+),\s*(\d+),\s*(\d+),/);
  let allHtml = response.data;
  let parentCourseId = null;
  let totalBenchmarks = null;
  if (loadMoreMatch) {
    parentCourseId = Number(loadMoreMatch[1]);
    totalBenchmarks = Number(loadMoreMatch[3]);
    const pageSize = 50;
    const totalPages = Math.ceil(totalBenchmarks / pageSize);
    for (let page = 2; page <= totalPages; page += 1) {
      const moreUrl = `https://www.cpalms.org/PreviewCourse/GetBenchmarksCourses?ParentCourseId=${parentCourseId}&VersionId=${record.id}&Page=${page}&PageSize=${pageSize}`;
      const more = await get(moreUrl);
      allHtml += "\n" + more.data;
    }
  }
  return {
    ...record,
    url: `https://www.cpalms.org/PreviewCourse/Preview/${record.id}`,
    statusCode: response.statusCode,
    titleFound: visibleText.includes(record.title) || visibleText.includes(record.courseNumber),
    parentCourseId,
    totalBenchmarks,
    codes: extractCodes(stripHtml(allHtml)),
  };
}

async function audit() {
  const sourceChecks = [];
  for (const source of frameworkSources) {
    try {
      const response = await get(source.url);
      const text = stripHtml(response.data);
      sourceChecks.push({
        ...source,
        statusCode: response.statusCode,
        accessible: response.statusCode >= 200 && response.statusCode < 400,
        termsPresent: source.requiredTerms.filter((term) => new RegExp(term, "i").test(text)),
      });
    } catch (error) {
      sourceChecks.push({ ...source, statusCode: "ERROR", accessible: false, termsPresent: [], error: error.message });
    }
  }

  const results = [];
  for (const course of courses) {
    const localText = readProductionText(course.name);
    const localCodes = extractCodes(localText);
    const localContentCodes = filterContentCodes(localCodes, course.contentPrefix);
    const cpalmsRecords = [];
    for (const record of course.cpalms) {
      cpalmsRecords.push(await fetchCourseRecord(record));
    }
    const officialCodes = unique(cpalmsRecords.flatMap((record) => filterContentCodes(record.codes, course.contentPrefix)));
    const missingFromLocal = officialCodes.filter((code) => !localContentCodes.includes(code));
    const extraLocal = localContentCodes.filter((code) => !officialCodes.includes(code));
    const sourceTermFailures = [];
    for (const term of ["CPALMS", "Florida", "Common Core", "SAT", "ACT"]) {
      if (!new RegExp(term.replace(".", "\\."), "i").test(localText)) sourceTermFailures.push(term);
    }

    results.push({
      course: course.name,
      records: cpalmsRecords,
      officialContentCodes: officialCodes,
      localContentCodes,
      missingFromLocal,
      extraLocal,
      sourceTermFailures,
      decision: missingFromLocal.length === 0 && extraLocal.length === 0 && sourceTermFailures.length === 0 ? "PASS" : "FAIL",
    });
  }

  const lines = [];
  lines.push("# External Standards Verification Audit");
  lines.push("");
  lines.push("Date: 2026-07-11");
  lines.push("");
  lines.push("## Purpose");
  lines.push("");
  lines.push("This audit pulls official CPALMS course records and verifies that the course production crosswalk package contains the official course content standards. It also verifies that Florida/CPALMS, B.E.S.T., Common Core, SAT, and ACT support layers are identified as source frameworks.");
  lines.push("");
  lines.push("## Official Support Framework Sources Checked");
  lines.push("");
  lines.push("| Source | URL | Accessible | Terms Found |");
  lines.push("|---|---|---:|---|");
  for (const source of sourceChecks) {
    lines.push(`| ${source.name} | ${source.url} | ${source.accessible ? "YES" : "NO"} | ${source.termsPresent.join(", ") || "None"} |`);
  }
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Course | CPALMS Record(s) | Official Content Codes | Local Content Codes | Missing Official Codes | Extra Local Codes | Source Term Failures | Decision |");
  lines.push("|---|---|---:|---:|---:|---:|---:|---|");
  for (const result of results) {
    const records = result.records.map((record) => `${record.title} #${record.courseNumber} (${record.id})`).join("<br>");
    lines.push(`| ${result.course} | ${records} | ${result.officialContentCodes.length} | ${result.localContentCodes.length} | ${result.missingFromLocal.length} | ${result.extraLocal.length} | ${result.sourceTermFailures.length} | ${result.decision} |`);
  }
  lines.push("");
  const totalFailures = results.filter((result) => result.decision !== "PASS").length;
  lines.push(`Overall Decision: ${totalFailures ? "FAIL - external source repairs required" : "PASS - local crosswalks match pulled official CPALMS content code sets"}`);
  lines.push("");
  for (const result of results) {
    lines.push(`## ${result.course}`);
    lines.push("");
    lines.push("Official CPALMS record(s):");
    for (const record of result.records) {
      lines.push(`- ${record.title} #${record.courseNumber}: ${record.url} | HTTP ${record.statusCode} | title/course found: ${record.titleFound ? "YES" : "NO"} | extracted codes: ${filterContentCodes(record.codes, result.course.startsWith("BIO") || result.course.includes("SCIENCE") || ["CHEMISTRY", "PHYSICS", "ANATOMY AND PHYSIOLOGY"].includes(result.course) ? "SC." : "SS.").length}`);
    }
    lines.push("");
    if (result.decision === "PASS") {
      lines.push("PASS: All pulled official CPALMS content codes are present in the course production crosswalk package, and required support framework terms are present.");
    } else {
      if (result.missingFromLocal.length) {
        lines.push("Missing official CPALMS content codes from local production package:");
        lines.push(result.missingFromLocal.map((code) => `- ${code}`).join("\n"));
      }
      if (result.sourceTermFailures.length) {
        lines.push("");
        lines.push(`Missing source framework terms: ${result.sourceTermFailures.join(", ")}`);
      }
    }
    if (result.extraLocal.length) {
      lines.push("");
      lines.push("Local content codes not found in pulled official CPALMS content set:");
      lines.push(result.extraLocal.map((code) => `- ${code}`).join("\n"));
    }
    lines.push("");
  }

  const out = path.join(root, "Course Audit", "EXTERNAL_STANDARDS_VERIFICATION_AUDIT_2026-07-11.md");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, lines.join("\n"), "utf8");

  console.log(
    JSON.stringify(
      {
        report: path.relative(root, out).replaceAll("\\", "/"),
        totalFailures,
        courses: results.map((result) => ({
          course: result.course,
          decision: result.decision,
          official: result.officialContentCodes.length,
          local: result.localContentCodes.length,
          missing: result.missingFromLocal.length,
          extra: result.extraLocal.length,
        })),
      },
      null,
      2,
    ),
  );
}

audit().catch((error) => {
  console.error(error);
  process.exit(1);
});
