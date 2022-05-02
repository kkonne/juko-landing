<template>
    <div id="o-nama">
        <div class="about-us-wrap container">
            <h1 class="headline">About us</h1>

            <div class="subtitle">You can learn more about us below</div>

            <section class="section history">
                <div class="section-title">
                    <div class="line"></div>
                    <div class="text">Origin</div>
                </div>

                <div class="section-content">
                    <div class="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum recusandae mollitia totam hic reprehenderit, quia
                        atque laboriosam necessitatibus excepturi at asperiores
                        sapiente laborum odio, nobis distinctio, similique
                        facere dolorum vel maiores neque inventore. Cupiditate
                        quos magnam consectetur, quas libero beatae impedit.
                        Voluptatibus, dolores illum autem nemo modi mollitia ea
                        quod.
                    </div>
                    <div class="icon"></div>
                </div>
            </section>

            <section class="review">
                <h2 class="review-title">Miviko</h2>
                <div class="stars">
                    <Star></Star>
                    <Star></Star>
                    <Star></Star>
                    <Star></Star>
                    <Star></Star>
                </div>
                <blockquote class="quote">
                    "Products that deliver results"
                </blockquote>
            </section>

            <section class="section work">
                <div class="section-title title-right">
                    <div class="line"></div>
                    <div class="text">Culture</div>
                </div>

                <div class="section-content">
                    <div class="icon"></div>
                    <div class="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat totam distinctio, adipisci praesentium ea culpa
                        dignissimos vitae illo veniam amet sapiente nam cum
                        possimus ducimus corrupti quos. Dolorem, adipisci
                        commodi cumque delectus praesentium deleniti expedita
                        ipsa similique, eaque ullam at.
                    </div>
                </div>
            </section>

            <section class="section brands">
                <div class="section-title">
                    <div class="line"></div>
                    <div class="text">Brands</div>
                </div>

                <div class="section-content">
                    <div class="text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Unde eligendi debitis veritatis eius repellendus
                        odio ipsum illo fugit soluta tenetur cum, vero dolore
                        beatae harum suscipit facere officiis distinctio amet
                        perferendis nihil eos rerum quibusdam aliquam! Atque,
                        veritatis fuga! Ea alias harum sint molestiae repellat.
                    </div>
                    <div class="icon"></div>
                </div>

				<Slideshow />
            </section>

			<button class="cta-button">Let's work together</button>
        </div>
    </div>
</template>

<script lang="ts">
import Slideshow from '@/components/Slideshow.vue';
import { Star } from "mdue";

export default {
    name: 'O nama',

    components: {
        Slideshow,
        Star,
    },
};
</script>

<style lang="scss">
.about-us-wrap {
    @apply my-10;

    .section {
        @apply my-16;

        .section-title {
            @apply mx-4;
            
            .line {
                @apply h-1.5 w-8 bg-red-500 bg-opacity-75;
            }

            .text {
                @apply my-4 uppercase font-bold text-2xl tracking-widest;
            }

            &.title-right {
                .text {
                    @apply text-right;
                }

                .line {
                    @apply ml-auto;
                }
            }
        }

        .section-content {
            @apply grid grid-cols-1
            md:grid-cols-2;

            .text {
                @apply tracking-wide;
            }
        }
    }

    .review {
        @apply bg-gray-500 bg-opacity-30 w-max mx-auto px-20 py-8 
            flex flex-col items-center gap-2 rounded-2xl;

        .review-title {
            @apply tracking-wider font-thin;
        }

        .stars {
            @apply flex gap-x-1 text-yellow-500;
        }

        .quote {
            @apply my-2 italic tracking-tight font-bold;
        }
    }

	.cta-button {
		@apply mt-10 mb-20 py-2 px-6 border uppercase;
	}
}
</style>
