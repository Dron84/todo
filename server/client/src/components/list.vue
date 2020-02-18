<template>
    <div class="list" v-if="list.length>0">
        <div class="item" v-for="(item,index) in list" :key="index">
            <div @click="item.done = !item.done" class="onHover">
                <checkbox :checked="item.done" :caption="item.name" @value="item.done= $event"/>
            </div>
            <button class="remove" @click="remItem(index)" title="Удалить">&times;</button>
        </div>
    </div>
</template>
<script>
    import checkbox from '@/components/checkbox'
    export default {
        name: 'list',
        components:{checkbox},
        data(){
            return{
            }
        },
        props: {
            list: {type: Array}
        },
        methods:{
            remItem(index){
                //событие удаления и проброс выше
                this.$emit('remItem',index)
            }
        },
    }
</script>
<style scoped lang="sass">
    @import "../assets/vars"
    .list
        border: 1px solid #ccc
        border-radius: 5px
        display: grid
        padding: 5px
        .item
            display: grid
            align-items: center
            height: 40px
            grid-template-columns: 1fr 30px
            padding: 5px
        .item:nth-child(2n)
            background-color: rgba(#ccc,.3)
    .remove
        width: 20px
        height: 20px
        border-radius: 5px
        &:hover
            background-color: $pink
            color: white
            cursor: pointer
</style>
