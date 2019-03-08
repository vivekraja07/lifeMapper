<template>
  <div id="container">
     <div class="toggle">

        <div class = "buttons">
          <div>
            <input type="radio" id="one" value="Map" v-model="pick" @input="blur">
            <label for="one">Map</label>
          </div>
          <div>
            <input type="radio" id="two" value="Profile" v-model="pick" @input="blur">
            <label for="two">Profile</label>
          </div>
          <div>
            <input type="radio" id="three" value="Projects" v-model="pick" @input="blur">
            <label for="three">Projects</label>
          </div>
        </div>

      </div>

      <div class="main">
        <keep-alive>
          <component :is="pick" v-bind:events="events"/>
        </keep-alive>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'LeftSide',
  components: {
    Profile,
    Map
  },
  props: {
    events: Object
  },
  data: function() {
    return {
      pick: 'Profile'
    }
  },
  methods: {
    blur: function (event) {
      event.target.blur();
    }
  }
}

</script>

<style scoped>

#container {
  width: 50%;
  height: 90%;
  display: inline-block;
  vertical-align: top;
  font-size: 1rem;
}

.toggle {
  width: 100%;
  height: 10%;

  background: black;
  color: white;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  font-size: 30px;
  width: 100%;

}

.main {
  width: 100%;
  height: 90%;
}


</style>




