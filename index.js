const browserSync = require("browser-sync");
const app = require("./server/server");

const port = 4000;

app.listen(port, () => {
  browserSync({
    files: ["client/**/*.{html,js,css}"],
    online: false,
    open: false,
    port: port,
    proxy: "localhost:" + port,
    ui: false,
  });
});
