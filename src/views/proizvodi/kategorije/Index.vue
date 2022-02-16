<template>
    <div id="kategorije-index">
        <div id="kategorije">Ovo su {{ category }} haaaa</div>
        <ul>
            <li>
                <router-link to="/proizvodi/kategorije/majice">Majice</router-link>
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/obuca">Obuća</router-link>
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/rukavice">Rukavice</router-link>
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/zastita-sluha">Zaštita sluha</router-link>
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/zastita-za-oci">Zaštita za oči</router-link>
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/respiratorna-zastita"
                    >Respiratorna zaštita</router-link
                >
            </li>
            <li>
                <router-link to="/proizvodi/kategorije/ostalo">Ostalo</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            category: "",
        }
    },

    created() {
        let routeId: string = this.$route.params.id;
        this.category = routeId;
    }
};
</script>

<style lang="scss"></style>
