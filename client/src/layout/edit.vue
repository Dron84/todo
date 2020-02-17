<template>
    <div class="edit_wrapper">
        <div class="header" :class="task.color">
            <h2>Редактирование таска</h2>
            <div class="close" @click="$emit('editClose')">&times;</div>
        </div>
        <div class="body">
            <add :task="task" @close="$emit('editClose')" @removeItem="$emit('removeItem')" @onCancel="$emit('onCancel')"></add>
        </div>
    </div>
</template>

<script>
    import add from './add'
    export default {
        name: "edit",
        components:{add},
        methods:{

        },
        props:{
            task: {
                name: {type: String},
                color: {type: String},
                list: {type: Array, default: []},
                done: {type: Boolean}
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "../assets/vars"
.header
    display: grid
    grid-template-columns: 1fr 50px
    justify-content: center
    align-content: center
    background: rgba(255,255,255,1)
    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
    background: -webkit-gradient(top, bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)))
    background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
    background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
    background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 )
    text-align: center
.pink
    background-color: $pink_bg
    color: $pink
.orange
    background-color: $orange_bg
    color: $orange
.blue
    background-color: $blue_bg
    color: $blue
.green
    background-color: $green_bg
    color: $green
</style>