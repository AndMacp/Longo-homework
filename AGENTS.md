# Instructions for coding agents

These instructions apply to this homework project and all of its subdirectories.

## Scope and site access

- Perform only the work the user requests. Creating files or organizing the project does not authorize website inspection or test execution against an unspecified environment.
- Never visit, inspect, crawl, or point tests at Longo production (`longo.lv`, including `www.longo.lv`). This restriction applies to browser automation, web tools, HTTP clients, and command-line tools.
- Use only the exact staging origin provided by the user or assignment. Do not guess the staging address. If it has not been provided, ask for it before making site requests.
- Keep the base URL in configuration. Never default to production or scatter absolute application URLs through tests and page objects.
- Before executing tests, ensure configuration requires the approved staging origin and rejects production or any other unapproved origin. Do not follow redirects into production.

## Login and test data

- Never request SMS or OTP login codes. Staging is not connected to a real SMS gateway.
- Other form submissions are permitted on staging within the assigned scope. Prefix every free-text field with `QA TEST` so the data can be identified and cleaned up.

## Traffic limits

- Maximum two parallel Playwright workers. Configure `workers: 2` or fewer, and do not override this limit through command-line options or concurrent test runs.
- No load or stress testing.
- Do not crawl more than approximately two to three catalogue result pages. Avoid broad inventory crawling and unnecessary repeat runs.

## Staging behaviour and reporting

- Staging stock, prices, and data can differ from production. The environment may be redeployed and features may be unfinished.
- If behaviour appears broken, record it. Explain whether it seems to be a product defect or an environment/data issue, with supporting evidence and any uncertainty.
- Do not inspect production to compare staging behaviour.
- Record exact URLs, observation dates/times with time zone, environment details, reproduction steps, and genuine evidence for reported issues.
- Never invent findings, evidence, test executions, or passing results.

## AI assistance and ownership

- AI assistance is allowed and expected, but the candidate must be able to explain and defend every submitted line. Keep the implementation understandable and explain unfamiliar patterns.
- Maintain an honest `AI_USAGE.md` describing assistance, useful prompts, and concrete mistakes or fragile suggestions and their corrections.
- Do not claim safeguards or scenarios are implemented or verified until they actually are.
- The candidate retains ownership of the code; the assignment states that it will not be used in the employer's product.

## Enforcement

`AGENTS.md` provides instructions; it does not enforce runtime restrictions. Staging-origin validation and the worker limit must also be implemented in the test configuration before tests are run.
