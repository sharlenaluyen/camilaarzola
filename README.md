# camilaarzola.com

> Dear Camila,
>
> You bet your ass AI wrote most of this lol I wanted to build you something that was just yours: a small, unglamorous corner of the internet where anyone who finds you gets to see exactly what makes you so easy to love: the blueberry experiments, the linocuts drying on the table, the strong opinions about snacks, the tea always steeping, the allergy to black pepper and cats and dairy that somehow never stops you from petting the cat anyway. Also, the middle of the day  naps and sex time. Love you lots!!
>
> Much love,
> Sharlena

## About this project

`camilaarzola.com` is Camila's personal site. It's part friend resume, part art wall, part running list of the small domestic things that make up a life, and  an interactive map tracing every place she's lived, from Ponce to Charlotte, with a little plane that flies the route on click.

It's a static site: no framework, no build step, no dependencies. Just HTML, CSS, and vanilla JavaScript.

## Project structure

```
.
├── index.html   # all page content and markup
├── styles.css   # all styling
├── script.js    # the friendship quiz and the interactive map
└── CNAME        # custom domain config for GitHub Pages
```

## Running locally

No build tools required. From the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

Or... just open the index file.

## Deployment

The site is hosted on GitHub Pages and served at [camilaarzola.com](https://camilaarzola.com) via the `CNAME` file at Cloudflare (CF). A CF Worker deploys it live when you push to the main branch here.

## What's on the site

- **Friend resume** — the application for friendship, goofiness required.
- **Art wall** — linocuts and works in progress.
- **Places I've called home** — a hand-drawn, zoomed-in map tracing Camila's homes in order. Click a numbered stop or the plane itself to fly to the next city, or use "Trace the route" to watch the whole trip at once.
- **Friendship compatibility quiz** — extremely scientific, no data collection.

---

Made with lots of lalalalove, by Shivalrous Sharlena, for Cavorting Camila.
