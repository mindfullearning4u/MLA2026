# ALG1 Strict Multilayer Sweep - 2026-07-04

## Source of Truth

- Course: ALG1
- Mapping: `mla_algebra_1_unit_mapping_v3.md`
- Crosswalk: `mla_algebra_1_standards_crosswalk.xlsx`
- Course overview: `Course-Overview.md`
- Ignored as source of truth: all `Unit Overview.md` files

## Subagent Coverage

- Units 01-02: read-only subagent audit completed.
- Units 03-04: read-only subagent audit completed.
- Units 05-06: read-only subagent audit completed.
- Main agent rechecked current files directly and applied confirmed mechanical fixes.

## Corrections Applied

- Repaired ALG1 Moodle XML generation so mandatory number lines, tables, graph references, inequality graphs, function/data tables, and model visuals are embedded in production XML.
- Regenerated 102 production Moodle XML assessment banks from current source banks.
- Expanded short XML feedback into teachable feedback during XML generation.
- Rebuilt 18 missing/effectively empty `lesson.json` files for Units 01-03 from the approved mapping.
- Updated 48 `quiz.json` files so assessment metadata points to Moodle XML instead of legacy GIFT.
- Removed duplicate generic P01 Need help boxes from 24 pages, preserving the official `mla-tor-support-box`.
- Corrected non-synthesis P01 wording that incorrectly referred to review standards for a synthesis lesson.

## Current Validation Results

- Production Moodle XML files checked: 102
- XML questions checked: 1590
- XML answer choices checked: 6360
- XML answer-structure failures: 0
- Mandatory assessment visuals required: 139
- Mandatory assessment visuals present: 139
- Mandatory assessment visuals missing: 0
- Weak feedback items after regeneration: 0
- Empty or invalid `lesson.json` / `quiz.json`: 0
- `.gift` references in lesson HTML: 0
- `.gift` references in quiz metadata: 0
- P01 TOR support-box issues: 0
- P04 worked-example marker issues: 0

## Remaining Blocker: Lesson Rigor Depth

The course is not certified yet under the strict veteran-teacher lesson standard. The sweep found 104 instructional pages under 250 words across P02, P03, P04, or P06. Word count alone is not the full rigor standard, but this count confirms the subagent concern that many lessons need a deeper step-by-step expansion pass.

| File | Words |
|---|---:|
| `Units\Unit 01\Lesson 07\P04.html` | 236 |
| `Units\Unit 01\Lesson 07\P06.html` | 221 |
| `Units\Unit 01\Lesson 08\P06.html` | 246 |
| `Units\Unit 02\Lesson 01\P02.html` | 166 |
| `Units\Unit 02\Lesson 01\P03.html` | 224 |
| `Units\Unit 02\Lesson 02\P02.html` | 189 |
| `Units\Unit 02\Lesson 02\P03.html` | 225 |
| `Units\Unit 02\Lesson 02\P04.html` | 244 |
| `Units\Unit 02\Lesson 03\P02.html` | 192 |
| `Units\Unit 02\Lesson 03\P03.html` | 244 |
| `Units\Unit 02\Lesson 04\P02.html` | 183 |
| `Units\Unit 02\Lesson 04\P03.html` | 233 |
| `Units\Unit 02\Lesson 04\P04.html` | 249 |
| `Units\Unit 02\Lesson 05\P02.html` | 159 |
| `Units\Unit 02\Lesson 05\P03.html` | 225 |
| `Units\Unit 02\Lesson 05\P04.html` | 246 |
| `Units\Unit 02\Lesson 06\P02.html` | 209 |
| `Units\Unit 02\Lesson 06\P03.html` | 227 |
| `Units\Unit 02\Lesson 07\P02.html` | 207 |
| `Units\Unit 02\Lesson 07\P03.html` | 188 |
| `Units\Unit 02\Lesson 08\P02.html` | 155 |
| `Units\Unit 02\Lesson 08\P03.html` | 203 |
| `Units\Unit 02\Lesson 08\P04.html` | 249 |
| `Units\Unit 03\Lesson 01\P02.html` | 216 |
| `Units\Unit 03\Lesson 02\P02.html` | 178 |
| `Units\Unit 03\Lesson 02\P06.html` | 246 |
| `Units\Unit 03\Lesson 03\P02.html` | 188 |
| `Units\Unit 03\Lesson 03\P06.html` | 213 |
| `Units\Unit 03\Lesson 04\P02.html` | 191 |
| `Units\Unit 03\Lesson 04\P06.html` | 224 |
| `Units\Unit 03\Lesson 05\P02.html` | 224 |
| `Units\Unit 03\Lesson 05\P06.html` | 245 |
| `Units\Unit 03\Lesson 06\P02.html` | 241 |
| `Units\Unit 03\Lesson 06\P03.html` | 198 |
| `Units\Unit 03\Lesson 06\P06.html` | 207 |
| `Units\Unit 03\Lesson 07\P02.html` | 207 |
| `Units\Unit 03\Lesson 07\P03.html` | 240 |
| `Units\Unit 03\Lesson 07\P06.html` | 244 |
| `Units\Unit 03\Lesson 08\P02.html` | 192 |
| `Units\Unit 03\Lesson 08\P03.html` | 198 |
| `Units\Unit 03\Lesson 08\P06.html` | 246 |
| `Units\Unit 04\Lesson 01\P02.html` | 200 |
| `Units\Unit 04\Lesson 01\P06.html` | 239 |
| `Units\Unit 04\Lesson 02\P02.html` | 181 |
| `Units\Unit 04\Lesson 02\P03.html` | 235 |
| `Units\Unit 04\Lesson 02\P06.html` | 207 |
| `Units\Unit 04\Lesson 03\P02.html` | 187 |
| `Units\Unit 04\Lesson 03\P03.html` | 227 |
| `Units\Unit 04\Lesson 03\P04.html` | 245 |
| `Units\Unit 04\Lesson 03\P06.html` | 218 |
| `Units\Unit 04\Lesson 04\P02.html` | 188 |
| `Units\Unit 04\Lesson 04\P06.html` | 223 |
| `Units\Unit 04\Lesson 05\P02.html` | 195 |
| `Units\Unit 04\Lesson 05\P03.html` | 206 |
| `Units\Unit 04\Lesson 05\P06.html` | 239 |
| `Units\Unit 04\Lesson 06\P02.html` | 219 |
| `Units\Unit 04\Lesson 06\P03.html` | 214 |
| `Units\Unit 04\Lesson 06\P06.html` | 242 |
| `Units\Unit 04\Lesson 07\P02.html` | 162 |
| `Units\Unit 04\Lesson 07\P03.html` | 193 |
| `Units\Unit 04\Lesson 08\P02.html` | 141 |
| `Units\Unit 04\Lesson 08\P03.html` | 162 |
| `Units\Unit 04\Lesson 08\P06.html` | 220 |
| `Units\Unit 05\Lesson 01\P02.html` | 168 |
| `Units\Unit 05\Lesson 01\P03.html` | 183 |
| `Units\Unit 05\Lesson 01\P06.html` | 247 |
| `Units\Unit 05\Lesson 02\P02.html` | 152 |
| `Units\Unit 05\Lesson 02\P03.html` | 183 |
| `Units\Unit 05\Lesson 02\P06.html` | 248 |
| `Units\Unit 05\Lesson 03\P02.html` | 172 |
| `Units\Unit 05\Lesson 03\P03.html` | 183 |
| `Units\Unit 05\Lesson 03\P06.html` | 230 |
| `Units\Unit 05\Lesson 04\P02.html` | 154 |
| `Units\Unit 05\Lesson 04\P03.html` | 181 |
| `Units\Unit 05\Lesson 04\P06.html` | 235 |
| `Units\Unit 05\Lesson 05\P02.html` | 158 |
| `Units\Unit 05\Lesson 05\P03.html` | 206 |
| `Units\Unit 05\Lesson 05\P06.html` | 240 |
| `Units\Unit 05\Lesson 06\P02.html` | 177 |
| `Units\Unit 05\Lesson 06\P03.html` | 202 |
| `Units\Unit 05\Lesson 07\P02.html` | 167 |
| `Units\Unit 05\Lesson 07\P03.html` | 199 |
| `Units\Unit 05\Lesson 07\P06.html` | 242 |
| `Units\Unit 05\Lesson 08\P02.html` | 140 |
| `Units\Unit 05\Lesson 08\P03.html` | 169 |
| `Units\Unit 05\Lesson 08\P06.html` | 244 |
| `Units\Unit 06\Lesson 01\P02.html` | 233 |
| `Units\Unit 06\Lesson 01\P06.html` | 238 |
| `Units\Unit 06\Lesson 02\P02.html` | 210 |
| `Units\Unit 06\Lesson 03\P02.html` | 232 |
| `Units\Unit 06\Lesson 03\P06.html` | 247 |
| `Units\Unit 06\Lesson 04\P02.html` | 198 |
| `Units\Unit 06\Lesson 04\P03.html` | 243 |
| `Units\Unit 06\Lesson 04\P06.html` | 248 |
| `Units\Unit 06\Lesson 05\P02.html` | 198 |
| `Units\Unit 06\Lesson 05\P03.html` | 240 |
| `Units\Unit 06\Lesson 05\P06.html` | 239 |
| `Units\Unit 06\Lesson 06\P02.html` | 194 |
| `Units\Unit 06\Lesson 06\P03.html` | 222 |
| `Units\Unit 06\Lesson 07\P02.html` | 201 |
| `Units\Unit 06\Lesson 07\P03.html` | 232 |
| `Units\Unit 06\Lesson 08\P02.html` | 182 |
| `Units\Unit 06\Lesson 08\P03.html` | 203 |
| `Units\Unit 06\Lesson 08\P06.html` | 248 |

## Final Decision

NOT CERTIFIED under the new strict lesson-rigor standard.

Assessment XML, assessment visuals, metadata, XML references, P01 support-box consistency, and P04 marker checks now pass. The remaining required work is a lesson-rigor expansion pass, unit by unit, with mapping evidence and veteran-teacher step-by-step instruction.
