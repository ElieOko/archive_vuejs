<template>
<div>
	<button @click="openLightboxOnSlide(1)">
			Open the lightbox on the first slide.
		</button>

		<button @click="openLightboxOnSlide(2)">
			Open the lightbox on the second slide.
		</button>

		<FsLightbox
      initialAnimation="example-initial-animation"
      :loadOnlyCurrentSource="true"
      :toggler="toggler"
			:slide="slide"
      crossorigin="anonymous"
      type="image"

			:sources="[
				'https://storage.googleapis.com/infinite-strata-226508.appspot.com/GombeIT/Archive-Public/Goma-1695643375-PNG_2023-09-25-13-02-35-653_.png',
				'https://i.imgur.com/fsyrScY.jpg',
				'https://i.imgur.com/fsyrScY.jpg'
			]"
		 />
	</div>
</template>

<script lang="ts">
import { url } from '@/composables/api';
import axios from 'axios';
// @ts-ignore
import FsLightbox from "fslightbox-vue/v3"
// @ts-ignore
import { TailwindPagination } from 'laravel-vue-pagination';

export default {
  components: {
    FsLightbox
  },
  // props: {
  //   data:{
  //   }
  // },
  data() {
    return {
      slide: 1,
      toggler: false
    }
  },

  methods: {
    openLightboxOnSlide(value:number) {
				this.slide = value
				this.toggler = !this.toggler;
			}
  }
}

</script>
<style>
.example-initial-animation {
	animation: initial-animation 2s ease;
}

@keyframes  initial-animation {
	0% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(360deg);
	}

	100% {
		transform: rotate(0deg);
	}
}
</style>