<template>
  <div id="o-nama">
    <div class="about-us-wrap container">
      <h1 class="headline">About us</h1>

      <div class="subtitle">You can learn more about us below</div>

      <div class="history">
        Established 2014
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur maiores natus nihil doloribus nobis nesciunt perspiciatis? Corrupti repudiandae iure reiciendis, delectus dicta pariatur magni soluta aspernatur commodi consectetur tempora similique vero nisi doloribus distinctio facilis non! Magnam eius quibusdam, provident dolores tempore fuga, voluptatibus amet aspernatur, eaque voluptas molestiae quia.
      </div>

      <div class="partners">
        <Slideshow />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Slideshow from "@/components/Slideshow.vue"
export default {
  name: "O nama",

  components: {
    Slideshow,
  }
}
</script>

<style lang="scss">
.about-us-wrap {
  @apply my-10;
}
</style>