# Project artifact configuration

Presentation PDFs are stored in the private Supabase bucket `portfolio-presentations` and served through signed URLs.

Current storage object names:

- `qsr_presentation.pdf`
- `gifting_presentation.pdf`
- `trace_presentation.pdf`

The matching project keys are configured in `src/data/content.ts` and resolved server-side by `src/app/api/artifacts/route.ts`. Hosted prototypes remain external URLs in the centralized artifact configuration.
