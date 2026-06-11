# MLA Math for College Readiness Standards Crosswalk Audit

## Executive Summary

This audit reviews `mla_math_for_college_readiness_standards_crosswalk.xlsx` as a standards architecture document only. It does not create units, lessons, or instructional sequencing.

The crosswalk is fundamentally aligned to the approved MLA Hybrid Model. It includes 51 selected Florida B.E.S.T. high school mathematics benchmarks and appropriately balances quantitative reasoning, applied algebra and functions, data literacy, financial literacy, probability and risk, applied geometry, and workforce readiness.

The benchmark selection is appropriate for a selected-benchmark Math for College Readiness course. The workbook does not attempt to claim all high school mathematics coverage, and it does not function as Algebra I remediation, Algebra II remediation, Precalculus preparation, consumer math only, or narrow SAT/ACT test prep.

However, the workbook requires revisions before it should be treated as audit-ready. The most important issue is that the `Course Domain` column in the main crosswalk is populated with benchmark inclusion rationale text rather than the approved MLA domain labels. This weakens filtering, auditability, and long-term maintainability. Several external alignments also need precision cleanup, especially broad Common Core references such as `Modeling` and combined SAT/ACT category labels where a primary category should be distinguished from support categories.

**Final Determination:** PASS WITH REVISIONS

---

## Strengths

- The workbook uses the approved Hybrid Model rather than a narrow College Algebra prep, consumer math, or test-prep model.
- The main crosswalk includes 51 unique MLA standards and 51 unique selected Florida benchmarks.
- No duplicate Florida benchmark ownership was identified in the main crosswalk.
- The selected benchmark set represents the expected Florida domains: `MA.912.FL`, `MA.912.AR`, `MA.912.F`, `MA.912.DP`, `MA.912.GR`, and `MA.912.T`.
- Financial literacy is strongly represented and appropriately connected to technology, spreadsheets, and decision making.
- Data literacy and probability/risk are well represented.
- Applied algebra and functions are present without turning the course into Algebra II remediation.
- Applied geometry and measurement are included in a practical, non-proof-based form.
- Embedded standards appropriately address modeling, communication, reasonableness, technology use, responsible data interpretation, and workforce readiness.
- The README and Coverage Audit correctly identify the course as a selected-benchmark readiness course.

---

## Findings

### Finding 1: Course Domain Column Is Mis-Populated

The `Course Domain` column in the main crosswalk should identify the approved MLA instructional domain, such as:

- `MLA.MCR.QR - Quantitative Reasoning`
- `MLA.MCR.AR - Applied Algebra and Functions`
- `MLA.MCR.DL - Data Literacy and Statistical Reasoning`
- `MLA.MCR.FL - Financial Literacy`
- `MLA.MCR.PR - Probability and Risk`
- `MLA.MCR.GM - Measurement and Applied Geometry`

Instead, the column contains benchmark inclusion rationale text. This is a structural error because it prevents clean sorting, filtering, domain auditing, and accreditation review.

### Finding 2: Benchmark Selection Is Appropriate but Needs Domain Summary Cleanup

The benchmark selection supports the course purpose. The workbook includes:

| Florida Domain | Count |
|---|---:|
| `MA.912.FL` | 15 |
| `MA.912.AR` | 9 |
| `MA.912.F` | 2 |
| `MA.912.DP` | 18 |
| `MA.912.GR` | 6 |
| `MA.912.T` | 1 |

This distribution is appropriate for the Hybrid Model. Financial literacy and data/probability are intentionally prominent. Applied algebra and functions are sufficient for College Algebra readiness without becoming remediation.

The workbook should add a clearer domain distribution summary in the Coverage Audit after the `Course Domain` column is corrected.

### Finding 3: Common Core Alignments Are Directionally Useful but Some Are Too Broad

Most Common Core alignments are reasonable. However, some entries use broad references such as `Modeling` instead of more specific standards or cluster references. This is acceptable as a support note but weak as a primary alignment.

Examples needing review:

- Financial decision standards with only `Modeling`
- Insurance, credit, and debt standards where Common Core support is indirect
- Media/data claims where statistics and modeling references should be more precise

### Finding 4: SAT Alignment Is Strong but Primary/Support Classification Should Be Cleaner

SAT readiness is represented across:

- Algebra
- Advanced Math
- Problem-Solving and Data Analysis
- Geometry and Trigonometry

The overall balance is appropriate. Problem-Solving and Data Analysis is correctly prominent. However, several SAT Domain cells include multiple domains in the primary field. The workbook should use the primary field for the strongest domain and place secondary domains in support or notes.

### Finding 5: ACT Alignment Is Strong but Category Labels Should Be Normalized

ACT readiness is represented across:

- Number and Quantity
- Algebra
- Functions
- Geometry
- Statistics and Probability
- Integrating Essential Skills
- Modeling

The labels are generally consistent, but many rows include combined categories in the primary field. This is understandable for hybrid standards, but audit transparency would improve if each row had one primary ACT category and any additional categories identified as support.

### Finding 6: Quantitative Reasoning Is Present but Reasonableness Should Be More Explicit

Quantitative reasoning is central to the architecture, especially through ratios, rates, percents, units, weighted averages, formulas, function notation, and average rate of change.

The main gap is that estimation, reasonableness checks, and interpretation of results are primarily embedded rather than visible in selected benchmark statements. This is acceptable, but the embedded standards and notes should more explicitly state that reasonableness and unit interpretation are required across all domains.

### Finding 7: Workforce Readiness Is Strong but Could Be More Auditable

Workforce readiness is present through spreadsheets, financial decisions, data interpretation, risk evaluation, measurement, and modeling. The architecture is appropriate.

The weakness is documentation, not coverage. Workforce readiness should be tagged more explicitly in notes or readiness validation fields so reviewers can see where it appears.

---

## Required Corrections

| Required Correction | Location | Reason | Expected Impact |
|---|---|---|---|
| Replace inclusion-rationale text in the `Course Domain` column with approved domain labels. | MLA Standards Crosswalk | Current domain field is structurally incorrect. | Restores filterability, auditability, and domain-level validation. |
| Add or revise domain distribution summary after correcting `Course Domain`. | Coverage Audit | Domain counts should reflect actual MLA domains, not rationale text. | Improves accreditation defensibility. |
| Review broad Common Core entries such as `Modeling` and classify as support unless a specific standard or cluster is defensible. | MLA Standards Crosswalk | Broad alignments can overclaim precision. | Improves alignment accuracy. |
| Normalize SAT primary/support fields so the primary field identifies the strongest SAT domain. | MLA Standards Crosswalk | Some rows list multiple domains as primary. | Improves readiness traceability. |
| Normalize ACT primary/support fields so the primary field identifies the strongest ACT category. | MLA Standards Crosswalk | Some rows list multiple categories as primary. | Improves reporting consistency. |

---

## Recommended Improvements

- Add a `Readiness Role` or `Readiness Emphasis` field with values such as College Algebra, Quantitative Reasoning, Financial Literacy, Workforce, SAT, ACT, Data Literacy, Probability/Risk, Applied Geometry.
- Add a short note in the README explaining why `MA.912.FL` and `MA.912.DP` are intentionally prominent.
- Add a short note clarifying that `MLA.MCR.MC` is an embedded domain, not an omitted standards category.
- Consider adding a validation row in Coverage Audit for “Course does not replace Algebra II or Precalculus.”
- Add explicit references to estimation, units, and reasonableness in notes for more standards, especially finance, data, probability, and geometry.

---

## Florida Benchmark Review

The selected Florida benchmarks are appropriate for Math for College Readiness. The workbook includes 51 unique selected benchmarks and does not unnecessarily duplicate ownership.

### Representation

| Florida Domain | Review |
|---|---|
| `MA.912.FL` | Strong representation. Appropriate because financial literacy is central to the course purpose. |
| `MA.912.AR` | Appropriate representation. Supports College Algebra readiness without becoming Algebra II remediation. |
| `MA.912.F` | Limited but appropriate. Function notation and average rate of change are enough for this course purpose. |
| `MA.912.DP` | Strong representation. Appropriate because data literacy, probability, risk, and statistical claims are central to the Hybrid Model. |
| `MA.912.GR` | Appropriate applied geometry representation. Does not drift into proof-based Geometry. |
| `MA.912.T` | Minimal and appropriate. Right-triangle trigonometry supports applied measurement without turning the course into Precalculus. |

### Missing or Underrepresented Areas

No major benchmark domain gap was identified for the approved Hybrid Model.

Potential documentation gap: the workbook should explain that more advanced Algebra II, Precalculus, and formal proof benchmarks are intentionally excluded because they do not match the course purpose.

### Benchmarks That Do Not Belong

No selected benchmark appears clearly inappropriate for Math for College Readiness.

---

## Common Core Review

Common Core alignment is directionally sound but needs precision cleanup.

Strengths:

- Algebra and function standards are appropriately aligned to linear equations, systems, functions, exponential models, piecewise relationships, formulas, and rate of change.
- Statistics standards are appropriately aligned to data displays, distributions, bivariate data, correlation, two-way tables, and probability.
- Geometry standards are appropriately aligned to similarity, coordinate geometry, measurement, and right-triangle trigonometry.

Concerns:

- Some financial literacy standards have indirect Common Core alignment and should be marked support rather than primary where applicable.
- Broad `Modeling` references should be clarified as support alignment or replaced with more specific standards where defensible.
- Primary/support designations should be checked for consistency.

Required correction: refine broad Common Core alignments and avoid overclaiming direct alignment where the Common Core relationship is indirect.

---

## SAT Readiness Review

The architecture appropriately supports SAT readiness without becoming SAT test preparation.

### Strengths

- Algebra is supported through equations, inequalities, systems, function notation, and linear models.
- Advanced Math is represented through exponential and piecewise models.
- Problem-Solving and Data Analysis is strongly represented through quantitative reasoning, data literacy, financial literacy, probability, and risk.
- Geometry and Trigonometry are represented through applied geometry, measurement, scale, and right-triangle modeling.

### Gaps or Risks

- Advanced Math is less prominent than Problem-Solving and Data Analysis. This is acceptable for the Hybrid Model but should be acknowledged.
- Some SAT domain cells list combined domains in the primary field, which should be cleaned up for audit clarity.

Conclusion: SAT readiness is appropriate and balanced for the course purpose.

---

## ACT Readiness Review

The architecture appropriately supports ACT readiness without becoming ACT test preparation.

### Strengths

- Number and Quantity is supported through quantitative reasoning and financial calculations.
- Algebra and Functions are supported through applied algebra, linear models, exponential models, function notation, and rate of change.
- Geometry is supported through applied geometry and measurement.
- Statistics and Probability are strongly represented through data literacy, probability, risk, expected value, and decision making.
- Integrating Essential Skills and Modeling are embedded throughout the course.

### Gaps or Risks

- Combined ACT labels should be normalized into primary and support classifications.
- Geometry and trigonometry are intentionally applied rather than comprehensive; this should be documented as appropriate for MCR.

Conclusion: ACT readiness is strong and aligned to the Hybrid Model.

---

## College Algebra Readiness Review

The workbook supports College Algebra readiness through:

- Linear equations
- Linear functions
- Inequalities
- Systems
- Exponential models
- Piecewise functions
- Function notation
- Average rate of change
- Graph and table interpretation
- Formula manipulation

This is appropriate for Math for College Readiness. The course does not become Algebra II remediation because it emphasizes context, modeling, constraints, interpretation, and decision making.

Potential gap: College Algebra readiness would be stronger if notes explicitly identified which standards are “College Algebra readiness anchors.”

---

## Quantitative Reasoning Review

Quantitative reasoning is central to the standards architecture.

Represented skills include:

- Ratios
- Rates
- Percent reasoning
- Units
- Weighted averages
- Formulas
- Function interpretation
- Average rate of change
- Contextual decision making

Gap: estimation and reasonableness checks are embedded but should be more visibly documented across the main crosswalk.

Conclusion: quantitative reasoning is a central course identity.

---

## Financial Literacy Review

Financial literacy is strongly represented.

Included areas:

- Money and business calculations
- Net worth
- Profit, cost, and revenue
- Budgets
- Income tax
- Simple, compound, and continuously compounded interest
- Cash versus financing
- Finance charges
- Credit scores
- Debt payoff plans
- Insurance
- Retirement savings

This is appropriate and supports the Hybrid Model. Financial literacy is not overrepresented because the course purpose explicitly includes personal finance and workforce decision making.

Gap: documentation should clarify that financial standards are rigorous applied modeling, not consumer math only.

---

## Data Literacy Review

Data literacy is strongly represented.

Included areas:

- Data display selection
- Data distribution interpretation
- Correlation versus causation
- Center, variability, shape, and outliers
- Linear models for bivariate data
- Correlation and residuals
- Two-way frequency tables
- Relative frequencies
- Media/data claim evaluation

This is appropriate for college, career, and civic readiness.

Potential gap: sampling is included through report evaluation but could be more explicitly visible in notes and alignment rationale.

---

## Workforce Readiness Review

Workforce readiness is appropriately represented through:

- Spreadsheet use
- Financial decision making
- Budgeting and debt planning
- Data interpretation
- Probability and risk
- Expected value
- Measurement and geometric modeling
- Units and reasonableness
- Communication of quantitative reasoning

The architecture strongly supports workforce readiness. The main improvement needed is documentation: workforce readiness should be explicitly tagged across relevant standards.

---

## Standards Architecture Review

### Domain Structure

The approved domains are appropriate:

- `MLA.MCR.QR`
- `MLA.MCR.AR`
- `MLA.MCR.DL`
- `MLA.MCR.FL`
- `MLA.MCR.PR`
- `MLA.MCR.GM`
- `MLA.MCR.MC`

The embedded `MLA.MCR.MC` domain is correctly separated from the main crosswalk because modeling and communication should appear across all units rather than as a standalone content sequence.

### Maintainability

The standards architecture is maintainable after the `Course Domain` column is corrected. Until then, domain-level filtering and reporting are unreliable.

### Auditability

The workbook is mostly audit-ready, but not final audit-ready because:

- Course domain labels are incorrect in the main crosswalk.
- Some external alignments are too broad.
- Primary/support classifications need normalization.

### Accreditation Defensibility

The architecture is defensible as a selected-benchmark readiness course. It should explicitly avoid claims that it covers all Florida high school math standards or replaces Algebra II/Precalculus.

---

## Final Determination

**PASS WITH REVISIONS**

The MCR standards architecture is fundamentally sound and aligned to the approved Hybrid Model. Benchmark selection is appropriate, readiness coverage is broad, and no duplicate benchmark ownership was identified.

The workbook requires revisions before final approval, primarily:

- Correct the `Course Domain` column.
- Refine broad Common Core alignments.
- Normalize SAT and ACT primary/support classifications.
- Add clearer documentation for reasonableness, workforce readiness, and selected-benchmark limitations.
