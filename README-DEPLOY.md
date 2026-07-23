# VEC Blog System — Setup Guide

This turns the Insights section into a real, scalable Jekyll blog that GitHub
Pages will build automatically. Nothing on the Home/About/Services/Contact
pages was redesigned — `index.html` is the exact same file as before, with
three additions: (1) a tiny front-matter block so Jekyll will process it,
(2) the Insights section now pulls live posts instead of hardcoded cards,
and (3) the footer + Contact page gained social/coffee icons.

## 1. What you need to fill in before launch

Open `_config.yml` and replace these placeholder values:

```yaml
url: "https://your-username.github.io"      # your real GitHub Pages URL
baseurl: ""                                  # "/repo-name" if this is a project site, not a user/org site

social:
  instagram: "https://instagram.com/..."
  facebook: "https://facebook.com/..."
  linkedin: "https://linkedin.com/company/..."

buymeacoffee:
  url: "https://www.buymeacoffee.com/..."

giscus:
  repo: "your-username/your-repo"
  repo_id: "..."
  category: "Blog Comments"
  category_id: "..."
```

**Giscus (comments) setup** — takes about 2 minutes:
1. Turn on **Discussions** for your GitHub repo (repo → Settings → General → Features → Discussions).
2. Go to **giscus.app**, enter your repo, pick (or create) a Discussion category
   called something like "Blog Comments," and it will generate the exact
   `repo_id` / `category_id` values — paste those into `_config.yml`.

Until you fill in the Giscus IDs, the comment box will just render empty —
it won't error, it just won't do anything yet.

## 2. How to add a new article (this is the whole point)

Add one Markdown file to `_posts/`, named like:

```
_posts/2026-08-03-your-new-article-title.md
```

With this front matter at the top:

```yaml
---
title: "Your New Article Title"
date: 2026-08-03 09:00:00 -0400
category: Volunteer Retention
description: "One or two sentences — used as the card excerpt AND the SEO meta description."
---
```

...then write the article in Markdown below it. That's it. It will
automatically appear:
- On the homepage Insights teaser (if it's the newest post)
- On `/blog/` (the full archive, with search/filter/sort)
- In the RSS feed (`/feed.xml`)
- In the sitemap (`/sitemap.xml`)
- With full SEO tags and schema.org markup
- With automatic "related articles" (matched by category)
- With automatic Previous/Next navigation to its chronological neighbors

Use one of the existing categories, or add a new one — categories aren't a
fixed list, whatever you type in `category:` becomes a filter pill on `/blog/`
automatically.

## 3. Running it locally (optional, but recommended before pushing)

```bash
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

**Important — I could not test-build this myself.** This sandbox doesn't have
Ruby/Jekyll installed, so everything here was written correctly by hand
against Jekyll/Liquid syntax, but it has not been run through an actual
`jekyll build`. Please run it locally (or just push to GitHub Pages and check
the Pages build log under repo → Settings → Pages, or the Actions tab) before
you consider this final — if anything throws a Liquid error, send me the
exact error message and I'll fix it immediately.

## 4. Fonts (carried over from earlier conversation)

Headings use `Helvetica Now Display` with system-font fallbacks, and the
wordmark ("VOLUNTEER ENGAGEMENT") uses `Cormorant Garamond` (free, loaded from
Google Fonts). Neither Allrounder nor a licensed Helvetica Now Display file
is embedded — same caveat as before: if you get the licensed font files,
send them and I'll wire up proper `@font-face` rules.

## 5. Things that are placeholders on purpose

- **Featured images**: every article currently shows a styled navy/gold
  gradient block with a document icon (not a real photo) — this was
  explicitly requested as a placeholder in the brief. Add a real image by
  setting `image: /assets/images/your-photo.jpg` in a post's front matter.
- **Phone/email in the footer and Contact page**: unchanged from what was
  already on the site — update if these aren't the real ones.

## 6. A couple of judgment calls I made — flagging in case you want them different

- The 7 articles included two small, obvious OCR-style typos ("t's your
  chance" and "You cal also use"). I corrected both to "It's" and "You can"
  since they read as transcription artifacts, not intentional wording.
  Everything else is preserved exactly as given.
- Every article's original closing "Enjoyed this post? Support My Consulting
  Journey!" paragraph was kept verbatim inside the article body (per "do not
  rewrite/shorten"), **and** the new standardized "Enjoyed this article?" /
  Buy Me a Coffee block from the brief was added as its own component right
  after. That means each article currently has two support-the-work mentions
  back to back. If you'd rather only show the new styled block, tell me and
  I'll trim the original inline paragraph from each post.
- The source document had **7 articles**, not 6 — I used all 7, including
  "The Volunteer Lifecycle" which I'd initially missed on the first pass.
