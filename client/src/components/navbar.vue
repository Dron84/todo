<template>
    <nav class="nav">
        <div class="brand">ToDo list</div>
        <div class="button" @click="addClick" :class="{'exit': taskShow}"><i class="flaticon-add" title="Добавить"></i></div>
    </nav>
</template>

<script>
    export default {
        name: "navbar",
        methods:{
            addClick(){
                this.$emit('add')
            }
        },
        props:{
            taskShow: {type: Boolean, default: false}
        }
    }
</script>

<style scoped lang="sass">
@import "../assets/vars"
.nav
    height: 50px
    width: 100%
    display: grid
    grid-template-columns: 1fr 80px
    grid-template-areas: 'brand addButton'
    background-color: rgba($nav_bg,.5)
    color: $nav_text_color
    .brand
        grid-area: brand
        align-self: center
        justify-self: center
        font-size: 1.4rem
    .button
        grid-area: addButton
        align-self: center
        justify-self: center
        transition: all .4s ease-in-out
        &:hover
            cursor: pointer
            color: rgba($nav_text_color, .7)
        &.exit
            transform: rotateZ(45deg)
            top: -8px
</style>