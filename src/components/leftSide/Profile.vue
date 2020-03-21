<template>
  <div id="profile">
      <div class = "logoHolder">
          <img id="vivek" src="@/assets/qualtrics.jpg">
      </div>

      <h1> Vivekanand Rajasekar </h1>
      <blockquote> 
        <p>"Never discount the power of enthusiasm"</p>
        <footer>-Sarah Chang</footer>
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
          <a href="https://www.dropbox.com/s/xayjr0a3s6vpn0w/VivekRaja.pdf?dl=0" target="_blank">
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
  },
}

</script>

<style scoped>

#profile {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
}

blockquote {
  padding: 20px;
}

blockquote p {
    font-size: 20pt;
    font-style: italic;
}

.logoHolder {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

#vivek {
  width: 283px;
  height: 350px;
}

.iconHolder {
  width: 72px;
  height: 72px;
}

img {
    border-radius: 6px;
    border: 4px solid transparent;
    height: 64px;
    width: 64px;
}

.icons {
  display: flex;
  justify-content:  space-around;
  align-content: center;
  flex-direction: row;
}


</style>
