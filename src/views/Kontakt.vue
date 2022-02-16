<template>
    <div id="contact">
        <div class="contact-main">
            <div class="contact-form container-fluid">
                <form class="contact-form-content container" @submit.prevent="attemptContactFormSubmit()">
                    <h1>Contact us</h1>

                    <p>What may we help you with today?</p>

                    <input type="text" placeholder="Name" />
                    <br />
                    <input type="text" placeholder="Email" />
                    <br />
                    <input type="text" placeholder="Subject" />
                    <br />
                    <textarea type="text" placeholder="Your question..." rows="4" />
                    <br />
                    <button type="submit" class="contact-form-btn">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Kontakt',
    
    setup() {
        let attemptContactFormSubmit = () => {
            console.log("Submitted contact form :)");
        };

        return {
            attemptContactFormSubmit,
        }
    }
};
</script>

<style lang="scss">
.contact-main {
    .contact-form {
        @apply text-gray-700 flex items-center justify-center;

        min-height: calc(100vh - 64px - env(safe-area-inset-bottom));
        background-image: url("https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        .contact-form-content {
            @apply text-center;

            h1 {
                @apply font-bold my-4;
            }

            p {
                @apply md:mx-32 my-2;
            }

            input, textarea {
                @apply w-full my-2 p-2 border border-gray-700 rounded-lg placeholder-gray-700
                outline-none resize-none 
                md:w-1/2
                xl:w-1/3
                focus:bg-gray-200 focus:shadow-lg;

                background-color: #f1f1f180;
            }

            .contact-form-btn {
                @apply w-full p-2 my-2 bg-gray-900 rounded-lg text-gray-300 outline-none
                md:w-1/2
                xl:w-1/3
                focus:shadow-lg focus:text-gray-100;
            }
        }
    }
}
</style>
