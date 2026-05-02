<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading-weight: 700;
  --color-bg: #e8edf3;
  --color-surface: #ffffff;
  --color-ink: #0f172a;
  --color-muted: #64748b;
  --color-accent: #0ea5e9;
  --color-accent-hover: #0284c7;
  --color-accent-soft: rgba(14, 165, 233, 0.12);
  --color-border: #e2e8f0;
  --border-section-width: 3px;
  --color-chrome: #0f172a;
  --color-chrome-muted: #94a3b8;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 24px rgba(15, 23, 42, 0.08);
  --radius: 12px;
  --radius-pill: 999px;
}

html, body {
  height: 100%;
  width: 100%;
}

* {
  margin: 0;
  border: 0;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-ink);
}

#app {
  height: 100%;
  width: 100%;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-ink);
}

</style>
