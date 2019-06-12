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
              <img src="../assets/keyboardArrows.png">
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

}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.instructions {
  font-size: 15pt;
  padding-bottom:10px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  height: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content:  space-around;
  align-content: center;
  flex-direction: column;
  text-align: center;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}



</style>



