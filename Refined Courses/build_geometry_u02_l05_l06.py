from pathlib import Path
import json

ROOT = Path(r"c:\MLA\MLA2026\Refined Courses")


def write(rel, text):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def header(lesson):
    return f'''<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);">
  <div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">GEO | Unit 02 | Lesson {lesson}</div>
</div>
'''


def band(bg, border, title, desc=""):
    extra = f'\n  <p style="margin-bottom: 14px;">{desc}</p>' if desc else ""
    return f'''<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: {bg}; border-left: 8px solid {border}; border-radius: 10px; padding: 24px;">
  <h1 style="font-size: 30px; margin-top: 0; margin-bottom: 12px;">{title}</h1>{extra}
</div>
'''


def card(title, body, bg="#ffffff", border="#2563eb"):
    return f'''<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 22px; background: {bg}; border-left: 6px solid {border};">
  <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 10px;">{title}</h2>
  {body}
</div>
'''


def title_card(body, title="Lesson Title"):
    return f'''<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border-radius: 10px; padding: 22px; background: #fffbeb; border: 2px solid #f59e0b;">
  <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 10px;">{title}</h2>
  {body}
</div>
'''


def gift_item(item):
    out = [
        f"::{item['id']}::",
        f"Question ID:<br>{item['id']}<br><br>MLA Standard:<br>{item['std']}<br><br>Question:<br>{item['q']} {{",
    ]
    for i, choice in enumerate(item["choices"]):
        prefix = "=" if i == item["correct"] else "~"
        out.append(f"{prefix} {choice}#{item['fb'][i]}")
    out.append("}")
    return "\n".join(out)


def make_gift(items):
    return "\n\n".join(gift_item(item) for item in items) + "\n"


def feedbacks(correct_index, correct_msg, wrong_msg):
    return [correct_msg if i == correct_index else wrong_msg for i in range(4)]


def build_pages():
    lessons = {
        "05": {
            "folder": "GEOMETRY/Units/Unit 02/Lesson 05",
            "lesson_title": "Lesson 5: Justifying Congruence with Rigid Transformations",
            "intro": "In this lesson, you will use rigid transformations to explain why two figures are congruent.",
            "standards": "<p><strong>MLA.GEO.CGM.6:</strong> I can use rigid transformations to justify that two figures are congruent.</p>",
            "learn": "<ul style='padding-left: 26px;'><li>How rigid transformations preserve size and shape.</li><li>How a sequence of rigid motions can map one figure onto another.</li><li>How to use transformation evidence to justify congruence.</li></ul>",
            "do": "<ul style='padding-left: 26px;'><li>Identify translations, reflections, and rotations that map figures.</li><li>Compare corresponding parts after a rigid transformation.</li><li>Write short congruence justifications using precise language.</li></ul>",
            "mastery": "<ul style='padding-left: 26px;'><li>Complete notebook evidence about rigid-motion congruence.</li><li>Submit a checkpoint justification for congruent figures.</li><li>Demonstrate at least 80% mastery on the lesson quiz or complete Teacher of Record intervention before another randomized attempt is released.</li></ul>",
            "connection": "<p><strong>MLA.GEO.CGM.6:</strong> This standard asks you to justify congruence by showing that one figure can be moved onto another using rigid transformations.</p><p>In student language: <strong>I can explain that figures are congruent when a rigid motion maps one exactly onto the other.</strong></p>",
            "p02_title": "Rigid Transformations and Congruence",
            "p02_focus": "<p>Two figures are congruent when they have the same size and same shape. A rigid transformation can move one figure without stretching or shrinking it.</p><p style='font-size: 26px; font-weight: 600; line-height: 1.6;'>If a rigid motion maps figure A onto figure B, then figure A &cong; figure B.</p>",
            "p02_vocab": "<ul style='padding-left: 26px;'><li><strong>Congruent figures:</strong> figures with the same size and shape.</li><li><strong>Rigid transformation:</strong> a transformation that preserves distance and angle measure.</li><li><strong>Maps onto:</strong> moves one figure so it matches another figure exactly.</li><li><strong>Corresponding parts:</strong> matching sides and angles in two figures.</li></ul>",
            "p02_example": "<p>Triangle ABC can be translated 5 units right to land exactly on triangle DEF.</p><p><strong>Conclusion:</strong> Triangle ABC is congruent to triangle DEF because a translation is a rigid transformation.</p>",
            "p02_wrong": "The figures look the same, so they are congruent.",
            "p02_right": "A rigid transformation maps one figure exactly onto the other, so the figures are congruent.",
            "p03_title": "Writing Rigid-Motion Justifications",
            "p03_focus": "<p>A strong justification names the rigid transformation and explains that corresponding parts are preserved.</p><ul style='padding-left: 26px;'><li>A translation maps triangle ABC onto triangle DEF.</li><li>Translations preserve distance and angle measure.</li><li>Therefore, triangle ABC &cong; triangle DEF.</li></ul>",
            "p03_vocab": "<ul style='padding-left: 26px;'><li>Matching corresponding side lengths.</li><li>Matching corresponding angle measures.</li><li>A described translation, reflection, rotation, or sequence of rigid motions.</li><li>A final image that lands exactly on the target figure.</li></ul>",
            "p03_example": "<p>A reflection across line m maps quadrilateral PQRS onto quadrilateral WXYZ.</p><p><strong>Justification:</strong> Reflection is a rigid transformation, so side lengths and angle measures are preserved. Since the reflected image matches the second quadrilateral exactly, PQRS &cong; WXYZ.</p>",
            "p03_wrong": "The figures are congruent because one is rotated.",
            "p03_right": "The figures are congruent because a rotation maps one figure exactly onto the other and preserves distance and angle measure.",
            "examples": [
                ("Example 1: Congruence by Translation", "Triangle ABC is translated 4 units right and 2 units down to land exactly on triangle DEF.<br><strong>Conclusion:</strong> Triangle ABC &cong; triangle DEF because translation is a rigid transformation."),
                ("Example 2: Congruence by Reflection", "Quadrilateral JKLM reflects across the y-axis and lands exactly on quadrilateral PQRS.<br><strong>Conclusion:</strong> JKLM &cong; PQRS because reflection preserves distance and angle measure."),
                ("Example 3: Congruence by Rotation", "Triangle RST rotates 90&deg; clockwise about the origin and lands exactly on triangle XYZ.<br><strong>Conclusion:</strong> RST &cong; XYZ because rotation is a rigid transformation."),
                ("Example 4: Congruence by a Sequence", "A figure is reflected across the x-axis and then translated 3 units left. The final image lands exactly on a second figure.<br><strong>Conclusion:</strong> The figures are congruent because both steps are rigid transformations."),
            ],
            "error_wrong": "A dilation with scale factor 2 proves congruence.",
            "error_right": "A dilation with scale factor 2 changes distance, so it does not prove congruence.",
            "gp_desc": "Complete the guided practice questions in Moodle. Use rigid-motion evidence to justify congruence.",
            "gp_preview": "The guided practice checks whether you can identify the rigid transformation that maps one figure onto another and explain why the figures are congruent.",
            "gp_sample_q": "A rotation maps triangle ABC exactly onto triangle DEF. What conclusion is supported?",
            "gp_sample_a": "Triangle ABC &cong; triangle DEF.",
            "checkpoint": "Submit a checkpoint response that explains why two figures are congruent using a rigid transformation or sequence of rigid transformations.",
            "criteria": "<ul style='padding-left: 26px;'><li>The transformation is identified correctly.</li><li>The explanation states that rigid transformations preserve distance and angle measure.</li><li>The congruence conclusion uses correct corresponding-figure language.</li></ul>",
        },
        "06": {
            "folder": "GEOMETRY/Units/Unit 02/Lesson 06",
            "lesson_title": "Lesson 6: Triangle Congruence Criteria (SSS, SAS, ASA, AAS, HL)",
            "intro": "In this lesson, you will use valid triangle congruence criteria and connect them to rigid transformations.",
            "standards": "<p><strong>MLA.GEO.TRI.1:</strong> I can prove triangle congruence or similarity using valid triangle criteria.</p><p><strong>MLA.GEO.TRI.3:</strong> I can justify triangle congruence criteria using rigid transformations.</p>",
            "learn": "<ul style='padding-left: 26px;'><li>How SSS, SAS, ASA, AAS, and HL establish triangle congruence.</li><li>Why AAA and SSA are not valid triangle congruence criteria.</li><li>How rigid transformations support triangle congruence criteria.</li></ul>",
            "do": "<ul style='padding-left: 26px;'><li>Match diagram evidence to a valid congruence criterion.</li><li>Identify missing information needed for triangle congruence.</li><li>Write short explanations connecting criteria to rigid motion.</li></ul>",
            "mastery": "<ul style='padding-left: 26px;'><li>Complete notebook evidence on triangle congruence criteria.</li><li>Submit checkpoint work selecting and justifying congruence criteria.</li><li>Demonstrate at least 80% mastery on the lesson quiz or complete Teacher of Record intervention before another randomized attempt is released.</li></ul>",
            "connection": "<p><strong>MLA.GEO.TRI.1 and MLA.GEO.TRI.3:</strong> These standards ask you to decide when limited triangle information is enough to prove congruence and to explain why using rigid-motion reasoning.</p><p>In student language: <strong>I can choose a valid triangle congruence criterion and explain why it proves the triangles are congruent.</strong></p>",
            "p02_title": "Triangle Congruence Criteria",
            "p02_focus": "<p>Triangle congruence criteria are shortcuts that prove two triangles are congruent without checking all six corresponding parts.</p><ul style='padding-left: 26px;'><li><strong>SSS:</strong> three pairs of corresponding sides.</li><li><strong>SAS:</strong> two sides and the included angle.</li><li><strong>ASA:</strong> two angles and the included side.</li><li><strong>AAS:</strong> two angles and a non-included side.</li><li><strong>HL:</strong> hypotenuse and one leg in right triangles.</li></ul>",
            "p02_vocab": "<ul style='padding-left: 26px;'><li><strong>Included angle:</strong> the angle between two given sides.</li><li><strong>Included side:</strong> the side between two given angles.</li><li><strong>Hypotenuse:</strong> the side opposite the right angle in a right triangle.</li><li><strong>Leg:</strong> one of the two sides that form the right angle.</li></ul>",
            "p02_example": "<p>If AB &cong; DE, BC &cong; EF, and AC &cong; DF, then triangle ABC &cong; triangle DEF by SSS.</p>",
            "p02_wrong": "SSA always proves triangle congruence.",
            "p02_right": "SSA is not a valid triangle congruence criterion.",
            "p03_title": "Why the Criteria Work",
            "p03_focus": "<p>A valid triangle congruence criterion gives enough information to guarantee that one triangle can be moved by rigid transformations to match the other triangle exactly.</p><p>Rigid transformations preserve side lengths and angle measures, so the final matched triangles are congruent.</p>",
            "p03_vocab": "<ul style='padding-left: 26px;'><li><strong>AAA:</strong> shows same shape but not necessarily same size.</li><li><strong>SSA:</strong> may create more than one possible triangle.</li></ul>",
            "p03_example": "<p>If two triangles have two corresponding angles and the included side congruent, ASA proves the triangles are congruent.</p><p>A rigid motion can align the included side and angles, forcing the remaining parts to match.</p>",
            "p03_wrong": "AAA proves triangle congruence.",
            "p03_right": "AAA proves similarity information, not necessarily congruence.",
            "examples": [
                ("Example 1: SSS", "AB &cong; DE, BC &cong; EF, and AC &cong; DF.<br><strong>Conclusion:</strong> Triangle ABC &cong; triangle DEF by SSS."),
                ("Example 2: SAS", "AB &cong; DE, angle B &cong; angle E, and BC &cong; EF. The angle is included between the two sides.<br><strong>Conclusion:</strong> Triangle ABC &cong; triangle DEF by SAS."),
                ("Example 3: ASA and AAS", "ASA uses two angles and the included side. AAS uses two angles and a non-included side.<br><strong>Conclusion:</strong> Both ASA and AAS can prove triangle congruence."),
                ("Example 4: HL", "Two right triangles have congruent hypotenuses and one pair of congruent legs.<br><strong>Conclusion:</strong> The right triangles are congruent by HL."),
            ],
            "error_wrong": "Two sides and any angle prove SAS.",
            "error_right": "SAS requires the included angle between the two sides.",
            "gp_desc": "Complete the guided practice questions in Moodle. Match evidence to valid triangle congruence criteria.",
            "gp_preview": "The guided practice checks whether you can select SSS, SAS, ASA, AAS, or HL from given triangle evidence.",
            "gp_sample_q": "Two right triangles have congruent hypotenuses and one pair of congruent legs. Which criterion applies?",
            "gp_sample_a": "HL.",
            "checkpoint": "Submit a checkpoint response that identifies the valid congruence criterion from a triangle diagram or description and explains why it proves congruence.",
            "criteria": "<ul style='padding-left: 26px;'><li>The selected criterion matches the given evidence.</li><li>The explanation identifies corresponding parts accurately.</li><li>The justification connects the criterion to congruence through rigid transformations.</li></ul>",
        },
    }

    for lesson, d in lessons.items():
        folder = d["folder"]
        write(f"{folder}/P01.html", header(lesson) + band("#e8f4ff", "#2563eb", "P01 Lesson Overview") + title_card(f"<p><strong>{d['lesson_title']}</strong></p><p>{d['intro']}</p>") + card("Standards Covered in This Lesson", d["standards"], "#f8fafc", "#64748b") + card("What You Will Learn", d["learn"], "#ecfdf5", "#059669") + card("What You Will Do", d["do"], "#fff7ed", "#ea580c") + card("How You Will Show Mastery", d["mastery"], "#fef2f2", "#dc2626") + card("Student-Friendly Standard Connection", d["connection"], "#f5f3ff", "#7c3aed"))
        write(f"{folder}/P02.html", header(lesson) + band("#eef2ff", "#4f46e5", "P02 Notebook Task &ndash; Part 1", "Write all notes, vocabulary, examples, and explanations from this page into your notebook exactly as shown.") + title_card(f"<p><strong>{d['p02_title']}</strong></p>", "Notebook Title") + card("Notebook Focus", d["p02_focus"], "#ecfdf5", "#059669") + card("Vocabulary", d["p02_vocab"], "#f8fafc", "#64748b") + card("Example", d["p02_example"], "#fff7ed", "#ea580c") + card("Common Mistake to Avoid", f"<p><strong style='color: #b91c1c;'>Incorrect:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #b91c1c;'>{d['p02_wrong']}</p><p><strong style='color: #047857;'>Correct:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #047857;'>{d['p02_right']}</p>", "#fef2f2", "#dc2626"))
        write(f"{folder}/P03.html", header(lesson) + band("#eef2ff", "#4f46e5", "P03 Notebook Task &ndash; Part 2", "Continue your notebook notes. Focus on writing evidence-based explanations.") + title_card(f"<p><strong>{d['p03_title']}</strong></p>", "Notebook Title") + card("Notebook Focus", d["p03_focus"], "#ecfdf5", "#059669") + card("Key Notes", d["p03_vocab"], "#f8fafc", "#64748b") + card("Example", d["p03_example"], "#fff7ed", "#ea580c") + card("Common Mistake to Avoid", f"<p><strong style='color: #b91c1c;'>Incorrect:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #b91c1c;'>{d['p03_wrong']}</p><p><strong style='color: #047857;'>Correct:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #047857;'>{d['p03_right']}</p>", "#fef2f2", "#dc2626"))
        examples = "".join(card(t, f"<p>{b}</p>", bg, br) for (t, b), bg, br in zip(d["examples"], ["#ecfdf5", "#fff7ed", "#f8fafc", "#f5f3ff"], ["#059669", "#ea580c", "#64748b", "#7c3aed"]))
        write(f"{folder}/P04.html", header(lesson) + band("#f0fdf4", "#16a34a", "P04 Concept Development / Worked Examples") + examples + card("Error Check", f"<p><strong style='color: #b91c1c;'>Incorrect:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #b91c1c;'>{d['error_wrong']}</p><p><strong style='color: #047857;'>Correct:</strong></p><p style='font-size: 26px; font-weight: 600; line-height: 1.6; color: #047857;'>{d['error_right']}</p>", "#fef2f2", "#dc2626"))
        write(f"{folder}/P05.html", header(lesson) + band("#ecfdf5", "#059669", "P05 Guided Practice", d["gp_desc"]) + card("Guided Practice Preview", f"<p>{d['gp_preview']}</p>", "#ecfdf5", "#059669") + card("Sample Practice Item", f"<p><strong>Question:</strong> {d['gp_sample_q']}</p><p><strong style='color: #047857;'>Correct:</strong> {d['gp_sample_a']}</p>", "#fff7ed", "#ea580c") + card("Before You Submit", "<ul style='padding-left: 26px;'><li>Read the diagram or description carefully.</li><li>Match the evidence to the correct lesson concept.</li><li>Use the standard language from your notebook.</li></ul>", "#fef2f2", "#dc2626"))
        write(f"{folder}/P06.html", header(lesson) + band("#fff7ed", "#ea580c", "P06 Notebook Evidence Submission", "Submit clear notebook evidence showing the lesson vocabulary, examples, and explanations.") + card("Notebook Evidence Checklist", "<ul style='padding-left: 26px;'><li>Complete vocabulary notes.</li><li>Worked examples from the lesson.</li><li>Common mistake correction in red and green.</li><li>A short explanation connecting the examples to the lesson standard.</li></ul>", "#ecfdf5", "#059669") + card("Evidence Quality", "<p>Strong notebook evidence shows complete mathematical sentences and enough detail for another person to follow the reasoning.</p>", "#fff7ed", "#ea580c"))
        write(f"{folder}/P07.html", header(lesson) + band("#fef2f2", "#dc2626", "P07 Checkpoint Submission") + card("Checkpoint Task", f"<p>{d['checkpoint']}</p>", "#ecfdf5", "#059669") + card("Mastery Criteria", d["criteria"] + "<p><strong>Mastery workflow:</strong> Notebook Evidence &rarr; Checkpoint Submission &rarr; Lesson Quiz</p>", "#fef2f2", "#dc2626"))


def build_json():
    configs = [
        ("05", "Justifying Congruence with Rigid Transformations", [{"code": "MLA.GEO.CGM.6", "description": "I can use rigid transformations to justify that two figures are congruent."}]),
        ("06", "Triangle Congruence Criteria (SSS, SAS, ASA, AAS, HL)", [{"code": "MLA.GEO.TRI.1", "description": "I can prove triangle congruence or similarity using valid triangle criteria."}, {"code": "MLA.GEO.TRI.3", "description": "I can justify triangle congruence criteria using rigid transformations."}]),
    ]
    for lesson, title, standards in configs:
        folder = f"GEOMETRY/Units/Unit 02/Lesson {lesson}"
        lesson_json = {
            "course": "GEO", "unit": "Unit 02", "lesson": f"Lesson {lesson}", "title": title,
            "primaryStandards": standards, "assessment": "Quiz", "masteryThreshold": 80,
            "pages": [{"id": f"P{i:02}", "title": t, "file": f"P{i:02}.html"} for i, t in enumerate(["Lesson Overview", "Notebook Task - Part 1", "Notebook Task - Part 2", "Concept Development / Worked Examples", "Guided Practice", "Notebook Evidence Submission", "Checkpoint Submission"], 1)],
            "quiz": {"file": f"GEO_U02_L{lesson}_Quiz.gift", "questionsPerAttempt": 5, "bankSize": 25, "attemptPolicy": "one_attempt_then_TOR_intervention_if_below_80", "questionBank": True, "randomizedRetakeRequired": True},
            "guidedPractice": {"file": f"GEO_U02_L{lesson}_GuidedPractice.gift", "questionCount": 5, "graded": False, "feedback": "immediate"}
        }
        quiz_json = {
            "course": "GEO", "unit": "Unit 02", "lesson": f"Lesson {lesson}", "title": f"{title} Quiz",
            "standards": standards, "giftFile": f"GEO_U02_L{lesson}_Quiz.gift", "questionCount": 25,
            "questionType": "multiple_choice", "choicesPerQuestion": 4, "masteryThreshold": 80
        }
        if len(standards) == 1:
            quiz_json["standard"] = standards[0]
            quiz_json.pop("standards")
        write(f"{folder}/lesson.json", json.dumps(lesson_json, indent=2))
        write(f"{folder}/quiz.json", json.dumps(quiz_json, indent=2))


def build_assessments():
    l5_gp = [
        ("GEO_U02_L05_GP_Q01", "MLA.GEO.CGM.6", "A translation maps triangle ABC exactly onto triangle DEF. What conclusion is supported?", ["Triangle ABC &cong; triangle DEF", "Triangle ABC is similar but not congruent to triangle DEF", "Triangle ABC has larger side lengths than triangle DEF", "No conclusion can be made from a translation"], 0),
        ("GEO_U02_L05_GP_Q02", "MLA.GEO.CGM.6", "Which transformation can be used to justify congruence?", ["Dilation with scale factor 3", "Translation 4 units right", "Vertical stretch by factor 2", "Horizontal compression"], 1),
        ("GEO_U02_L05_GP_Q03", "MLA.GEO.CGM.6", "A reflection maps quadrilateral JKLM onto quadrilateral PQRS. Why are the figures congruent?", ["Reflection preserves distance and angle measure", "Reflection changes every side length", "Reflection proves only similarity", "Reflection changes the number of vertices"], 0),
        ("GEO_U02_L05_GP_Q04", "MLA.GEO.CGM.6", "Which statement is the best congruence justification?", ["The figures look equal in the diagram", "A rotation maps one figure exactly onto the other", "The figures are near each other on the coordinate plane", "The figures have the same color"], 1),
        ("GEO_U02_L05_GP_Q05", "MLA.GEO.CGM.6", "A figure is reflected and then translated. The final image lands exactly on another figure. What can be concluded?", ["The figures are congruent", "The figures must be different sizes", "Only the angles changed", "The sequence was non-rigid"], 0),
    ]
    l6_gp = [
        ("GEO_U02_L06_GP_Q01", "MLA.GEO.TRI.1", "Two triangles have three pairs of corresponding sides congruent. Which criterion proves congruence?", ["SSS", "SAS", "ASA", "HL"], 0),
        ("GEO_U02_L06_GP_Q02", "MLA.GEO.TRI.1", "Two sides and the included angle of one triangle are congruent to the corresponding parts of another triangle. Which criterion applies?", ["SSA", "AAS", "SAS", "AAA"], 2),
        ("GEO_U02_L06_GP_Q03", "MLA.GEO.TRI.1", "Two right triangles have congruent hypotenuses and one pair of congruent legs. Which criterion applies?", ["HL", "SSS", "ASA", "AAA"], 0),
        ("GEO_U02_L06_GP_Q04", "MLA.GEO.TRI.3", "Why can valid triangle congruence criteria be connected to rigid transformations?", ["Rigid transformations preserve side lengths and angle measures", "Rigid transformations stretch triangles to match", "Rigid transformations prove only similarity", "Rigid transformations change corresponding parts"], 0),
        ("GEO_U02_L06_GP_Q05", "MLA.GEO.TRI.1", "Which information is not enough to prove triangle congruence?", ["SSS", "SAS", "AAA", "ASA"], 2),
    ]
    def gp_items(rows, correct_msg, wrong_msg):
        return [{"id": r[0], "std": r[1], "q": r[2], "choices": r[3], "correct": r[4], "fb": feedbacks(r[4], correct_msg, wrong_msg)} for r in rows]
    write("GEOMETRY/Units/Unit 02/Lesson 05/GEO_U02_L05_GuidedPractice.gift", make_gift(gp_items(l5_gp, "Correct. This uses rigid-transformation evidence to justify congruence.", "This choice does not use the rigid-motion congruence concept correctly. Recheck whether distance and angle measure are preserved.")))
    write("GEOMETRY/Units/Unit 02/Lesson 06/GEO_U02_L06_GuidedPractice.gift", make_gift(gp_items(l6_gp, "Correct. This matches the triangle congruence criterion or rigid-motion justification from the lesson.", "This choice does not match the given triangle evidence. Recheck sides, angles, and whether the criterion is valid.")))

    l5_q = [
        ("Which transformation is rigid?", ["A translation", "A dilation with scale factor 2", "A vertical stretch", "A horizontal compression"], 0),
        ("A rotation maps figure A exactly onto figure B. What conclusion is supported?", ["Figure A is larger than figure B", "Figure A &cong; figure B", "Figure A is only similar to figure B", "Figure A has changed angle measures"], 1),
        ("Which evidence best justifies congruence?", ["The figures look close in size", "The figures are drawn in the same color", "A reflection maps one figure exactly onto the other", "One figure appears above the other"], 2),
        ("Why does a translation support congruence?", ["It changes side lengths", "It changes angle measures", "It makes a figure similar only", "It preserves distance and angle measure"], 3),
        ("A dilation with scale factor 3 maps one figure to another. What should you conclude?", ["This does not justify congruence", "The figures are congruent by rigid motion", "The figures have equal side lengths", "The transformation is rigid"], 0),
        ("A reflection followed by a rotation maps triangle ABC onto triangle DEF. What is true?", ["Only the angles changed", "Triangle ABC &cong; triangle DEF", "Triangle DEF is larger", "The sequence is non-rigid"], 1),
        ("Which phrase belongs in a congruence justification?", ["because it looks the same", "because it has matching color", "because a rigid transformation maps one figure onto the other", "because the figure moved somewhere else"], 2),
        ("If one figure can be translated onto another, what is preserved?", ["Only orientation", "Only location", "Only color", "Distance and angle measure"], 3),
        ("Which sequence can justify congruence?", ["Reflect, then translate", "Dilate by 2, then translate", "Stretch vertically, then rotate", "Compress horizontally, then reflect"], 0),
        ("A student says two figures are congruent because they look alike. What is missing?", ["Transformation evidence", "A color label", "A larger diagram", "A similarity statement only"], 0),
        ("A rotation is used in a congruence proof because it is what type of transformation?", ["Non-rigid", "Rigid", "Dilation", "Scale change"], 1),
        ("Which transformation does not preserve distance?", ["Reflection", "Translation", "Dilation with scale factor 2", "Rotation"], 2),
        ("A rigid motion maps quadrilateral ABCD onto quadrilateral WXYZ. Which conclusion is valid?", ["ABCD &cong; WXYZ", "ABCD is larger than WXYZ", "Only one pair of sides is equal", "No corresponding parts match"], 0),
        ("What does it mean for one figure to map onto another?", ["It lands exactly on the other figure", "It changes into any nearby figure", "It becomes a different size", "It loses corresponding vertices"], 0),
        ("Which is not mathematical evidence for congruence?", ["A translation rule", "A matching rigid-motion sequence", "A statement that figures look congruent", "A rotation mapping one figure onto another"], 2),
        ("A figure is rotated 180 degrees and lands exactly on another figure. Why are the figures congruent?", ["Rotation changes all distances", "Rotation is rigid and preserves the figure", "Rotation creates only similarity", "Rotation changes the number of sides"], 1),
        ("A sequence includes a reflection and a dilation with scale factor 1.5. Can this sequence justify congruence?", ["Yes, because every transformation proves congruence", "Yes, because reflection is included", "No, because the dilation changes distance", "No, because reflection changes angle measure"], 2),
        ("If triangle ABC &cong; triangle DEF by rigid motion, what must be true?", ["Corresponding sides and angles match", "The triangles have different sizes", "Only one vertex matches", "The triangles are unrelated"], 0),
        ("Which statement correctly uses rigid transformation language?", ["A stretch maps one congruent figure to another", "A rotation maps triangle ABC exactly onto triangle DEF, so the triangles are congruent", "The figures are congruent because they are both triangles", "A dilation by 4 proves congruence"], 1),
        ("A translation maps A to A prime, B to B prime, and C to C prime. What does this preserve in triangle ABC?", ["Side lengths and angle measures", "Only x-coordinates", "Only y-coordinates", "Only the names of the vertices"], 0),
        ("Which pair lists only rigid transformations?", ["Translation and reflection", "Dilation and stretch", "Compression and dilation", "Stretch and reflection"], 0),
        ("Why is a reflection a valid step in a congruence justification?", ["It preserves distance even though orientation may change", "It doubles side lengths", "It changes every angle measure", "It removes corresponding parts"], 0),
        ("A student claims a dilation proves congruence because the shape stays the same. What is the correction?", ["Congruence also requires same size, so a dilation with scale factor not 1 is not enough", "Shape is never relevant", "Dilation is always rigid", "Only color matters for congruence"], 0),
        ("What should a complete congruence justification include?", ["A named rigid transformation and a congruence conclusion", "Only a drawing", "Only the word congruent", "Only one side length"], 0),
        ("If no rigid transformation maps one figure exactly onto another, what cannot be justified from that evidence?", ["Congruence by rigid motion", "The number of vertices", "The figure names", "The coordinate plane location"], 0),
    ]
    l6_q = [
        ("Which criterion uses three pairs of corresponding sides?", ["SSS", "SAS", "ASA", "HL"], 0, "MLA.GEO.TRI.1"),
        ("Which criterion uses two sides and the included angle?", ["SSA", "SAS", "AAA", "AAS"], 1, "MLA.GEO.TRI.1"),
        ("Which criterion applies only to right triangles?", ["ASA", "SSS", "HL", "AAA"], 2, "MLA.GEO.TRI.1"),
        ("Which information is not enough to prove triangle congruence?", ["SSS", "SAS", "ASA", "AAA"], 3, "MLA.GEO.TRI.1"),
        ("Two angles and the included side are congruent. Which criterion applies?", ["ASA", "AAS", "SAS", "HL"], 0, "MLA.GEO.TRI.1"),
        ("Two angles and a non-included side are congruent. Which criterion applies?", ["SSS", "AAS", "SSA", "HL"], 1, "MLA.GEO.TRI.1"),
        ("Two right triangles have congruent hypotenuses and one congruent leg. Which criterion applies?", ["SAS", "ASA", "HL", "AAA"], 2, "MLA.GEO.TRI.1"),
        ("Which is not a valid triangle congruence criterion in this lesson?", ["SSS", "SAS", "AAS", "SSA"], 3, "MLA.GEO.TRI.1"),
        ("If AB &cong; DE, BC &cong; EF, and AC &cong; DF, which criterion proves triangle congruence?", ["SSS", "SAS", "ASA", "HL"], 0, "MLA.GEO.TRI.1"),
        ("If two sides and the angle between them are marked congruent, which criterion should be used?", ["AAS", "SAS", "SSA", "AAA"], 1, "MLA.GEO.TRI.1"),
        ("If two angles and the side between them are marked congruent, which criterion should be used?", ["SSS", "HL", "ASA", "SSA"], 2, "MLA.GEO.TRI.1"),
        ("Why do valid congruence criteria prove congruence?", ["They change side lengths", "They create similar triangles only", "They ignore corresponding parts", "They give enough information for a rigid motion to match the triangles"], 3, "MLA.GEO.TRI.3"),
        ("Which criterion requires a right angle?", ["HL", "SSS", "ASA", "AAS"], 0, "MLA.GEO.TRI.1"),
        ("Which criterion uses two sides but must include the angle between them?", ["AAA", "SAS", "AAS", "HL"], 1, "MLA.GEO.TRI.1"),
        ("Which criterion uses two angles and one side that is not between the angles?", ["ASA", "SSS", "AAS", "SAS"], 2, "MLA.GEO.TRI.1"),
        ("Rigid transformations are important in triangle congruence because they preserve what?", ["Only location", "Only orientation", "Only color", "Side lengths and angle measures"], 3, "MLA.GEO.TRI.3"),
        ("A triangle pair has only three matching angles. What can be concluded about congruence?", ["AAA is not enough to prove congruence", "AAA proves SSS", "AAA proves HL", "AAA proves SAS"], 0, "MLA.GEO.TRI.1"),
        ("Which evidence best supports HL?", ["Two acute angles only", "Right triangles with congruent hypotenuse and one leg", "Three angles only", "Two non-included sides and an angle"], 1, "MLA.GEO.TRI.1"),
        ("Which evidence best supports SSS?", ["Two angles and a side", "Two sides and a non-included angle", "Three corresponding sides", "One side and one angle"], 2, "MLA.GEO.TRI.1"),
        ("What does a rigid-motion justification explain after a criterion is identified?", ["Why the diagram has color", "Why one triangle can be moved to match the other", "Why the triangles must be enlarged", "Why the labels can be ignored"], 1, "MLA.GEO.TRI.3"),
        ("Which statement about SAS is correct?", ["The angle must be included between the two sides", "Any angle can be used", "SAS is never valid", "SAS works only for right triangles"], 0, "MLA.GEO.TRI.1"),
        ("Which statement about ASA is correct?", ["It uses three sides", "It uses two angles and the included side", "It uses a hypotenuse and a leg", "It uses two sides and any angle"], 1, "MLA.GEO.TRI.1"),
        ("Which statement best describes why SSA is not used as a congruence criterion here?", ["It always gives three sides", "It is the same as HL", "It may not determine one unique triangle", "It proves congruence for every triangle"], 2, "MLA.GEO.TRI.1"),
        ("A valid criterion supports congruence because corresponding parts force a triangle that can match by rigid motion. Which standard idea is this?", ["Readiness only", "Coordinate midpoint only", "Similarity by dilation only", "Rigid-transformation justification"], 3, "MLA.GEO.TRI.3"),
        ("Which list contains only valid triangle congruence criteria?", ["SSS, SAS, ASA, AAS, HL", "AAA, SSA, SSS, SAS, HL", "SSS, AAA, ASA, SSA, HL", "Dilation, stretch, SSS, ASA, AAA"], 0, "MLA.GEO.TRI.1"),
    ]
    l5_items = []
    for i, (q, choices, correct) in enumerate(l5_q, 1):
        l5_items.append({"id": f"GEO_U02_L05_Q{i:02}", "std": "MLA.GEO.CGM.6", "q": q, "choices": choices, "correct": correct, "fb": feedbacks(correct, "Correct. This uses rigid-transformation evidence to justify congruence without changing size or shape.", "This choice does not use the lesson concept correctly. Congruence must be justified with a rigid transformation that preserves distance and angle measure.")})
    l6_items = []
    for i, (q, choices, correct, std) in enumerate(l6_q, 1):
        l6_items.append({"id": f"GEO_U02_L06_Q{i:02}", "std": std, "q": q, "choices": choices, "correct": correct, "fb": feedbacks(correct, "Correct. This matches the triangle congruence criterion or rigid-motion justification from the lesson.", "This choice does not match the given triangle evidence. Recheck the required corresponding sides, angles, and whether the criterion is valid.")})
    write("GEOMETRY/Units/Unit 02/Lesson 05/GEO_U02_L05_Quiz.gift", make_gift(l5_items))
    write("GEOMETRY/Units/Unit 02/Lesson 06/GEO_U02_L06_Quiz.gift", make_gift(l6_items))


build_pages()
build_json()
build_assessments()
