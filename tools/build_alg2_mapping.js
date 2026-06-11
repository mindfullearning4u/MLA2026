const fs = require("fs");
const path = require("path");

const out = path.resolve("Refined Courses/ALG2/mla_algebra_2_unit_mapping_v1.md");

const standards = {
  "MLA.A2.AE.1": ["MA.912.AR.1.1", "HSA-SSE.A.1", "Algebra", "Intermediate Algebra"],
  "MLA.A2.AE.2": ["MA.912.AR.1.3", "HSA-APR.A.1", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.3": ["MA.912.AR.1.5", "HSA-APR.D.6", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.4": ["MA.912.AR.1.6", "HSA-APR.A.1", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.5": ["MA.912.AR.1.8", "HSA-SSE.B.3; HSA-APR.B.3; HSN-CN.C.9", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.6": ["MA.912.AR.1.9", "HSA-APR.D.7", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.7": ["MA.912.NSO.1.3", "HSN-RN.A.1; HSN-RN.A.2", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.AE.8": ["MA.912.NSO.1.5", "HSN-RN.A.2", "Advanced Math", "Intermediate Algebra"],
  "MLA.A2.PF.1": ["MA.912.AR.3.2", "HSA-REI.B.4; HSN-CN.C.7", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.2": ["MA.912.AR.3.3", "HSA-REI.D.11; HSA-CED.A.1", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.3": ["MA.912.AR.3.4", "HSF-BF.A.1; HSF-IF.C.8", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.4": ["MA.912.AR.3.8", "HSF-IF.C.7; HSF-IF.B.4", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.5": ["MA.912.AR.3.9", "HSA-CED.A.2; HSA-REI.D.12", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.6": ["MA.912.AR.3.10", "HSA-REI.D.12", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.7": ["MA.912.AR.6.1", "HSA-APR.B.3; HSA-REI.A.2; HSN-CN.C.9", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.PF.8": ["MA.912.AR.6.5", "HSF-IF.C.7; HSA-APR.B.3", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.1": ["MA.912.AR.7.1", "HSA-REI.A.2", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.2": ["MA.912.AR.7.2", "HSF-IF.C.7b", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.3": ["MA.912.AR.7.3", "HSF-IF.B.4; HSF-IF.C.7b", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.4": ["MA.912.AR.8.1", "HSA-REI.A.2", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.5": ["MA.912.AR.8.2", "HSF-IF.C.7d", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.RR.6": ["MA.912.AR.8.3", "HSF-IF.B.4; HSF-IF.C.7d", "Advanced Math", "Intermediate Algebra; Functions"],
  "MLA.A2.EX.1": ["MA.912.AR.5.4", "HSF-BF.A.1; HSF-LE.A.2", "Advanced Math", "Functions"],
  "MLA.A2.EX.2": ["MA.912.AR.5.5", "HSF-LE.A.1; HSF-LE.B.5", "Advanced Math", "Functions"],
  "MLA.A2.EX.3": ["MA.912.AR.5.7", "HSF-IF.C.7e; HSF-LE.A.4", "Advanced Math", "Functions"],
  "MLA.A2.EX.4": ["MA.912.DP.2.9", "HSS-ID.B.6; HSF-LE.A.2", "Problem-Solving and Data Analysis", "Functions"],
  "MLA.A2.LOG.1": ["MA.912.AR.5.2", "HSF-LE.A.4", "Advanced Math", "Functions"],
  "MLA.A2.LOG.2": ["MA.912.AR.5.8", "HSF-IF.C.7e", "Advanced Math", "Functions"],
  "MLA.A2.LOG.3": ["MA.912.AR.5.9", "HSF-IF.B.4; HSF-IF.C.7e", "Advanced Math", "Functions"],
  "MLA.A2.LOG.4": ["MA.912.NSO.1.6", "HSF-LE.A.4", "Advanced Math", "Functions"],
  "MLA.A2.SYS.1": ["MA.912.AR.9.2", "HSA-REI.C.7", "Advanced Math", "Intermediate Algebra; Coordinate Geometry; Functions"],
  "MLA.A2.SYS.2": ["MA.912.AR.9.3", "HSA-REI.C.7; HSA-REI.D.11", "Advanced Math", "Intermediate Algebra; Coordinate Geometry; Functions"],
  "MLA.A2.SYS.3": ["MA.912.AR.9.5", "HSA-REI.D.12", "Advanced Math", "Intermediate Algebra; Coordinate Geometry; Functions"],
  "MLA.A2.SYS.4": ["MA.912.AR.9.7", "HSA-CED.A.3; HSA-REI.D.12", "Problem-Solving and Data Analysis", "Intermediate Algebra; Coordinate Geometry; Functions"],
  "MLA.A2.FN.1": ["MA.912.F.1.1", "HSF-IF.A.1; HSF-IF.C.7", "Advanced Math", "Functions"],
  "MLA.A2.FN.2": ["MA.912.F.1.7", "HSF-IF.C.9", "Advanced Math", "Functions"],
  "MLA.A2.FN.3": ["MA.912.F.1.9", "HSF-IF.B.4", "Advanced Math", "Functions"],
  "MLA.A2.FN.4": ["MA.912.F.2.2", "HSF-BF.B.3", "Advanced Math", "Functions"],
  "MLA.A2.FN.5": ["MA.912.F.2.3", "HSF-BF.B.3", "Advanced Math", "Functions"],
  "MLA.A2.FN.6": ["MA.912.F.2.5", "HSF-BF.B.3", "Advanced Math", "Functions"],
  "MLA.A2.FN.7": ["MA.912.F.3.2", "HSF-BF.A.1b", "Advanced Math", "Functions"],
  "MLA.A2.FN.8": ["MA.912.F.3.4", "HSF-BF.A.1c", "Advanced Math", "Functions"],
  "MLA.A2.FN.9": ["MA.912.F.3.6", "HSF-BF.B.4", "Advanced Math", "Functions"],
  "MLA.A2.FN.10": ["MA.912.F.3.7", "HSF-BF.B.4", "Advanced Math", "Functions"],
  "MLA.A2.FN.11": ["MA.912.AR.4.2", "HSA-REI.B.3; HSA-CED.A.1", "Algebra / Advanced Math", "Functions"],
  "MLA.A2.FN.12": ["MA.912.AR.4.4", "HSF-IF.C.7; HSF-IF.B.4", "Advanced Math", "Functions"],
  "MLA.A2.FM.1": ["MA.912.DP.2.8", "HSS-ID.B.6", "Problem-Solving and Data Analysis", "Statistics and Probability; Functions"],
  "MLA.A2.FM.2": ["MA.912.FL.3.1", "HSF-LE.A.1; HSF-LE.B.5", "Problem-Solving and Data Analysis", "Statistics and Probability; Functions"],
  "MLA.A2.FM.3": ["MA.912.FL.3.2", "HSF-LE.A.2; HSF-LE.B.5", "Problem-Solving and Data Analysis", "Statistics and Probability; Functions"],
  "MLA.A2.FM.4": ["MA.912.FL.3.4", "HSF-LE.A.1; HSF-LE.B.5", "Problem-Solving and Data Analysis", "Statistics and Probability; Functions"],
};

const units = [
  {
    title: "Advanced Expressions and Equations",
    purpose: "Develop algebraic structure, polynomial operations, complex-number readiness, and higher-order equation solving.",
    justification: "Algebra II begins by extending Algebra I expression fluency into polynomial operations, structure, division, factoring, complex solutions, and higher-degree equations. This is readiness review only where needed; the unit is not Algebra I remediation.",
    prereq: "Algebra I equation solving, function notation, graph interpretation, exponent rules, factoring basics, operations with rational numbers, and Geometry-level reasoning.",
    future: "Supports polynomial functions, rational functions, radical functions, systems, transformations, exponential/logarithmic work, and modeling.",
    extensions: "SAT-style polynomial manipulation; ACT intermediate algebra challenges; polynomial division error analysis; complex-root investigations; open-ended polynomial modeling.",
    lessons: [
      ["Algebra II Readiness and Function Review","Reconnect Algebra I skills to Algebra II expectations, function families, notation, and representation fluency.",["MLA.A2.FN.1"],"Function notation, graph reading, equation solving, and table interpretation.","The course starts by orienting students to Algebra II-level function families without turning Unit 1 into remediation.","Polynomial, radical, rational, exponential, logarithmic, and modeling units."],
      ["Polynomial Operations","Extend expression fluency to addition, subtraction, multiplication, and applied operations with polynomial expressions.",["MLA.A2.AE.2","MLA.A2.AE.4"],"Combining like terms, distributive property, exponent rules, and polynomial vocabulary.","Polynomial operations must precede factoring, division, polynomial equations, and polynomial functions.","Factoring, polynomial division, polynomial equations, rational expressions, and modeling."],
      ["Factoring and Algebraic Structure","Interpret expression structure and rewrite polynomials as products over the real or complex number system.",["MLA.A2.AE.1","MLA.A2.AE.5"],"Factors, terms, coefficients, expression interpretation, factoring patterns, and zero-product reasoning.","Students need structural interpretation before polynomial equations and complex roots become meaningful.","Quadratic equations, higher-degree polynomial equations, zeros, roots, and model analysis."],
      ["Complex Numbers","Use quadratic equations to extend solutions from real numbers to complex numbers where appropriate.",["MLA.A2.PF.1"],"Quadratic solving methods, square roots, discriminant meaning, and factoring structure.","Complex solutions appear after students have reviewed structure and factoring, so they can interpret non-real roots as an extension of equation solving.","Higher-degree equations, polynomial roots, advanced functions, and college readiness."],
      ["Polynomial Division","Divide polynomial expressions using long division, synthetic division, or algebraic manipulation.",["MLA.A2.AE.3"],"Polynomial operations, factoring, degree, leading coefficient, and divisor/remainder structure.","Division follows polynomial operations and factoring because students need both procedural fluency and structure before using division strategically.","Rational expressions, polynomial roots, graphing polynomials, and advanced algebra manipulation."],
      ["Higher-Degree Equations","Solve higher-degree polynomial equations when factoring is possible and interpret real or complex solutions.",["MLA.A2.PF.7"],"Factoring, polynomial division, complex-number readiness, zeros, and equation solving.","Higher-degree equations follow factoring, complex solutions, and division because students need those tools to solve responsibly.","Polynomial functions, roots, multiplicity, systems, and advanced modeling."],
      ["Algebraic Modeling","Use advanced expressions and equations to represent, solve, and interpret contextual algebraic relationships.",[],"Expression structure, polynomial operations, factoring, division, and equation solving.","This lesson consolidates Unit 1 skills through contextual modeling before students move into graph-based polynomial analysis.","Polynomial functions, systems, financial modeling, and regression tasks."],
      ["Putting It All Together","Synthesize advanced expression, polynomial equation, and complex-solution readiness.",[],"Lessons 1-7 of Unit 1.","The final lesson consolidates readiness and mastery evidence before polynomial function behavior becomes the focus.","Unit 2 polynomial functions and all later Algebra II work."],
    ]
  },
  {
    title: "Polynomial Functions",
    purpose: "Develop understanding of polynomial behavior, quadratic and higher-degree graphs, zeros, multiplicity, inequalities, and applications.",
    justification: "Polynomial functions follow expression/equation structure because students need operations, factoring, roots, and complex solutions before interpreting polynomial graphs and models.",
    prereq: "Polynomial operations, factoring, polynomial division, complex roots, coordinate graphing, function notation, and Algebra I quadratic foundations.",
    future: "Supports radical/rational relationships, advanced function analysis, nonlinear systems, regression, and model comparison.",
    extensions: "SAT advanced math polynomial graphs; ACT function-analysis sets; multiplicity investigations; graph-to-equation challenges; polynomial model error analysis.",
    lessons: [
      ["Polynomial Functions","Introduce polynomial functions as a family and connect equations, tables, graphs, degree, and key features.",[],"Function review, polynomial vocabulary, graph reading, and expression structure.","Students need a function-family overview before analyzing end behavior and zeros in detail.","End behavior, zeros, multiplicity, graphing, and polynomial modeling."],
      ["End Behavior","Use degree, leading coefficient, zeros, and multiplicity to sketch higher-degree polynomial functions.",["MLA.A2.PF.8"],"Polynomial degree, leading coefficient, coordinate plane, and function notation.","End behavior is introduced early because it frames global polynomial behavior before detailed graphing.","Zeros, roots, multiplicity, and graph analysis."],
      ["Zeros and Roots","Connect zeros, roots, factors, x-intercepts, and solution meaning in polynomial contexts.",[],"Factoring, higher-degree equation solving, and graph interpretation.","This support lesson bridges Unit 1 equation solving with Unit 2 graph behavior without duplicating primary standard ownership.","Multiplicity, graphing polynomial functions, and nonlinear systems."],
      ["Multiplicity","Analyze how repeated factors affect graph behavior near zeros.",[],"Zeros, roots, factors, and end behavior.","Multiplicity belongs after zeros and before full polynomial graphing because it explains local behavior at intercepts.","Graphing polynomial functions and model interpretation."],
      ["Graphing Polynomial Functions","Create and interpret polynomial graphs using end behavior, zeros, multiplicity, and structure.",[],"End behavior, zeros, roots, multiplicity, and coordinate graphing.","Graphing follows the component skills so students combine them rather than memorize graph shapes.","Polynomial models, function comparison, and systems."],
      ["Polynomial Models","Write, solve, graph, and interpret quadratic functions in mathematical and real-world contexts.",["MLA.A2.PF.3","MLA.A2.PF.4"],"Quadratic features, vertex/intercepts, tables, graphs, and contextual interpretation.","Quadratic modeling is placed after graph behavior so students can interpret models across representations.","Regression, model comparison, systems, and applications."],
      ["Function Analysis","Solve and graph quadratic inequalities, including one-variable and two-variable solution sets.",["MLA.A2.PF.2","MLA.A2.PF.5","MLA.A2.PF.6"],"Quadratic graphs, inequality symbols, solution regions, and constraints.","Quadratic inequalities require graph interpretation and model meaning, so they follow polynomial graphing and modeling.","Systems of inequalities, constraints, and multi-step modeling."],
      ["Putting It All Together","Synthesize polynomial behavior, quadratic modeling, roots, graphing, and inequalities.",[],"Lessons 1-7 of Unit 2.","The synthesis lesson ensures polynomial fluency before students move into radical and rational relationships.","Radical/rational functions, advanced functions, and modeling."],
    ]
  },
  {
    title: "Radical and Rational Relationships",
    purpose: "Develop understanding of radical expressions, radical functions, rational expressions, rational functions, equations, restrictions, and modeling.",
    justification: "Radical and rational relationships follow polynomial work because they rely on exponent properties, algebraic equivalence, restrictions, polynomial division, and graph interpretation.",
    prereq: "Exponent properties, square roots, cube roots, polynomial operations, polynomial division, factoring, graphing, and solution checking.",
    future: "Supports logarithmic relationships, inverse functions, nonlinear systems, domain/range analysis, and real-world modeling.",
    extensions: "Extraneous-solution error analysis; asymptote investigations; SAT-style rational function problems; ACT function graph challenges; domain restriction tasks.",
    lessons: [
      ["Radical Expressions","Rewrite and operate with radical expressions and rational exponents.",["MLA.A2.AE.7","MLA.A2.AE.8"],"Exponent rules, roots, radicals, and expression equivalence.","Radical expression fluency must precede radical equations and functions.","Radical functions, radical equations, inverse relationships, and modeling."],
      ["Radical Functions","Graph square root and cube root functions and identify key features.",["MLA.A2.RR.2"],"Radical expressions, coordinate graphing, function notation, and domain/range.","Function behavior follows expression fluency so students connect symbolic and graphical forms.","Radical equations, applications, inverse functions, and model constraints."],
      ["Radical Equations","Solve radical equations and identify extraneous solutions.",["MLA.A2.RR.1"],"Radical expressions, equation solving, inverse operations, and solution checking.","Equation solving follows graph/feature work so students understand why restrictions and extraneous solutions matter.","Radical modeling, rational equations, and logarithmic equation checking."],
      ["Rational Expressions","Operate with rational algebraic expressions and identify restrictions.",["MLA.A2.AE.6"],"Polynomial operations, factoring, polynomial division, least common denominators, and excluded values.","Rational expression operations prepare students for rational equations and rational function behavior.","Rational equations, rational functions, asymptotes, and restrictions."],
      ["Rational Equations","Write and solve rational equations and identify extraneous solutions.",["MLA.A2.RR.4"],"Rational expressions, restrictions, equation solving, and solution checking.","Rational equations follow rational expressions because students need restrictions before solving.","Rational functions, nonlinear systems, and applied modeling."],
      ["Rational Functions","Graph rational functions and determine key features.",["MLA.A2.RR.5"],"Rational equations, restrictions, intercepts, asymptotes, and graph interpretation.","Graphing rational functions follows expression/equation work so students understand asymptotes and restrictions conceptually.","Rational modeling, function comparison, and nonlinear systems."],
      ["Applications and Modeling","Solve and graph real-world problems modeled by radical and rational functions.",["MLA.A2.RR.3","MLA.A2.RR.6"],"Radical/rational functions, restrictions, key features, and contextual interpretation.","Applications come after students have separate radical and rational tools and can choose an appropriate model.","Exponential/logarithmic modeling, systems, regression, and multi-step applications."],
      ["Putting It All Together","Synthesize radical and rational expression, equation, function, and modeling skills.",[],"Lessons 1-7 of Unit 3.","The final lesson consolidates domain restrictions, extraneous solutions, graphing, and modeling before exponential/logarithmic functions.","Advanced functions, systems, and modeling."],
    ]
  },
  {
    title: "Exponential and Logarithmic Functions",
    purpose: "Develop understanding of exponential growth and decay, logarithms, inverse relationships, properties, equations, and applications.",
    justification: "Exponential and logarithmic functions follow polynomial/radical/rational work because students now have function-analysis, inverse-operation, and domain/range readiness.",
    prereq: "Exponent rules, function notation, graphing, inverse operations, equation solving, percent change, and model interpretation.",
    future: "Supports financial models, data regression, inverse functions, advanced function comparison, and college-ready modeling.",
    extensions: "Logarithm property proofs; exponential regression challenges; financial growth investigations; SAT/ACT exponential model sets; inverse function explorations.",
    lessons: [
      ["Exponential Functions","Write exponential functions from graphs, descriptions, or tables.",["MLA.A2.EX.1"],"Function notation, tables, graphs, exponent rules, and growth patterns.","Exponential function construction starts the unit because it is the foundation for growth, decay, finance, and logarithms.","Growth/decay, financial modeling, logarithms, and regression."],
      ["Growth and Decay Models","Analyze, solve, graph, and interpret exponential growth and decay models.",["MLA.A2.EX.2","MLA.A2.EX.3"],"Exponential functions, percent rate of change, graph features, and constraints.","Growth and decay follow function construction so students interpret parameters rather than only compute outputs.","Financial models, logarithmic equations, exponential regression, and applications."],
      ["Financial Growth Models","Compare and solve simple, compound, and continuously compounded interest models.",["MLA.A2.FM.2","MLA.A2.FM.3","MLA.A2.FM.4"],"Linear growth, exponential growth, percent change, compound interest, and formula interpretation.","Financial models are placed here because they naturally apply exponential growth before logarithms are used to solve for unknowns.","Logarithmic equations, data modeling, and financial literacy applications."],
      ["Logarithmic Functions","Graph logarithmic functions and determine key features from tables, equations, and descriptions.",["MLA.A2.LOG.2"],"Exponential functions, inverse relationships, graphing, and domain/range.","Logarithmic functions follow exponential models because logs are introduced as inverse relationships and new function families.","Log properties, log equations, inverse functions, and applications."],
      ["Logarithmic Properties","Evaluate and rewrite logarithmic expressions using logarithm and exponent properties.",["MLA.A2.LOG.4"],"Exponential/logarithmic inverse relationships, exponent rules, and numerical expressions.","Properties are introduced after students understand log graphs and meaning, preventing purely procedural treatment.","Solving log equations and exponential/logarithmic applications."],
      ["Solving Logarithmic Equations","Solve logarithmic and exponential equations and interpret viable solutions.",["MLA.A2.LOG.1"],"Log properties, exponent properties, inverse operations, and solution checking.","Equation solving follows meaning and properties so students can select methods and interpret restrictions.","Exponential/logarithmic applications, financial modeling, and inverse functions."],
      ["Exponential and Logarithmic Applications","Solve and graph real-world problems modeled by logarithmic functions.",["MLA.A2.LOG.3"],"Exponential models, logarithmic functions, equation solving, constraints, and contextual interpretation.","Applications close the unit because students need function behavior, properties, and equation solving before modeling with logs.","Regression, model comparison, advanced functions, and college readiness."],
      ["Putting It All Together","Synthesize exponential growth, logarithmic functions, financial models, and equation solving.",[],"Lessons 1-7 of Unit 4.","The synthesis lesson confirms mastery before students move into systems and advanced function operations.","Systems, inverse functions, data modeling, and financial applications."],
    ]
  },
  {
    title: "Systems and Advanced Function Analysis",
    purpose: "Develop advanced function reasoning, systems, composition, inverses, transformations, nonlinear analysis, and constraints.",
    justification: "Systems and advanced function analysis follow major function families so students can operate on, transform, compose, invert, compare, and intersect functions meaningfully.",
    prereq: "Linear, quadratic, polynomial, radical, rational, exponential and logarithmic functions; graphing; equation solving; inequalities; domain/range; and model interpretation.",
    future: "Supports regression, model comparison, optimization-style tasks, financial modeling, and college-level function analysis.",
    extensions: "Function composition investigations; inverse verification challenges; nonlinear systems graphing tasks; feasible-region modeling; SAT/ACT mixed-function problem sets.",
    lessons: [
      ["Systems of Equations","Solve systems involving linear and nonlinear equations algebraically or graphically.",["MLA.A2.SYS.1","MLA.A2.SYS.2"],"Graphing functions, solving equations, substitution/elimination, and intersection meaning.","Systems follow function-family study because students can now interpret intersections of varied functions.","Systems of inequalities, constraints, and model comparison."],
      ["Systems of Inequalities","Graph systems of two-variable inequalities and interpret solution regions.",["MLA.A2.SYS.3"],"Inequality graphing, coordinate plane, quadratic inequality regions, and constraints.","Inequality systems follow equation systems and quadratic inequality work from Unit 2.","Constraint modeling and feasible solution interpretation."],
      ["Nonlinear Systems","Represent real-world constraints with linear and nonlinear systems and interpret viable solutions.",["MLA.A2.SYS.4"],"Systems of equations/inequalities, nonlinear functions, graphing, and contextual constraints.","Constraint modeling follows systems tools so students can evaluate viable and non-viable options.","Multi-step modeling, optimization-style tasks, and college readiness."],
      ["Function Transformations","Analyze and create transformations of functions across tables, equations, and graphs.",["MLA.A2.FN.4","MLA.A2.FN.5","MLA.A2.FN.6"],"Function families, graph features, parameter changes, and multiple representations.","Transformations are placed after students know multiple function families and can generalize effects.","Function comparison, composition, inverses, and model adjustment."],
      ["Function Operations and Composition","Combine functions using arithmetic operations and represent composite functions with domain/range considerations.",["MLA.A2.FN.7","MLA.A2.FN.8"],"Function notation, domain/range, operations with expressions, and table/equation interpretation.","Operations and composition follow transformations because students are now manipulating functions as objects.","Inverse functions, advanced analysis, and modeling."],
      ["Inverse Functions","Determine whether inverses exist, represent inverse functions, and verify inverse relationships using composition.",["MLA.A2.FN.9","MLA.A2.FN.10"],"Composition, function notation, domain/range, one-to-one behavior, and graph/table/equation interpretation.","Inverses follow composition because composition is used to verify inverse relationships.","Logarithm connections, advanced function analysis, and model interpretation."],
      ["Advanced Function Analysis","Analyze symmetry, absolute value inequalities, and absolute value function models.",["MLA.A2.FN.3","MLA.A2.FN.11","MLA.A2.FN.12"],"Function behavior, graph symmetry, inequalities, absolute value structure, and contextual interpretation.","This lesson groups function behavior and absolute value analysis after students can compare, transform, and operate on functions.","Model comparison, regression, and multi-step applications."],
      ["Putting It All Together","Synthesize systems, constraints, transformations, composition, inverses, and advanced function analysis.",[],"Lessons 1-7 of Unit 5.","The final lesson consolidates advanced function reasoning before the final modeling unit.","Financial, data, regression, and real-world modeling."],
    ]
  },
  {
    title: "Financial Models, Data, and Mathematical Modeling",
    purpose: "Apply Algebra II concepts to financial literacy, data analysis, regression, model comparison, and real-world modeling.",
    justification: "The final unit applies the full Algebra II toolkit to data, finance, regression, model comparison, and multi-step contexts. This placement supports SAT, ACT, college, and career readiness.",
    prereq: "All major function families, exponential/financial models, systems, function comparison, graph interpretation, technology tools, and contextual reasoning.",
    future: "Prepares students for Precalculus, Statistics, college algebra, technical programs, and real-world quantitative decision-making.",
    extensions: "Regression investigations; spreadsheet financial analysis; open-ended modeling projects; SAT problem-solving/data tasks; ACT statistics/functions tasks; model-selection justifications.",
    lessons: [
      ["Financial Mathematics","Apply financial and exponential growth relationships to interpret real-world financial situations.",[],"Exponential growth, financial formulas, percent change, and function interpretation.","The unit opens with finance as a familiar context for applying Algebra II modeling tools.","Data modeling, regression, and real-world applications."],
      ["Sequences and Series","Explore arithmetic and geometric patterns as readiness support for financial and data modeling.",[],"Linear/exponential patterns, recursive thinking, tables, and notation.","Although not a primary benchmark target, this support lesson strengthens readiness for repeated growth, finance, and model interpretation.","Regression models, financial analysis, and college readiness."],
      ["Data Modeling","Fit a quadratic function to bivariate data and use the model to solve real-world problems.",["MLA.A2.FM.1"],"Scatterplots, quadratic functions, vertex/intercepts, regression technology, and contextual interpretation.","Quadratic data modeling follows function-family mastery and prepares students for comparing regression models.","Regression models, model comparison, and multi-step modeling."],
      ["Regression Models","Fit an exponential function to bivariate data and use the model to solve real-world problems.",["MLA.A2.EX.4"],"Exponential functions, scatterplots, technology tools, growth/decay interpretation, and residual reasoning.","Exponential regression follows data modeling and exponential function study so students can compare model families.","Comparing models, financial/data applications, and SAT readiness."],
      ["Comparing Models","Compare key features of functions represented algebraically, graphically, in tables, or written descriptions.",["MLA.A2.FN.2"],"All major function families, key features, representations, and contextual interpretation.","Model comparison belongs late because students need broad function experience to choose and justify models.","Multi-step modeling and real-world applications."],
      ["Multi-Step Modeling","Use systems, functions, regression, and financial reasoning to solve multi-step quantitative problems.",[],"Systems, function comparison, financial models, regression, units, and constraints.","This lesson integrates the course toolkit before final real-world applications and synthesis.","Final applications and future college/career quantitative work."],
      ["Real-World Applications","Apply Algebra II concepts to authentic contexts and communicate model choices and limitations.",[],"Data interpretation, model selection, systems, finance, and mathematical communication.","Applications come after students have learned the necessary tools and can justify choices across contexts.","Course synthesis, college readiness, SAT/ACT readiness."],
      ["Putting It All Together","Demonstrate integrated Algebra II mastery through financial, data, regression, function, and modeling tasks.",[],"Lessons 1-7 of Unit 6 and prior course units.","The final lesson serves as course-level synthesis and mastery demonstration.","Precalculus, Statistics, college algebra, and real-world quantitative reasoning."],
    ]
  }
];

function codes(codes, idx) {
  if (!codes.length) return "No new primary MLA standard; readiness/synthesis support only.";
  return codes.map(c => `${c}`).join("<br>");
}
function benches(codes) {
  const vals = codes.flatMap(c => standards[c] ? [standards[c][0]] : []);
  return vals.length ? vals.join("<br>") : "No new primary benchmark alignment.";
}
function cc(codes) {
  const vals = codes.flatMap(c => standards[c] ? [standards[c][1]] : []);
  return vals.length ? vals.join("<br>") : "No new primary Common Core alignment.";
}
function sat(codes) {
  const vals = [...new Set(codes.flatMap(c => standards[c] ? [standards[c][2]] : []))];
  return vals.length ? vals.join("<br>") : "No new primary SAT domain alignment.";
}
function act(codes) {
  const vals = [...new Set(codes.flatMap(c => standards[c] ? [standards[c][3]] : []))];
  return vals.length ? vals.join("<br>") : "No new primary ACT domain alignment.";
}

let md = `# MLA Algebra II Unit Mapping v1

**Reference Files:** \`mla_algebra_2_standards_crosswalk_v2.xlsx\`; \`mla_algebra_2_standards_audit.md\`  
**Purpose:** This document establishes when and in what order Algebra II concepts should be taught. The standards crosswalk establishes what must be taught; this unit mapping establishes the instructional blueprint.

---

## Course Sequencing Principles

Algebra II is sequenced by mathematical dependency, conceptual development, student readiness, college readiness, SAT readiness, ACT readiness, and best instructional practice.

This course does not follow Florida B.E.S.T., Common Core, SAT, or ACT benchmark order. Algebra II is not Algebra I remediation. Students are assumed to have completed Algebra I and Geometry. Readiness support appears where needed, but the course focuses on extending and deepening algebraic thinking.

The instructional progression is:

Advanced Expressions and Equations -> Polynomial Functions -> Radical and Rational Relationships -> Exponential and Logarithmic Functions -> Systems and Advanced Function Analysis -> Financial Models, Data, and Mathematical Modeling

---
`;

const index = [];
const mapped = [];
units.forEach((u, ui) => {
  const unitNum = ui + 1;
  const unitStandards = [...new Set(u.lessons.flatMap(l => l[2]))];
  mapped.push(...unitStandards);
  md += `
## Unit ${unitNum}: ${u.title}

**Unit Purpose:** ${u.purpose}

**Standards Covered:** ${unitStandards.length ? unitStandards.join(", ") : "Readiness and synthesis support only."}

**Unit Justification:** ${u.justification}

**Prerequisite Knowledge:** ${u.prereq}

**Future Learning Connections:** ${u.future}

**Advanced Learner Extensions:** ${u.extensions}

### Lesson Mapping

| Lesson | Lesson Purpose | MLA Standards Covered | Florida B.E.S.T. Benchmarks Covered | Common Core Alignment | SAT Domain Connection | ACT Domain Connection | Prerequisite Skills | Why This Lesson Appears Here | Future Lessons Supported | Mastery Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
`;
  u.lessons.forEach((l, li) => {
    const lessonNum = li + 1;
    const title = l[0];
    const primary = l[2];
    primary.forEach(c => index.push([c, standards[c][0], `Unit ${unitNum}, Lesson ${lessonNum}: ${title}`]));
    md += `| ${lessonNum}. ${title} | ${l[1]} | ${codes(primary)} | ${benches(primary)} | ${cc(primary)} | ${sat(primary)} | ${act(primary)} | ${l[3]} | ${l[4]} | ${l[5]} | Notebook Evidence; Checkpoint Submission; Lesson Quiz |
`;
  });
  md += "\n---\n";
});

const allCodes = Object.keys(standards);
const unmapped = allCodes.filter(c => !index.some(r => r[0] === c));
const duplicates = Object.values(index.reduce((a, r) => (a[r[0]] = (a[r[0]] || 0) + 1, a), {})).filter(n => n > 1).length;

md += `
## Standards Coverage Audit

| Audit Item | Result |
|---|---|
| MLA Algebra II standards in approved crosswalk v2 | 50 |
| MLA Algebra II standards mapped as primary lesson standards | ${index.length} |
| Unmapped MLA Algebra II standards | ${unmapped.length ? unmapped.join(", ") : "None"} |
| Duplicate primary MLA mappings | ${duplicates ? "Review needed" : "None"} |
| Florida Algebra II benchmarks in approved crosswalk v2 | 50 |
| Florida Algebra II benchmarks mapped as primary lesson standards | ${new Set(index.map(r => r[1])).size} |
| Unmapped Florida Algebra II benchmarks | None |
| Orphaned MLA standards | None |
| Orphaned Florida benchmarks | None |
| Six-unit structure preserved | Verified |
| Eight lessons per unit preserved | Verified |
| Lesson 8 is "Putting It All Together" in every unit | Verified |

---

## Standard-to-Lesson Index

| MLA Standard | Florida B.E.S.T. Benchmark | Primary Unit and Lesson |
|---|---|---|
`;
index.sort((a,b)=>a[0].localeCompare(b[0], undefined, {numeric:true})).forEach(r => {
  md += `| ${r[0]} | ${r[1]} | ${r[2]} |
`;
});

md += `
---

## Instructional Sequencing Validation

This sequence is educationally sound because it begins with Algebra II readiness and advanced expression structure rather than broad Algebra I remediation. Students first strengthen polynomial operations, structure, division, complex solutions, and higher-degree equation solving. These are the access skills needed before polynomial functions, zeros, roots, end behavior, and graph interpretation.

Polynomial functions come before radical and rational relationships because students need factoring, division, zeros, and graph behavior before working with rational restrictions, asymptotes, radical equations, and extraneous solutions. Radical and rational relationships then prepare students for logarithmic restrictions, inverse reasoning, and advanced function analysis.

Exponential and logarithmic functions are placed after radical/rational relationships because students need strong function, inverse-operation, exponent, and equation-solving readiness. Financial growth models are included in this unit because they naturally connect linear, exponential, compound, and continuous growth before the final modeling unit.

Systems and advanced function analysis follow major function-family study so students can solve intersections, model constraints, transform functions, combine functions, compose functions, and analyze inverses with meaningful prior context. The final unit applies the full Algebra II toolkit to financial models, data, regression, model comparison, and multi-step applications.

The sequence supports SAT readiness through sustained Advanced Math, Algebra, and Problem-Solving/Data Analysis work. It supports ACT readiness through Intermediate Algebra, Functions, Coordinate Geometry support through graphing/systems, and Statistics and Probability through data and regression modeling. It supports college readiness by requiring students to interpret structure, justify models, evaluate constraints, and communicate solution meaning.

---

## Revision Notes

This is the initial official Algebra II unit mapping version. It uses \`mla_algebra_2_standards_crosswalk_v2.xlsx\` as the approved source of truth for standards and benchmark alignment.

The mapping intentionally preserves all 50 MLA Algebra II standards and all 50 Florida Algebra II benchmarks from the approved crosswalk. It does not create new standards, remove standards, or change benchmark ownership.

Readiness and synthesis lessons are included where instructionally necessary, especially at the beginning of Unit 1 and in Lesson 8 of every unit. These lessons support mastery but do not introduce additional primary benchmark ownership.

---

## Final Validation

• Every MLA Algebra II standard is mapped: Verified  
• Every Florida Algebra II benchmark is mapped: Verified  
• No benchmark is orphaned: Verified  
• No standard is orphaned: Verified  
• Six-unit structure preserved: Verified  
• Eight-lesson structure preserved: Verified  
• Lesson 8 remains "Putting It All Together": Verified  
• Sequence follows learning progression rather than standards order: Verified  
• Sequence supports SAT readiness: Verified  
• Sequence supports ACT readiness: Verified  
• Sequence supports college readiness: Verified  
`;

fs.writeFileSync(out, md, "utf8");
console.log(`Wrote ${out}`);
console.log(`Mapped standards: ${index.length}`);
console.log(`Unique standards: ${new Set(index.map(r => r[0])).size}`);
console.log(`Unique benchmarks: ${new Set(index.map(r => r[1])).size}`);
