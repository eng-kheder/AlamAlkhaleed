# علم الخليج للسياحة والسفر — Website

Static site: plain HTML + CSS + JavaScript. No framework, no build step.

## Preview locally
Double-click `index.html`, or run a local server from this folder:

    python3 -m http.server 8000     # then open http://localhost:8000

## Deploy
**Netlify:** drag this `website` folder onto https://app.netlify.com/drop
(or connect the Git repo; build command: empty, publish directory: `.` / this folder).

**GitHub Pages:** push the contents of this folder to a repo →
Settings → Pages → Deploy from branch → `main` / root.
All paths are relative, so it also works under `username.github.io/repo-name/`.

## Editing content
All content lives in **`assets/js/data.js`**:

| What | Where in data.js |
|---|---|
| Phone numbers, WhatsApp number, address | `phones`, `whatsapp`, `address` |
| Social media links (hidden until added) | `social` |
| About text | `about` |
| Services | `services` |
| Cars (add/remove, description, featured on home) | `cars` |
| Hotels | `hotels` (photos in `assets/img/hotels/<id>/01.jpg, 02.jpg …`, set `photos` to the count) |
| Visas | `visas` |
| Trips & day-by-day programs | `tripGroups`, `tripCategories`, `trips` |
| Syria tourist info (governorates & places) | `governorates` |

- Image paths are relative to `assets/img/`. Leave `image: ""` when there is no photo — a branded tile is shown instead.
- A trip category with no trips automatically shows an "inquire" card.
- Hero text on the home page is in `index.html`.

## Files
    index.html  about.html  services.html  cars.html  hotels.html
    visas.html  trips.html  syria.html  contact.html  404.html
    assets/css/style.css   assets/js/data.js   assets/js/main.js   assets/img/
