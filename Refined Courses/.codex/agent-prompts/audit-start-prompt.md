# Audit Start Prompt

Use this prompt when starting a new course audit with a new agent.

```text
Run a full course audit for [COURSE NAME] using the MLA2026 audit protocol.

Before auditing, read the controlling MD files in:
- .codex/standards/
- .codex/workflows/
- .codex/agent-prompts/

Use the ALG1-level layered audit model. Do not do a main-agent-only audit and do not rely only on scripts.

Create the required unit/category subagent coverage plan:
- instructional rigor audit for each unit
- structure/workflow audit for each unit
- assessment alignment audit for each unit
- assessment visual/XML audit for each unit
- metadata/LMS audit for each unit
- resource/simulation review when relevant
- science lab audit and science simulation/resource audit when auditing a science course
- cross-check verification auditor
- final certification auditor

Every audit must check the approved unit mapping and lesson mapping. Every lesson, assessment, question, visual, and standard must align to the mapping.

For science courses, also read `.codex/workflows/science-course-audit-workflow.md` and `.codex/standards/16-science-lab-and-virtual-lab-standard.md`. Labs, safety, data tables, graphs, diagrams, CER, virtual labs, and simulation/resource review are required audit gates when applicable. Every science unit must use Lesson 7 as its dedicated investigation lesson. Apply the same Lesson 7 gate to another course when a simulation, lab, interactive, graph, model, or structured data investigation materially supports the mapped standards. Audit the exact student actions, visuals/data/source access, recording tool, worked example, guided practice, independent analysis, submission directions, and aligned assessment evidence.

Audit student-support language as a required quality gate. Lessons must provide complete self-directed instruction while making Teacher of Record help feel accessible and specific. Reject language telling students there is no teacher or that they are on their own.

If any subagent finds a problem, inspect the actual file, fix valid issues, rerun the relevant audit, and document the correction.

Do not call the course clean, complete, certified, student ready, or PASS unless all required gates pass and the subagent coverage table is complete.
```

## Short User Instruction

When starting a new audit, the user may simply say:

```text
Read .codex/agent-prompts/audit-start-prompt.md and run the full course audit for [COURSE NAME].
```

The agent must then follow the full prompt above and the controlling MLA2026 audit protocol files.
