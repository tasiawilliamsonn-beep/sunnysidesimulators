# The Broncho Intervention Menu

Sunnyside Intermediate School's Tier 1 behavior intervention website. Plain HTML, CSS, and JavaScript; no build step.

| Page | What it does |
| --- | --- |
| `index.html` | Home: what Tier 1 is, intervention vs. consequence, the three problems the site addresses, the full Sunnyside Behavior Intervention Matrix, behavior functions, and log type guidance. |
| `menu.html` | Teachers check the behaviors they see (each matrix behavior has detailed "looks like" options), confirm the likely function, and get ranked, research-cited Tier 1 interventions. Chosen interventions go into a plan. Level 3/4 choices show referral guidance. |
| `log.html` | PowerSchool log builder. Assigns the log type (INTERVENTION / INFORMATION / COMMUNICATION / DISCIPLINE) from the matrix level, blocks DISCIPLINE for Level 1-2, requires an intervention in INTERVENTION logs, checks the 3-logged-parent-contacts rule for Level 3 "little/no change", flags subjective wording, and keeps a Proof of Intervention record per student (CSV export, print). |
| `research.html` | Every reference in APA format, with the interventions each one supports. |

Content lives in `js/data.js` (behaviors, interventions, citations). Plans and saved logs are stored only in the teacher's browser (`localStorage`); use initials or student numbers.
