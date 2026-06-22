# MLA Math Courses - Unit Assessment Reconstruction and Validation Report

## Executive Summary

This audit reviewed Unit Assessments for:

- Algebra 1 (`ALG1`)
- Geometry (`GEOMETRY`)
- Algebra 2 (`ALG2`)
- Statistics (`STATISTICS`)
- Precalculus (`PRECALCULUS`)
- Math for College Readiness (`Math for College Readiness`)

Result: No Unit Assessment reconstruction was required. All located Unit Assessments already contain exactly 40 multiple-choice questions.

No Unit Assessment `.gift` files were modified during this audit.

## Validation Scope

The audit checked:

- Unit Assessment file presence
- Question count
- Four answer choices per question
- One correct answer per question
- Feedback presence
- Duplicate answer choices
- Actual HTML tags inside GIFT content
- MLA standard identifiers embedded in assessment items
- Course/unit assessment coverage by standard tags

## Mechanical Validation Results

All 36 Unit Assessments passed the mechanical Moodle/GIFT validation:

- 40 questions exactly
- 4 answer choices per question
- 1 correct answer per question
- Feedback included
- No duplicate answer choices detected
- No actual HTML tags detected
- Moodle-compatible GIFT question markers detected

## Metadata Note

Some legacy Algebra 1 `lesson.json` files are empty, which limits automated lesson-json-based standard verification for those specific lessons. This audit therefore did not modify those lesson metadata files and did not change assessment content. The Unit Assessment files themselves contain MLA standard identifiers and pass GIFT-format validation.

## Final Course and Unit Results

| Course | Unit | Original Question Count | Corrected Question Count | Lessons Represented | Standards Represented | Pass/Fail |
| --- | ---: | ---: | ---: | --- | --- | --- |
| ALG1 | 1 | 40 | 40 | Lessons 1-7 | MLA.A1.FND.1, MLA.A1.FND.2, MLA.A1.FND.4 | PASS |
| ALG1 | 2 | 40 | 40 | Lessons 1-7 | MLA.A1.AR.1, MLA.A1.FND.5 | PASS |
| ALG1 | 3 | 40 | 40 | Lessons 1-7 | MLA.A1.AR.2, MLA.A1.AR.3, MLA.A1.AR.4, MLA.A1.FN.5, MLA.A1.LR.1, MLA.A1.LR.2, MLA.A1.LR.3, MLA.A1.LR.5 | PASS |
| ALG1 | 4 | 40 | 40 | Lessons 1-7 | MLA.A1.AR.8, MLA.A1.FN.1, MLA.A1.FN.2, MLA.A1.FN.3, MLA.A1.FN.4, MLA.A1.LR.4 | PASS |
| ALG1 | 5 | 40 | 40 | Lessons 1-7 | MLA.A1.FN.6, MLA.A1.FN.7, MLA.A1.FND.3, MLA.A1.FND.6, MLA.A1.FND.7, MLA.A1.FND.8, MLA.A1.QE.1, MLA.A1.QE.2, MLA.A1.QE.3, MLA.A1.QE.4, MLA.A1.QE.5, MLA.A1.QE.6, MLA.A1.QE.7, MLA.A1.QE.8, MLA.A1.QE.9 | PASS |
| ALG1 | 6 | 40 | 40 | Lessons 1-7 | MLA.A1.AR.5, MLA.A1.AR.6, MLA.A1.AR.7, MLA.A1.DF.1, MLA.A1.DF.2, MLA.A1.DF.3, MLA.A1.DF.4, MLA.A1.DF.5, MLA.A1.DF.6, MLA.A1.DF.7, MLA.A1.DF.8, MLA.A1.DF.9 | PASS |
| GEOMETRY | 1 | 40 | 40 | Lessons 1-7 | MLA.GEO.FND.1, MLA.GEO.FND.2, MLA.GEO.RP.1, MLA.GEO.RP.4, MLA.GEO.RP.5, MLA.GEO.RP.6 | PASS |
| GEOMETRY | 2 | 40 | 40 | Lessons 1-7 | MLA.GEO.CGM.1, MLA.GEO.CGM.2, MLA.GEO.CGM.5, MLA.GEO.CGM.6, MLA.GEO.RP.1, MLA.GEO.RP.4, MLA.GEO.RP.5, MLA.GEO.RP.6 | PASS |
| GEOMETRY | 3 | 40 | 40 | Lessons 1-7 | MLA.GEO.RP.2, MLA.GEO.RP.3, MLA.GEO.TRI.1, MLA.GEO.TRI.2, MLA.GEO.TRI.3 | PASS |
| GEOMETRY | 4 | 40 | 40 | Lessons 1-7 | MLA.GEO.CGM.3, MLA.GEO.CGM.4, MLA.GEO.SIM.1, MLA.GEO.SIM.2, MLA.GEO.SIM.3, MLA.GEO.TRI.4, MLA.GEO.TRI.5 | PASS |
| GEOMETRY | 5 | 40 | 40 | Lessons 1-7 | MLA.GEO.CIR.1, MLA.GEO.CIR.2, MLA.GEO.CIR.3, MLA.GEO.CIR.4, MLA.GEO.CIR.5, MLA.GEO.CIR.6, MLA.GEO.CIR.7, MLA.GEO.CIR.8 | PASS |
| GEOMETRY | 6 | 40 | 40 | Lessons 1-7 | MLA.GEO.CGM.8, MLA.GEO.CGM.9, MLA.GEO.CGM.10, MLA.GEO.CGM.11, MLA.GEO.CGM.12, MLA.GEO.CGM.13, MLA.GEO.CGM.14, MLA.GEO.CGM.15, MLA.GEO.CGM.16, MLA.GEO.CIR.9, MLA.GEO.CIR.10, MLA.GEO.SIM.4 | PASS |
| ALG2 | 1 | 40 | 40 | Lessons 1-7 | MLA.A2.AE.1, MLA.A2.AE.2, MLA.A2.AE.3, MLA.A2.AE.4, MLA.A2.AE.5, MLA.A2.FN.1, MLA.A2.PF.1, MLA.A2.PF.7 | PASS |
| ALG2 | 2 | 40 | 40 | Lessons 1-7 | MLA.A2.PF.2, MLA.A2.PF.3, MLA.A2.PF.4, MLA.A2.PF.5, MLA.A2.PF.6, MLA.A2.PF.8 | PASS |
| ALG2 | 3 | 40 | 40 | Lessons 1-7 | MLA.A2.AE.6, MLA.A2.AE.7, MLA.A2.AE.8, MLA.A2.RR.1, MLA.A2.RR.2, MLA.A2.RR.3, MLA.A2.RR.4, MLA.A2.RR.5, MLA.A2.RR.6 | PASS |
| ALG2 | 4 | 40 | 40 | Lessons 1-7 | MLA.A2.EX.1, MLA.A2.EX.2, MLA.A2.EX.3, MLA.A2.FM.2, MLA.A2.FM.3, MLA.A2.FM.4, MLA.A2.LOG.1, MLA.A2.LOG.2, MLA.A2.LOG.3, MLA.A2.LOG.4 | PASS |
| ALG2 | 5 | 40 | 40 | Lessons 1-7 | MLA.A2.FN.3, MLA.A2.FN.4, MLA.A2.FN.5, MLA.A2.FN.6, MLA.A2.FN.7, MLA.A2.FN.8, MLA.A2.FN.9, MLA.A2.FN.10, MLA.A2.FN.11, MLA.A2.FN.12, MLA.A2.SYS.1, MLA.A2.SYS.2, MLA.A2.SYS.3, MLA.A2.SYS.4 | PASS |
| ALG2 | 6 | 40 | 40 | Lessons 1-7 | MLA.A2.EX.4, MLA.A2.FM.1, MLA.A2.FN.2 | PASS |
| STATISTICS | 1 | 40 | 40 | Lessons 1-7 | MLA.STAT.DVD.3, MLA.STAT.STQ.1, MLA.STAT.STQ.2 | PASS |
| STATISTICS | 2 | 40 | 40 | Lessons 1-7 | MLA.STAT.DVD.4, MLA.STAT.DVD.5, MLA.STAT.DVD.6 | PASS |
| STATISTICS | 3 | 40 | 40 | Lessons 1-7 | MLA.STAT.BVM.1, MLA.STAT.BVM.2, MLA.STAT.BVM.3, MLA.STAT.BVM.4, MLA.STAT.BVM.5, MLA.STAT.BVM.6, MLA.STAT.BVM.7, MLA.STAT.BVM.8, MLA.STAT.BVM.9, MLA.STAT.BVM.10 | PASS |
| STATISTICS | 4 | 40 | 40 | Lessons 1-7 | MLA.STAT.PSU.1, MLA.STAT.PSU.2, MLA.STAT.PSU.3, MLA.STAT.PSU.4, MLA.STAT.PSU.5, MLA.STAT.PSU.6, MLA.STAT.PSU.7, MLA.STAT.PSU.8, MLA.STAT.PSU.9, MLA.STAT.PSU.10 | PASS |
| STATISTICS | 5 | 40 | 40 | Lessons 1-7 | MLA.STAT.DCR.1, MLA.STAT.DCR.2, MLA.STAT.DCR.3, MLA.STAT.DCR.4, MLA.STAT.DCR.5, MLA.STAT.DMC.1, MLA.STAT.INF.1, MLA.STAT.INF.2, MLA.STAT.INF.3, MLA.STAT.INF.4, MLA.STAT.INF.5, MLA.STAT.INF.6, MLA.STAT.INF.7 | PASS |
| STATISTICS | 6 | 40 | 40 | Lessons 1-7 | MLA.STAT.DMC.2, MLA.STAT.DMC.3, MLA.STAT.PSU.11, MLA.STAT.PSU.12, MLA.STAT.PSU.13, MLA.STAT.PSU.14, MLA.STAT.PSU.15 | PASS |
| PRECALCULUS | 1 | 40 | 40 | Lessons 1-7 | MLA.PC.EX.1, MLA.PC.EX.2, MLA.PC.FA.1, MLA.PC.FA.2, MLA.PC.FA.3, MLA.PC.FA.4, MLA.PC.FA.5, MLA.PC.FA.7, MLA.PC.FA.8, MLA.PC.FA.9, MLA.PC.FA.10, MLA.PC.FA.11, MLA.PC.FA.12, MLA.PC.FA.13, MLA.PC.MOD.1, MLA.PC.MOD.2 | PASS |
| PRECALCULUS | 2 | 40 | 40 | Lessons 1-7 | MLA.PC.TR.1, MLA.PC.TR.2, MLA.PC.TR.3, MLA.PC.TR.4, MLA.PC.TR.5, MLA.PC.TR.6, MLA.PC.TR.7, MLA.PC.TR.8, MLA.PC.TR.9, MLA.PC.TR.10, MLA.PC.TR.11 | PASS |
| PRECALCULUS | 3 | 40 | 40 | Lessons 1-7 | MLA.PC.TR.7, MLA.PC.TR.8, MLA.PC.TR.12, MLA.PC.TR.13, MLA.PC.TR.14 | PASS |
| PRECALCULUS | 4 | 40 | 40 | Lessons 1-7 | MLA.PC.PA.1, MLA.PC.PA.2, MLA.PC.PA.3, MLA.PC.PA.4, MLA.PC.PA.5, MLA.PC.PA.6, MLA.PC.PA.7, MLA.PC.PA.8, MLA.PC.PA.9, MLA.PC.VC.1, MLA.PC.VC.2, MLA.PC.VC.3, MLA.PC.VC.4, MLA.PC.VC.5 | PASS |
| PRECALCULUS | 5 | 40 | 40 | Lessons 1-7 | MLA.PC.PA.10, MLA.PC.PA.11, MLA.PC.PA.12, MLA.PC.PA.13, MLA.PC.PA.14, MLA.PC.PA.15, MLA.PC.PA.16, MLA.PC.VC.6, MLA.PC.VC.7, MLA.PC.VC.8, MLA.PC.VC.9, MLA.PC.VC.10, MLA.PC.VC.11, MLA.PC.VC.12, MLA.PC.VC.13 | PASS |
| PRECALCULUS | 6 | 40 | 40 | Lessons 1-7 | MLA.PC.FA.6, MLA.PC.SEQ.1, MLA.PC.SEQ.2, MLA.PC.SEQ.3, MLA.PC.SEQ.4, MLA.PC.SEQ.5 | PASS |
| Math for College Readiness | 1 | 40 | 40 | Lessons 1-7 | MLA.MCR.MC.1, MLA.MCR.MC.2, MLA.MCR.MC.3, MLA.MCR.QR.1, MLA.MCR.QR.2, MLA.MCR.QR.3, MLA.MCR.QR.4, MLA.MCR.QR.5, MLA.MCR.QR.6 | PASS |
| Math for College Readiness | 2 | 40 | 40 | Lessons 1-7 | MLA.MCR.AR.1, MLA.MCR.AR.2, MLA.MCR.AR.3, MLA.MCR.AR.4, MLA.MCR.AR.5, MLA.MCR.AR.6, MLA.MCR.AR.7, MLA.MCR.AR.8 | PASS |
| Math for College Readiness | 3 | 40 | 40 | Lessons 1-7 | MLA.MCR.DL.1, MLA.MCR.DL.2, MLA.MCR.DL.3, MLA.MCR.DL.4, MLA.MCR.DL.5, MLA.MCR.DL.6, MLA.MCR.DL.7, MLA.MCR.DL.8, MLA.MCR.DL.9 | PASS |
| Math for College Readiness | 4 | 40 | 40 | Lessons 1-7 | MLA.MCR.FL.1, MLA.MCR.FL.2, MLA.MCR.FL.3, MLA.MCR.FL.4, MLA.MCR.FL.5, MLA.MCR.FL.6, MLA.MCR.FL.7, MLA.MCR.FL.8, MLA.MCR.FL.9, MLA.MCR.FL.10, MLA.MCR.FL.11, MLA.MCR.FL.12 | PASS |
| Math for College Readiness | 5 | 40 | 40 | Lessons 1-7 | MLA.MCR.PR.1, MLA.MCR.PR.2, MLA.MCR.PR.3, MLA.MCR.PR.4, MLA.MCR.PR.5, MLA.MCR.PR.6, MLA.MCR.PR.7, MLA.MCR.PR.8, MLA.MCR.PR.9 | PASS |
| Math for College Readiness | 6 | 40 | 40 | Lessons 1-7 | MLA.MCR.GM.1, MLA.MCR.GM.2, MLA.MCR.GM.3, MLA.MCR.GM.4, MLA.MCR.GM.5, MLA.MCR.GM.6, MLA.MCR.GM.7 | PASS |

## Corrections Made

None. No Unit Assessment file required expansion or correction during this pass.

## Final Decision

MLA Math Unit Assessments:

PASS - ALL REVIEWED UNIT ASSESSMENTS CONTAIN 40 MOODLE-READY QUESTIONS AND DID NOT REQUIRE RECONSTRUCTION.
