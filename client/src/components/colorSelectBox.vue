<template>
    <div class="color_wrapper">
        <div class="title" :class="{'show': showBox}" @click="showBox = !showBox" v-if="$isEmpty(selected)">Выбрате цвет</div>
        <div class="title" v-else :class="{'show': showBox}" @click="showBox = !showBox">
            <div class="item">
                <span :class="selected.color"></span>
                <span class="name">{{selected.name}}</span>
            </div>
        </div>
        <div class="list" v-if="showBox">
            <div class="item" v-for="item in list" :key="item.name" @click="selectColor(item)">
                <span :class="item.color"></span>
                <span class="name">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "selectbox",
        data(){
            return{
                showBox: false,
                list: [
                    {name: 'По умолчанию', color: ''},
                    {name: 'Розовый', color: 'pink'},
                    {name: 'Оражевый', color: 'orange'},
                    {name: 'Голубой', color: 'blue'},
                    {name: 'Зеленый', color: 'green'},
                ],
            }
        },
        props: {
            color: {type: String, default: null},
        },
        methods:{
            selectColor(color){
                this.showBox = false
                this.selected = color
            },
        },
        computed:{
          selected:{
              get(){return this.list.filter(item=>item.color===this.color? true: false)[0]},
              set(val){this.$emit('value', val.color)}
          }
        },
    }
</script>

<style scoped lang="sass">
@import "../assets/vars"
.color_wrapper
    display: inline-block
    width: 180px
    height: 33px
.list
    display: grid
    position: absolute
    width: 150px
    top: 35px
    left: 0
    z-index: 999
    background-color: #fff
    border-radius: 5px
.title
    border: 1px solid #cccccc
    display: flex
    border-radius: 5px
    height: 33px
    padding: 0 20px 0 10px
    align-items: center
    &::after
        content: '∆'
        position: absolute
        top: 16px
        right: 5px
        width: 10px
        height: 10px
        transform: rotateX(180deg)
        transition: all .3s ease-in-out
    &.show::after
        top: 8px
        transform: rotateX(0deg)

.item
    padding: 5px 20px
    .pink,.orange,.blue,.green
        border: none
        width: 10px
        height: 10px
        display: inline-block
    .pink
        background-color: $pink
    .orange
        background-color: $orange
    .blue
        background-color: $blue
    .green
        background-color: $green
    .name
        padding-left: 5px
    &:hover
        cursor: pointer
        background-color: rgba($nav_bg,0.3)
</style>