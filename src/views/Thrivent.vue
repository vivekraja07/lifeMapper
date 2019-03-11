<template>
  <div class="final">
    <div class="content">
      <ul ul style="list-style-type:none;">
        <li><router-link :to="{name: 'slides', params: {ppTitle: 'Final Presentation', ppLink: '//www.slideshare.net/slideshow/embed_code/key/LVMP6UxjTjSeJY'}}">Final Presentation</router-link></li>
        <ol>
          <li><router-link :to="{name: 'slides', params: {ppTitle: 'Deploy Tools Research', ppLink: '//www.slideshare.net/slideshow/embed_code/key/1PKO1qWKLR0zCd'}}">Deploy Tools Research</router-link></li>
          <li><router-link :to="{name: 'slides', params: {ppTitle: 'PPM Finance Automation', ppLink: '//www.slideshare.net/slideshow/embed_code/key/h6kVIHvKyF9e7P'}}">PPM Finance Automation</router-link></li>
          <li>Selenium Training</li>
          <ul>
            <li><router-link :to="{name: 'slides', params: {ppTitle: 'Intro', ppLink: '//www.slideshare.net/slideshow/embed_code/key/40157dpVXJTJLj'}}">Intro</router-link></li>
            <li><router-link :to="{name: 'slides', params: {ppTitle: 'Day 0', ppLink: '//www.slideshare.net/slideshow/embed_code/key/E8SchHgep6snQj'}}">Day 0</router-link></li>
            <li><router-link :to="{name: 'slides', params: {ppTitle: 'Day 1', ppLink: '//www.slideshare.net/slideshow/embed_code/key/u1gekA4gtClL8a'}}">Day 1</router-link></li>
            <li><router-link :to="{name: 'slides', params: {ppTitle: 'Day 2', ppLink: '//www.slideshare.net/slideshow/embed_code/key/tCxngqSb7KePLH'}}">Day 2</router-link></li>
          </ul>
        </ol>
      </ul>
    </div>
  </div>
</template>



<script>

export default {
  name: 'thrivent',
}

</script>



<style scoped>

.final {

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  align-content: center; 
  
}

.content {
  text-align: left;
  font-size: 30px;
}



</style>
