# MLA Statistics Standards Crosswalk Audit

## Executive Summary

This audit reviews `STATISTICS/mla_statistics_standards_crosswalk.xlsx` as a standards architecture document only. It does not create units, lessons, or instructional sequencing.

The workbook is fundamentally aligned to the approved Hybrid Statistics Model from `Statistics_Curriculum_Analysis.md`. It includes 46 unique MLA Statistics standards mapped to 46 selected Florida/CPALMS Probability and Statistics benchmarks from the local Statistics Benchmark Master Tracker. No duplicate benchmark ownership or orphaned benchmark was identified in the workbook.

The crosswalk appropriately emphasizes data visualization, descriptive statistics, bivariate data and modeling, probability, sampling, research design, inference, expected value, and evidence-based decision making. The course does not drift into Algebra II remediation, Precalculus preparation, a Math for College Readiness duplicate, spreadsheet-only analytics, SAT/ACT test preparation, or an AP Statistics clone.

The workbook should receive revisions before being treated as final audit-ready documentation. The main issue is not benchmark coverage; it is architecture documentation and alignment precision. The approved domain `MLA.STAT.STQ` is not represented as a primary domain in the crosswalk, even though statistical thinking is described as an approved course domain. Statistical thinking appears embedded, but it is not auditable as a named standards domain. Inference readiness is present, but p-values, hypothesis testing language, practical significance, and limitations of conclusions should be documented more explicitly in notes or embedded standards to avoid appearing underdeveloped.

**Final Determination:** PASS WITH REVISIONS

---

## Strengths

- The workbook contains the required seven tabs: README, MLA Standards Crosswalk, Embedded Standards, Coverage Audit, MLA Inventory, Sources, and Corrections Log.
- The crosswalk includes 46 unique MLA Statistics standards.
- The crosswalk includes 46 unique selected Florida/CPALMS Probability and Statistics benchmarks.
- No duplicate benchmark ownership was identified.
- No orphaned MLA standards or selected benchmarks were identified.
- MLA standard statements are generally student-friendly and do not simply copy benchmark text.
- Bivariate data and modeling are strongly represented.
- Probability and discrete probability distributions are strongly represented.
- Research design, sampling, and report evaluation are represented.
- Statistical inference is represented through sampling, margin of error, simulation, confidence level, two-population inference, randomized treatment comparison, and simulation-based significance.
- Workforce data literacy is present through report evaluation, technology use, expected value, risk evaluation, and evidence-based decision making.
- Course boundaries are documented: the course is not Algebra II remediation, Precalculus preparation, a Math for College Readiness duplicate, spreadsheet-only analytics, narrow SAT/ACT prep, or an AP Statistics clone.

---

## Findings

### Finding 1: Benchmark Coverage Is Complete for the Selected Local Benchmark Set

The workbook includes all 46 benchmarks listed in `STATISTICS/BEST Standards/Statistics Benchmark Master Tracker.md`.

No selected benchmark appears missing. No selected benchmark appears duplicated unnecessarily. No selected benchmark appears orphaned.

### Finding 2: `MLA.STAT.STQ` Is Missing as a Primary Domain

The approved instructional domains include:

- `MLA.STAT.STQ` Statistical Thinking and Questioning
- `MLA.STAT.DCR` Data Collection and Research Design
- `MLA.STAT.DVD` Data Visualization and Descriptive Statistics
- `MLA.STAT.BVM` Bivariate Data and Modeling
- `MLA.STAT.PSU` Probability and Simulation
- `MLA.STAT.INF` Statistical Inference
- `MLA.STAT.DMC` Data-Based Decision Making and Communication

The workbook represents `DCR`, `DVD`, `BVM`, `PSU`, `INF`, and `DMC`, but not `STQ` as a primary domain. Statistical thinking appears embedded across standards, but the absence of `MLA.STAT.STQ` weakens auditability because the approved model names it as a major course domain.

This does not create a benchmark gap, but it does create an architecture-documentation gap.

### Finding 3: Inference Is Present but Needs Stronger Documentation

The workbook includes inference-related standards for:

- Population parameters and sample statistics
- Random sampling
- Margin of error
- Confidence level
- Simulated samples
- Data-generating process models
- Two-population inference
- Randomized treatment comparison
- Simulation-based significance
- Report evaluation

However, the approved curriculum analysis explicitly names hypothesis testing, p-values, statistical significance, practical significance, and limitations of conclusions. These ideas are only indirectly represented through simulation-based significance and report evaluation.

The workbook should not become AP Statistics, but it should document these inference concepts as introductory readiness language in notes, embedded standards, or an inference-readiness clarification.

### Finding 4: Research Design Is Represented but Ethics and Confounding Should Be More Explicit

Sampling methods, surveys, experiments, observational studies, and study-design selection are represented. However, the crosswalk should make ethics, confounding variables, bias, randomization, control, and limits of causal conclusions more visible.

These items can be strengthened through notes and embedded standards without changing benchmark ownership.

### Finding 5: Common Core Alignments Are Generally Sound but Some Support Relationships Should Be Clarified

Most Common Core alignments are defensible, especially:

- `HSS-ID` for data displays, distributions, bivariate data, correlation, and residuals
- `HSS-CP` for conditional probability and probability rules
- `HSS-IC` for inference, sampling, experiments, and report evaluation
- `HSS-MD` for random variables, expected value, and decision making

Some rows use Common Core support alignments where the benchmark relationship is indirect, especially exponential modeling and discrete distribution applications. These are acceptable, but audit transparency would improve if notes more clearly separate primary statistical alignments from supporting algebra/modeling alignments.

### Finding 6: SAT Readiness Is Appropriate and Not Overbuilt

SAT alignment is appropriately concentrated in Problem-Solving and Data Analysis. Algebra and Advanced Math appear only where appropriate for model fitting and exponential relationships. Geometry/Trigonometry is not forced into the course.

This supports SAT readiness without making the course SAT prep.

### Finding 7: ACT Readiness Is Appropriate but Category Labels Could Be More Consistent

ACT readiness is represented through Statistics and Probability, Modeling, and some support through Functions. This matches the course purpose.

Some rows combine categories such as `Statistics and Probability; Modeling`. This is instructionally reasonable, but the workbook should maintain a consistent distinction between primary and support categories.

### Finding 8: Workforce Data Literacy Is Present but Could Be More Auditable

Workforce readiness is represented through:

- Interpreting reports
- Evaluating claims
- Using technology
- Modeling relationships
- Expected value and risk
- Decision making under uncertainty

The weakness is documentation. Dashboards, workplace reports, data communication, risk evaluation, and evidence-based conclusions should be tagged more explicitly in notes or embedded standards.

---

## Required Corrections

| Required Correction | Location | Reason | Expected Impact |
|---|---|---|---|
| Add auditable representation of `MLA.STAT.STQ` or document it clearly as an embedded domain. | MLA Standards Crosswalk, Embedded Standards, Coverage Audit, README | Statistical Thinking and Questioning is an approved domain but is not represented as a primary domain. | Improves alignment to the approved Hybrid Statistics Model. |
| Add explicit inference-readiness notes for hypothesis testing, p-values, statistical significance, practical significance, and limitations of conclusions. | Inference standards, Embedded Standards, Coverage Audit | These concepts are named in the approved analysis but are only indirectly visible. | Improves College Statistics readiness documentation without turning the course into AP Statistics. |
| Strengthen research literacy notes for ethics, bias, confounding, randomization, control, and limits of causal claims. | DCR and DMC rows, Embedded Standards | Research literacy is central to the approved model. | Improves audit defensibility and college/social-science readiness. |
| Clarify primary/support alignment documentation where SAT, ACT, or Common Core categories are combined. | MLA Standards Crosswalk | Some rows include multiple domains/categories in ways that could reduce audit clarity. | Improves traceability and alignment precision. |

---

## Recommended Improvements

- Add a `Readiness Role` or `Readiness Emphasis` field in a future revision with values such as College Statistics, Research Literacy, Workforce Data Literacy, SAT, ACT, Probability, Inference, and Decision Making.
- Add a domain-distribution table to the Coverage Audit showing counts by MLA domain.
- Add a short README note explaining that AP Statistics themes informed the architecture but the course is not AP Statistics.
- Add a note explaining that technology and spreadsheets support statistical reasoning but do not replace interpretation.
- Consider splitting some broad probability/distribution notes into probability, simulation, expected value, and decision-making emphasis for easier audit review.

---

## Florida Benchmark Review

The selected benchmark set is appropriate for MLA Statistics. It is drawn from the local Statistics Benchmark Master Tracker, which identifies 46 CPALMS Probability and Statistics Honors benchmarks.

### Coverage Summary

| Area | Review |
|---|---|
| Data Analysis | Strong representation through data displays, distributions, center, variability, normal models, and data interpretation. |
| Probability | Strong representation through sample spaces, independence, conditional probability, probability rules, counting, random variables, expected value, and distributions. |
| Simulation | Present through margin of error, simulated samples, model consistency, and significance by simulation. |
| Statistical Inference | Present through sampling, confidence level, margin of error, random samples, treatment comparisons, and simulation-based significance. |
| Sampling | Strong representation through parameters/statistics, random sampling, sampling methods, and study design. |
| Research Design | Present through surveys, experiments, observational studies, and design selection. Needs stronger documentation around ethics/confounding/control. |
| Bivariate Data | Strong representation through correlation/causation, linear and exponential models, residuals, correlation coefficient, and categorical association. |
| Modeling | Strong representation through linear/exponential models, normal models, probability models, data-generating process models, and decision models. |

No benchmark appears inappropriate for a high school Statistics course.

---

## Common Core Review

Common Core alignments are directionally accurate and use appropriate high school Statistics and Probability clusters:

- `HSS-ID` for interpreting categorical and quantitative data
- `HSS-IC` for making inferences and justifying conclusions
- `HSS-CP` for conditional probability and probability rules
- `HSS-MD` for random variables and using probability to make decisions

Primary/support classifications are mostly reasonable. Areas for improvement:

- Ensure broad or indirect modeling alignments are marked support rather than primary.
- Clarify when exponential modeling standards are statistical model-fitting support rather than Algebra II content.
- Ensure inference-related standards include `HSS-IC` where appropriate.

No major Common Core alignment failure was identified.

---

## SAT Readiness Review

The crosswalk appropriately supports SAT readiness without becoming test prep.

### Strengths

- Problem-Solving and Data Analysis is strongly represented.
- Students interpret data displays, tables, bivariate relationships, models, claims, and probability contexts.
- Algebra and Advanced Math appear only where needed for model fitting and exponential relationships.
- Geometry/Trigonometry is not forced into the Statistics course.

### Gaps or Risks

- SAT readiness could be more clearly documented in relation to interpreting claims, tables, and data-based arguments.
- Some SAT support categories should be moved to notes rather than combined in the primary domain field.

Conclusion: SAT readiness alignment is appropriate.

---

## ACT Readiness Review

The crosswalk appropriately supports ACT readiness without becoming ACT prep.

### Strengths

- Statistics and Probability is strongly represented.
- Modeling is represented through data models, probability models, inference, and decision making.
- Integrating Essential Skills is supported through interpretation, technology use, and contextual reasoning.

### Gaps or Risks

- ACT category labels should be normalized so each row has a clearly strongest primary category and secondary categories are marked support.
- Workforce and communication alignment could be more visible in notes.

Conclusion: ACT readiness alignment is appropriate with minor documentation refinements.

---

## College Statistics Readiness Review

The crosswalk supports introductory College Statistics readiness well.

### Well Represented

- Statistical questions
- Sampling
- Experimental design
- Data visualization
- Descriptive statistics
- Bivariate relationships
- Probability
- Simulation
- Margin of error
- Confidence level
- Statistical inference
- Communication of conclusions

### Needs Stronger Documentation

- Hypothesis testing
- P-values
- Statistical significance
- Practical significance
- Limitations of conclusions

These concepts are present indirectly through simulation-based significance and report evaluation. They should be documented explicitly as introductory readiness expectations, not as AP-level procedural requirements.

---

## Research Literacy Review

Research literacy is a strong part of the architecture.

### Well Represented

- Surveys
- Observational studies
- Experiments
- Sampling methods
- Random sampling
- Evaluation of reports
- Correlation versus causation
- Treatment comparisons

### Needs Stronger Documentation

- Bias
- Confounding variables
- Ethical data collection
- Randomization and control as research design concepts
- Limits of causal claims

The research literacy domain is appropriate, but these ideas should be easier to see in the workbook.

---

## Workforce Data Literacy Review

The workbook supports workforce data literacy through interpretation, technology use, modeling, probability, risk, and decision making.

### Well Represented

- Data interpretation
- Reports and media claims
- Data communication
- Decision making
- Risk evaluation
- Expected value
- Evidence-based conclusions

### Needs Stronger Documentation

- Dashboard/report interpretation
- Spreadsheet-supported analysis
- Workplace communication of findings
- Decision limitations and assumptions

The crosswalk should make these workforce-readiness connections more explicit for accreditation and curriculum review.

---

## Statistical Inference Review

Inference receives appropriate representation for a high school Statistics course but should be documented more precisely.

### Well Represented

- Sampling variability
- Confidence level
- Margin of error
- Simulation
- Two-population inference
- Treatment comparisons
- Simulation-based significance
- Report evaluation

### Needs Stronger Documentation

- Hypothesis testing language
- P-values
- Statistical significance
- Practical significance
- Limitations of conclusions

The course should not become AP Statistics, but students should develop enough language and conceptual understanding to enter introductory College Statistics confidently.

---

## Standards Architecture Review

The domain structure is mostly strong and maintainable.

### Strengths

- Domains are aligned to the approved Hybrid Statistics Model.
- Standards are student-friendly and auditable.
- Benchmark ownership is clean.
- Coverage Audit and MLA Inventory support long-term maintainability.
- Sources and Corrections Log are present.

### Architecture Issues

- `MLA.STAT.STQ` is missing as a visible primary domain despite being an approved instructional domain.
- Some statistical thinking content is embedded rather than represented in a way that can be filtered or audited.
- Domain counts should be documented in the Coverage Audit.
- Primary/support alignment classifications should be normalized for maximum audit clarity.

### Accreditation Defensibility

The workbook is defensible as a first official crosswalk, but a revised version should improve domain visibility and readiness documentation before final accreditation review.

---

## Final Determination

**PASS WITH REVISIONS**

The standards architecture is fundamentally sound. Benchmark selection is appropriate, benchmark coverage is complete for the selected local CPALMS set, and the Hybrid Statistics Model is preserved. Required revisions are primarily documentation, domain visibility, and alignment classification refinements.
