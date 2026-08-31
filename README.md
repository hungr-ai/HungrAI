# REFUEL.AI

A tiny, static "AI snack" website inspired by the idea of giving a chatbot a corrective prompt when its previous answer is vague, overly agreeable, inaccurate, or bloated.

**No API key. No backend. Works on GitHub Pages.**

## What it does

Users can choose one of four corrective modes:

- **Truth** — re-check factual claims and uncertainty.
- **Challenge** — stop being a yes-man and challenge weak assumptions.
- **Concise** — remove waffle and answer directly.
- **Reset** — start the previous answer again from first principles.

They can optionally describe what went wrong, then copy the generated prompt and paste it into the same chatbot conversation.

## Run locally

Just open `index.html` in your browser.

For a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Push to GitHub

Create an empty GitHub repository, then from this folder run:

```bash
git init
git add .
git commit -m "Initial REFUEL.AI site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Turn on GitHub Pages

In the GitHub repository:

1. Open **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.

Your site will be available at a URL like:

`https://YOUR-USERNAME.github.io/YOUR-REPO/`

## Files

- `index.html` — page structure
- `style.css` — design and responsive layout
- `app.js` — mode switching, prompt generation, copy-to-clipboard

## Branding note

This project intentionally uses original branding and no Snickers/Mars artwork or logos. It is not affiliated with Snickers, Mars, OpenAI, Anthropic, Google, or any chatbot provider.
