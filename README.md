# lifeMapper
Resume of my life with map and timeline

## Where things live

- **`src/views/`** — top-level routes (`Home`, optional `Welcome`, `DataEditor` in dev only).
- **`src/components/`** — UI split by area (`leftSide`, `information`, etc.).
- **`src/data/`** — `data.json` (timeline + map content), `eventOrder.json`, `projects.json`. Edited in production by rebuilding after changes; in development you can use the data editor at `/#/editor`.
- **`src/assets/`** — images and SVGs; see [`src/assets/README.md`](src/assets/README.md) for the `icons/` vs `social/` vs `ui/` layout.

# To run:
npm run serve

# Local data editor (development only)

After `npm run serve`, open **`http://localhost:8080/#/editor`** (Vue Router uses **hash** URLs). Or use **Open data editor** in the sticky bar on the home page. Typed `/editor` redirects to `/#/editor` while the dev server runs.

In the editor: pick or **add** a time period (**Add new** copies the selected period). Edit fields or JSON sections, then **Save to disk** (writes both `data.json` and `eventOrder.json`). **Download data.json** / **Download eventOrder.json** work without the API.

# To deploy:
sh deploy.sh



