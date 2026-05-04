<template>
  <div class="welcome">
    <div class="welcome-inner">
      <div class="google">
        <h1 class="headline">Welcome,</h1>
        <img class="logo" src="@/assets/brand/Google.png" alt="">
      </div>
      <router-link to="/home" tag="button" class="cta">
        Continue
      </router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Welcome',
  components: {

  },
}

</script>

<style scoped>

.welcome {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(ellipse 120% 80% at 50% -20%, #1e3a5f 0%, #0f172a 45%, #020617 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem 3rem;
  box-sizing: border-box;
}

.welcome-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 42rem;
  width: 100%;
}

.google {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.headline {
  font-family: var(--font-display, system-ui, sans-serif);
  font-size: clamp(3rem, 12vw, 6.5rem);
  font-weight: var(--font-heading-weight, 700);
  color: #f8fafc;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}

.logo {
  max-width: min(100%, 280px);
  height: auto;
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.4));
}

.cta {
  font-family: var(--font-sans, inherit);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0f172a;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 1rem 2.75rem;
  border-radius: var(--radius-pill, 999px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  background: #fff;
}

.cta:active {
  transform: translateY(0);
}

</style>
