# lifeMapper
Resume of my life with map and timeline

# To run:
npm run serve

# Local data editor (development only)

After `npm run serve`, open **`http://localhost:8080/#/editor`** (Vue Router uses **hash** URLs). Or use **Open data editor** in the sticky bar on the home page. Typed `/editor` redirects to `/#/editor` while the dev server runs.

In the editor: pick or **add** a time period (**Add new** copies the selected period). Edit fields or JSON sections, then **Save to disk** (writes both `data.json` and `eventOrder.json`). **Download data.json** / **Download eventOrder.json** work without the API.

# To deploy:
sh deploy.sh



