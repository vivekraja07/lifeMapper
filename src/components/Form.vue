<template>
   <!-- template for the modal component -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          
          <div class="modal-body">
            <div class="instructions">
              Use the left and right keyboard arrow-keys (or the timeline at the bottom) 
              to navigate across time.
            </div>
             <div class="instructions">
               If you click on the 'Maps' tab on the top-left and navigate across time, you
               can travel through location history.
            </div>
            <div class="instructions">
               If time-travel is too much for you, the 'Profile' and 'Projects' tab
               are stable across time.
            </div>
            <div class = "iconHolder">
              <img src="@/assets/keyboardArrows.png">
            </div>
            <button @click="$emit('close')">
                OK
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>


</template>

<script>
import Form from './Form.vue'

export default {
  name: 'Form',
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconHolder {
  width: 150px;
  height: 100px;
  text-align: center;
  align-self: center;
}

img {
    height: 100%;
    width: 100%;
    text-align: center;
    object-fit: contain;
}

button {
  font-family: var(--font-sans, inherit);
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, #22c55e 0%, #16a34a 48%, #15803d 100%);
  border: 3px solid #14532d;
  color: #f0fdf4;
  padding: 0.95rem 2.35rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: var(--radius-pill, 999px);
  cursor: pointer;
  box-shadow: 0 3px 16px rgba(21, 128, 61, 0.55), 0 1px 0 rgba(255, 255, 255, 0.12) inset;
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 24px rgba(21, 128, 61, 0.72), 0 1px 0 rgba(255, 255, 255, 0.14) inset;
  filter: brightness(1.04);
}

button:active {
  transform: translateY(0);
}

.instructions {
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.55;
  padding-bottom: 0.65rem;
  color: var(--color-muted, #64748b);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: min(500px, 92vw);
  min-height: 360px;
  margin: 0 auto;
  padding: 1.75rem 1.75rem 1.5rem;
  background-color: var(--color-surface, #fff);
  border-radius: var(--radius, 16px);
  box-shadow: var(--shadow-md, 0 4px 24px rgba(15, 23, 42, 0.12));
  border: 1px solid var(--color-border, #e2e8f0);
  transition: all .3s ease;
  font-family: var(--font-sans, Helvetica, Arial, sans-serif);
}

.modal-header h3 {
  margin-top: 0;
  color: var(--color-accent, #0ea5e9);
}

.modal-body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: column;
  text-align: center;
  gap: 0.25rem;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}



</style>



