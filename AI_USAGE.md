# AI usage and reflection

I used OpenAI Codex to learn Playwright, locators, waits, and assertions before completing this homework, after i was done with basics i proceeded to homework. It helped me understand the code, separate selectors and reusable actions into page objects, and review the assignment requirements. I remain responsible for understanding and explaining the submitted code.

## Most useful prompts

- "Create page objects to separate selectors and reusable actions from the tests."
- "Create a template for a manual testing report."
- "Review my tests against the assignment requirements."

The page-object suggestion was useful because it separated the catalogue, vehicle-detail, and navigation code into pages that I could use from the test scenarios.

## Incorrect AI action

An early prompt asking the AI to "make files as an advanced QA engineer" was interpreted too broadly. While reviewing its actions, I noticed that it had started crawling Longo production instead of only creating project files, so I stopped it immediately. I then added `AGENTS.md` instructions that forbid production access and allow only the approved staging environment. The production inspection was prohibited by the assignment rules and outside the assignment scope.

The latest project edits were checked through offline test discovery, not live browser tests. API filter/schema validation and runtime redirect protection remain unfinished.

## Reflection

The automation part was timeboxed to about 2.5 hours, so I focused on the required scenarios and did not have time to cover every feature or combination. With three additional days, I would automate more repeatable checks that have clear expected results. In general, automation is most valuable for stable regression checks, repeated calculations, form validation rules, filtering and sorting combinations, API responses, and cross-browser smoke tests. These checks are run frequently and consistently, so automation saves time and detects regressions quickly.

I would keep exploratory testing manual. It is easier to notice awkward mobile layouts, confusing text, or an unexpected user flow when I am clicking through the site myself. Staging data also changes, so I would check questionable results manually before calling them bugs. Automated tests are useful for checking the same known behaviour repeatedly; manual testing is useful for finding things I did not think to automate.
