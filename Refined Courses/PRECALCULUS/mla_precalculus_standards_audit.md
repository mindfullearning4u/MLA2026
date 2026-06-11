# MLA Precalculus Standards Crosswalk Audit

## Executive Summary

This audit reviews `mla_precalculus_standards_crosswalk.xlsx` as a standards architecture document only. It does not create units, lessons, or instructional sequencing.

The workbook is fundamentally sound for benchmark coverage. The main crosswalk includes 65 unique Florida MA.912 mathematics benchmarks from the current CPALMS Precalculus Honors course listing. CPALMS lists 79 total standards entries for the course; the remaining 14 entries are embedded Mathematical Thinking and Reasoning, ELA, and ELD expectations and are represented on the Embedded Standards tab.

The crosswalk should pass with revisions. The issues are primarily alignment-quality and documentation issues rather than missing benchmark coverage. The strongest required revisions are to refine repeated MLA standard statements, differentiate primary versus support alignments, improve Common Core specificity, document the zero-count limits domain more clearly, and clean source-extraction artifacts such as `Resource 1` from benchmark descriptions.

**Final Determination:** PASS WITH REVISIONS

---

## Strengths

- The workbook contains all seven required tabs: README, MLA Standards Crosswalk, Embedded Standards, Coverage Audit, MLA Inventory, Sources, and Corrections Log.
- The main crosswalk includes 65 unique Florida MA.912 Precalculus mathematics benchmarks.
- No duplicate Florida benchmark ownership was identified in the main crosswalk.
- Every MLA standard code in the main crosswalk maps to a Florida benchmark.
- Every Florida benchmark in the main crosswalk maps to an MLA standard.
- Embedded MTR, ELA, and ELD expectations are separated from primary math benchmark ownership.
- MLA standards are written in student-facing language rather than copied verbatim.
- SAT and ACT readiness categories are documented for each benchmark.
- The workbook is usable as an initial standards architecture for future unit mapping.

---

## Findings

### Finding 1: Benchmark Coverage Is Complete for Main MA.912 Course Benchmarks

The workbook includes 65 unique MA.912 benchmark codes in the main crosswalk. This matches the extracted mathematics benchmark list from the CPALMS Precalculus Honors course standards listing.

CPALMS reports 79 standards entries for the course. The difference consists of embedded expectations:

- 7 Mathematical Thinking and Reasoning standards
- 6 ELA Expectations
- 1 ELD expectation

These are included in the Embedded Standards tab, not the main MLA Standards Crosswalk.

### Finding 2: Several MLA Standard Statements Are Too Repetitive

The standards are student-friendly, but many are repeated across multiple distinct Florida benchmarks. This makes the crosswalk less useful for mastery tracking because different benchmarks appear to have identical MLA learning targets.

Examples:

- `MLA.PC.PA.1` through `MLA.PC.PA.9` all use the same broad conics statement.
- Multiple `MLA.PC.TR` standards use the same trigonometric relationship, unit circle, graphing, or equation statements.
- Several `MLA.PC.VC` standards use the same complex number or vector statements.
- Several function analysis standards use broad repeated language.

This does not create a benchmark coverage gap, but it weakens auditability and mastery reporting.

### Finding 3: Common Core Alignments Are Often Too Broad

Common Core alignments are present, but many are listed at broad cluster/domain level rather than specific standard level.

Examples:

- `HSF-IF; HSF-BF; HSA-APR; HSA-REI where applicable`
- `HSF-TF; HSG-SRT.C.8 where applicable`
- `HSN-CN; HSN-VM`
- `HSG-GPE; HSF-IF; HSG-MG where applicable`

These are directionally reasonable, but a compliance-ready workbook should identify specific Common Core standards where possible and label support alignments separately from primary alignments.

### Finding 4: SAT and ACT Alignments Are Present but Broad

SAT and ACT categories are documented. However, most alignments are broad readiness categories rather than skill-specific links.

Examples:

- SAT `Advanced Math` appears across a wide range of standards.
- SAT `Geometry and Trigonometry` is assigned to trigonometry and conics/polar/parametric work, which is reasonable, but skill connections should distinguish trigonometric functions, identities, equations, conics, vectors, and coordinate representations.
- ACT `Functions; Intermediate Algebra` is used broadly and should be refined for standards involving trigonometry, coordinate geometry, vectors, and modeling.

This is an alignment documentation weakness, not a standards coverage failure.

### Finding 5: Foundations of Limits Domain Has No Primary Benchmark Ownership

The MLA Inventory includes `MLA.PC.LIM` as a reserved domain with zero standards. This is accurately documented in the workbook because no distinct CPALMS Precalculus Honors benchmark was identified as a primary limits benchmark in the course listing.

However, calculus readiness would benefit from clearer documentation explaining where informal limit foundations appear through:

- End behavior
- Asymptotic behavior
- Continuity-like graph reasoning
- Difference quotients or rates of change, if introduced as enrichment
- Function behavior approaching values

The workbook should not invent a Florida benchmark, but the reserved limits domain needs stronger documentation as a readiness gap or optional embedded readiness strand.

### Finding 6: Domain Organization Is Mostly Sound but Could Be More Granular

The suggested domains are usable, but several are broad:

- `MLA.PC.FA` includes polynomial, radical, rational, operations, composition, inverse functions, and general function analysis.
- `MLA.PC.PA` combines conics, polar relationships, and parametric relationships.
- `MLA.PC.VC` combines complex numbers, matrices, and vectors.
- `MLA.PC.TR` contains 21 standards and may need subdomain tags for unit circle, identities, graphs, equations, and applications.

This is manageable for a standards crosswalk, but future unit mapping and mastery tracking would benefit from subdomain labels or notes.

### Finding 7: Benchmark Descriptions Contain Source Artifacts

At least two benchmark descriptions include `Resource 1` before the actual benchmark text. This appears to be an extraction artifact from CPALMS page markup.

Examples:

- `MA.912.AR.7.4`
- `MA.912.AR.10.2`

These should be cleaned for a professional audit-ready workbook.

---

## Required Corrections

| Required Correction | Location | Reason |
|---|---|---|
| Remove source extraction artifacts such as `Resource 1` from benchmark descriptions. | MLA Standards Crosswalk | Improves professionalism and audit readability. |
| Add a clear note that CPALMS lists 79 total standards entries: 65 MA.912 math benchmarks and 14 embedded expectations. | README and Coverage Audit | Prevents reviewers from mistaking embedded standards for missing math benchmarks. |
| Refine repeated MLA standard statements so each MLA standard more clearly reflects its specific benchmark. | MLA Standards Crosswalk | Improves mastery tracking and prevents standards from appearing duplicative. |
| Add Primary Alignment / Support Alignment notation for Common Core references. | MLA Standards Crosswalk | Improves traceability and reduces overclaiming. |
| Improve Common Core specificity where possible. | MLA Standards Crosswalk | Broad domain-level references are less defensible in accreditation review. |
| Clarify `MLA.PC.LIM` as a reserved calculus-readiness domain, not an orphaned standard domain. | README, MLA Inventory, Coverage Audit | Prevents the zero-count domain from appearing as a missing standards category. |

---

## Recommended Improvements

- Add separate alignment notes for SAT skill connections, not only SAT domain labels.
- Add separate alignment notes for ACT skill connections, not only ACT category labels.
- Consider adding a `Domain / Subdomain` column to support future unit mapping.
- Consider splitting `MLA.PC.PA` into conics versus polar/parametric subdomains in notes, even if the main MLA code family remains unchanged.
- Consider adding a `Precalculus Readiness Role` column with values such as primary content, support content, calculus readiness, STEM modeling, and technology-supported exploration.
- Add flags for standards that may require multiple instructional targets, especially conics, vectors, trigonometric identities, trigonometric equations, and parametric/polar relationships.
- Add a `Technology / Graphing Tool Expected` note for standards involving graphing, polar/parametric representations, regression-like modeling, and vector visualization.

---

## Florida Coverage Review

| Review Item | Audit Result |
|---|---|
| Florida MA.912 Precalculus math benchmarks represented | 65 |
| CPALMS total standards entries listed for Precalculus Honors | 79 |
| Embedded MTR/ELA/ELD expectations represented | Yes, on Embedded Standards tab |
| Missing MA.912 benchmark codes | None identified |
| Duplicate Florida benchmark ownership | None identified |
| Orphaned Florida benchmarks | None identified |
| Every benchmark maps to at least one MLA standard | Yes |
| Weak mappings | Some MLA statements are too broad or repeated |
| Overly broad mappings | Common Core, SAT, and ACT alignments need more specificity |
| Overly narrow mappings | None significant |

The Florida coverage passes. Documentation should be strengthened so reviewers understand the 65 versus 79 count.

---

## Common Core Review

Common Core alignments are generally directionally appropriate but not yet sufficiently specific for a high-quality compliance crosswalk.

Strong areas:

- Function analysis is aligned to `HSF-IF` and `HSF-BF`.
- Exponential and logarithmic relationships are aligned to `HSF-LE` and `HSF-IF`.
- Trigonometric work is aligned to `HSF-TF`.
- Complex numbers and vectors are aligned to `HSN-CN` and `HSN-VM`.
- Conic/coordinate relationships are aligned to `HSG-GPE`.
- Sequences are aligned to `HSF-BF.A.2`.

Weaknesses:

- Alignments are often listed by domain or cluster rather than standard.
- Primary and support alignments are not distinguished.
- Trigonometry alignments should specify which standards connect to unit circle, graphing, identities, inverse trig, and solving equations.
- Vector and matrix-related benchmarks need clearer Common Core documentation because Common Core coverage varies by state adoption and course pathway.

Recommended correction:

Add a `Common Core Alignment Type` field or notation such as `Primary: HSF-TF.A.1; Support: HSF-IF.C.7`.

---

## SAT Readiness Review

The workbook includes SAT alignment for every standard. The strongest SAT readiness areas are:

- Advanced Math
- Geometry and Trigonometry
- Problem-Solving and Data Analysis where modeling is involved

Strengths:

- Polynomial, rational, exponential, logarithmic, and function operation standards support SAT Advanced Math.
- Trigonometric standards support SAT Geometry and Trigonometry.
- Modeling standards support SAT Problem-Solving and Data Analysis.

Areas to strengthen:

- Add explicit SAT skill connections for function transformations, equivalent forms, nonlinear equations, and model interpretation.
- Add explicit SAT trigonometric reasoning notes for unit circle, identities, graph features, and equations.
- Add explicit SAT modeling notes for piecewise functions, systems, and real-world constraints.
- Clarify that vectors, matrices, polar, and parametric relationships are beyond typical SAT emphasis but support advanced STEM readiness.

SAT readiness is represented, but the alignment documentation should be more skill-specific.

---

## ACT Readiness Review

The workbook includes ACT alignment for every standard. The strongest ACT readiness areas are:

- Functions
- Intermediate Algebra
- Trigonometry
- Coordinate Geometry
- Plane Geometry where conics and coordinate relationships apply

Strengths:

- Trigonometry is well represented through the `MLA.PC.TR` domain.
- Functions are represented across function analysis, exponential/logarithmic, sequence, and modeling standards.
- Coordinate geometry is represented through conics, vectors, and coordinate-plane relationships.

Areas to strengthen:

- Add ACT skill-level notes for trigonometric equations, identities, inverse trigonometric relationships, and graph interpretation.
- Distinguish coordinate geometry from plane geometry in conic and vector standards.
- Add modeling notes where ACT items may require interpreting a formula, table, or graph in context.
- Use `Statistics and Probability` only where data interpretation or modeling genuinely applies; avoid overusing it for all modeling standards.

ACT readiness is represented, but documentation needs more precision.

---

## College Algebra Readiness Review

The standards architecture supports College Algebra readiness well.

Strong readiness areas:

- Polynomial functions
- Radical and rational functions
- Exponential and logarithmic relationships
- Function operations and composition
- Inverse functions
- Systems and piecewise functions
- Sequences and series

Areas to strengthen:

- Refine function analysis standards so students and instructors can distinguish operations, composition, transformations, inverses, and model comparison.
- Add clearer notes for domain, range, restrictions, asymptotes, and end behavior.
- Strengthen technology-use expectations for graphing and function analysis.

College Algebra readiness passes with documentation revisions.

---

## Calculus Readiness Review

The architecture supports many prerequisites for Calculus, but calculus readiness documentation needs improvement.

Strong readiness areas:

- Advanced function analysis
- Polynomial, rational, exponential, logarithmic, and trigonometric functions
- Trigonometric identities and equations
- Parametric and polar relationships
- Sequences and series
- Vectors and complex numbers

Weaknesses:

- `MLA.PC.LIM` has no mapped benchmark and is only documented as reserved.
- Informal limit foundations are not explicitly connected to end behavior, asymptotes, continuity-like reasoning, or function behavior approaching values.
- Rates of change and difference quotient readiness are not explicitly documented.

Recommendation:

Keep `MLA.PC.LIM` reserved unless Florida benchmark coverage changes, but add a calculus-readiness note explaining where informal limit reasoning is embedded through function behavior, asymptotes, end behavior, and graphical interpretation.

---

## STEM Readiness Review

The standards architecture supports STEM pathways well.

Strong readiness areas:

- Vectors
- Complex numbers
- Trigonometric functions
- Parametric and polar relationships
- Conic sections
- Modeling
- Sequences and series

Areas to strengthen:

- Clarify technology expectations for graphing, polar/parametric visualization, vectors, and modeling.
- Add notes distinguishing physics-oriented vector applications from purely algebraic vector operations.
- Strengthen real-world modeling notes for trigonometry, vectors, conics, and sequences.
- Add explicit mathematical communication expectations for complex multi-representation STEM tasks.

STEM readiness is strong but would benefit from clearer application and technology documentation.

---

## Standards Architecture Review

| Domain | Audit Comment |
|---|---|
| `MLA.PC.FA` Function Analysis | Important and appropriate, but broad. Consider subdomain notes for polynomial, radical/rational, operations, composition, inverse, and comparison. |
| `MLA.PC.TR` Trigonometric Functions | Strong coverage, but large. Consider subdomain notes for right triangle/unit circle, identities, graphs, equations, inverse trig, and applications. |
| `MLA.PC.EX` Exponential and Logarithmic Models | Appropriate and concise. Could include stronger modeling and transformation notes. |
| `MLA.PC.VC` Vectors and Complex Numbers | Appropriate but combines complex numbers, matrices, and vectors. Consider subdomain notes. |
| `MLA.PC.PA` Polar and Parametric Relationships | Too broad because it also owns all conic standards. Consider renaming notes to include conics explicitly or splitting into subdomains. |
| `MLA.PC.SEQ` Sequences and Series | Appropriate. Statements should distinguish arithmetic sequences, geometric sequences, finite series, infinite series, and sigma notation where applicable. |
| `MLA.PC.LIM` Foundations of Limits | Reserved but unmapped. Needs clearer documentation as a calculus-readiness support domain, not an orphaned required standard. |
| `MLA.PC.MOD` Mathematical Modeling | Appropriate but small. Modeling also appears embedded across other domains; this should be noted. |

---

## Final Determination

**PASS WITH REVISIONS**

The Precalculus standards architecture has complete Florida MA.912 benchmark coverage for the CPALMS Precalculus Honors course and does not show missing or duplicated primary benchmark ownership. The workbook is suitable as a draft compliance artifact, but it requires revision before being considered final audit-ready.

Required revisions are primarily alignment and documentation improvements:

- Clean benchmark description artifacts.
- Refine repeated MLA standard statements.
- Improve Common Core specificity.
- Add primary/support alignment notation.
- Strengthen SAT and ACT skill documentation.
- Clarify the reserved `MLA.PC.LIM` domain.
- Improve domain/subdomain notes for maintainability.

Primary source checked: CPALMS Precalculus Honors course #1202340, course id 23371.
