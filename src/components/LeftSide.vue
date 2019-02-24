<template>
  <div id="container">
     <div class="toggle">
        Vivekanand Rajasekar
        <br>
          <!-- <INPUT TYPE="radio" id="map" :value="true" v-model="isMap"/>
          <label for="map">Map</label>
          <INPUT TYPE="radio" id="profile" :value="false" v-model="isMap"/>
          <label for="profile">Profile</label>
        {{isMap}} -->
      </div>
      <div class="main">
        <component :is="dynamicComponent" v-bind:events="events"/>
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
      isMap: false
    }
  },
  computed: {
    dynamicComponent() {
      if(this.isMap) {
        return Map
      } else {
        return Profile
      }
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
  border-right: 1px white solid;
}

.main {
  width: 100%;
  height: 90%;
}


</style>




