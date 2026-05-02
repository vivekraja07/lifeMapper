<template>
  <div id="profile">
      <div class = "logoHolder">
          <img id="vivek" src="@/assets/singapore.jpg">
      </div>

      <h1>Vivek Raja</h1>
      <blockquote>
        <p>"Never discount the power of enthusiasm"</p>
        </blockquote>
      <br>
      <div class = "icons">
        <div class = "iconHolder">
            <a href="https://www.linkedin.com/in/vivekraja07/">
              <img src="@/assets/linkedin.png">
            </a>
        </div>

        <div class = "iconHolder">
            <a href="https://github.com/vivekraja07">
              <img src="@/assets/github.png">
            </a>
        </div>

        <div class = "iconHolder">
          <a href="https://devpost.com/VivekanandRajasekar">
            <img src="@/assets/devpost.jpg">
          </a>
        </div>

        <div class = "iconHolder">
          <a href="https://www.dropbox.com/s/id52myrvdr17n6u/VivekRaja.pdf?dl=0" target="_blank">
            <img src="@/assets/resume.png">
          </a>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {

  },
  props: {
    events: Object
  }
}

</script>

<style scoped>

#profile {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  overflow-x: hidden;
  padding: 0.5rem 1rem 1.5rem;
  box-sizing: border-box;
  background: var(--color-surface, #fff);
  scrollbar-gutter: stable;
}

h1 {
  font-family: var(--font-display, system-ui, sans-serif);
  font-weight: var(--font-heading-weight, 700);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  letter-spacing: -0.02em;
  color: var(--color-ink, #0f172a);
  margin-top: 0.75rem;
}

blockquote {
  padding: 1rem 1.25rem;
  margin: 1rem auto 0;
  max-width: 28rem;
  border-left: 4px solid var(--color-accent, #0ea5e9);
  background: var(--color-accent-soft, rgba(14, 165, 233, 0.12));
  border-radius: 0 var(--radius, 12px) var(--radius, 12px) 0;
}

blockquote p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-style: italic;
    font-weight: 500;
    color: var(--color-muted, #64748b);
    line-height: 1.5;
}

.logoHolder {
  width: 100%;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

#vivek {
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: min(420px, 55vh);
  object-fit: cover;
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow-md, 0 4px 24px rgba(15, 23, 42, 0.12));
}

.iconHolder {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconHolder a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: var(--radius-pill, 999px);
  background: var(--color-bg, #e8edf3);
  border: 1px solid var(--color-border, #e2e8f0);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.iconHolder a:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.08));
  border-color: var(--color-accent, #0ea5e9);
}

img {
    border-radius: 6px;
    border: 0;
    height: 2rem;
    width: 2rem;
    object-fit: contain;
}

.icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

</style>
