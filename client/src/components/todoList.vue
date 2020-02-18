<template>
    <div class="list">
        <div class="item" :class="item.color" v-for="item in todolist" :key="item.id">
            <div class="description">
                <span class="name">{{item.name}}</span>
                <div class="description_list">
                    <div class="desc_item" v-for="row in item.list" :key="row.name">
                        <checkbox :checked="row.done" :id="row.name.replace(' ','_')" :disabled="true" :caption="row.name" />
                    </div>
                </div>
            </div>
            <div class="flaticon-edit" title="Редактировать" @click="openEdit(item)"></div>
            <div class="flaticon-delete" title="Удалить" @click="openDelete(item)"></div>
        </div>
    </div>
</template>

<script>
    import checkbox from '@/components/checkbox'

    export default {
        name: "todoList",
        components:{checkbox},
        props: {
            todolist: null
        },
        methods: {
            openEdit(item){
                //событие редактирование и проброс выше
              this.$emit('Edit', item)
            },
            openDelete(item){
                //событие удаление и проброс выше
              this.$emit('Delete', item)
            },
        }
    }
</script>

<style scoped lang="sass">
@import "../assets/vars"


@media (max-width: 760px)
    .list
        display: block
        height: auto
        .item
            height: auto
            background-color: $default_bg
            position: relative
            display: grid
            grid-template-columns: 1fr repeat(2,40px)
            grid-template-areas: 'desc edit delete'
            align-items: center
            padding: 0 30px
            min-height: 50px
            max-height: 120px
            overflow: hidden
            &::before
                content: ''
                position: absolute
                top: 0
                left: 0
                width: 4px
                height: 100%
                background-color: $accent_default
            .description
                display: grid
                grid-area: desc
                grid-template-columns: 1fr 2fr
                .description_list
                    display: grid
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))
                    font-size: 1rem
                    opacity: .6
                    div.desc_item:nth-child(n+2)
                        display: none
            .flaticon-edit
                grid-area: edit
            .flaticon-delete
                grid-area: delete
            .flaticon-edit:hover ,.flaticon-delete:hover
                cursor: pointer
                color: rgba($accent_default,.7)
            &.pink
                background-color: $pink_bg
                color: $pink
                &::before
                    background-color: $accent_pink
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($pink,.7)
            &.orange
                background-color: $orange_bg
                color: $orange
                &::before
                    background-color: $accent_orange
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($orange,.7)
            &.blue
                background-color: $blue_bg
                color: $blue
                &::before
                    background-color: $accent_blue
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($blue,.7)
            &.green
                background-color: $green_bg
                color: $green
                &::before
                    background-color: $accent_green
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($green,.7)
@media (min-width: 761px )
    .list
        display: flex
        grid-template-rows: 50px
        .item
            width: 250px
            height: 200px
            background-color: $default_bg
            position: relative
            display: grid
            grid-template-columns: 1fr
            grid-template-areas: 'desc desc' 'edit delete'
            grid-template-rows: 1fr 50px
            align-items: center
            padding: 0 30px !important
            border-radius: 5px
            margin: 25px
            &::before
                content: ''
                position: absolute
                top: 0
                left: 0
                width: 4px
                height: 100%
                background-color: $accent_default
            .description
                display: grid
                grid-area: desc
                .description_list
                    display: grid
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
                    font-size: 1rem
                    margin: 10px
                    opacity: .6
                    div.desc_item:nth-child(n+3)
                        display: none
                    div.desc_item:nth-child(2n)
                        &::after
                            content: "..."
                            display: block
                            position: absolute
                            top: 21px
                            width: 20px
                            height: 20px
            .flaticon-edit
                grid-area: edit
            .flaticon-delete
                grid-area: delete
            .flaticon-edit:hover ,.flaticon-delete:hover
                cursor: pointer
                color: rgba($accent_default,.7)
            &.pink
                background-color: $pink_bg
                color: $pink
                &::before
                    background-color: $accent_pink
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($pink,.7)
            &.orange
                background-color: $orange_bg
                color: $orange
                &::before
                    background-color: $accent_orange
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($orange,.7)
            &.blue
                background-color: $blue_bg
                color: $blue
                &::before
                    background-color: $accent_blue
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($blue,.7)
            &.green
                background-color: $green_bg
                color: $green
                &::before
                    background-color: $accent_green
                .flaticon-edit:hover ,.flaticon-delete:hover
                    color: rgba($green,.7)
@media (max-width: 410px)
    .list
        .item
            grid-template-columns: 1fr
            grid-template-areas: 'desc desc' 'edit delete'
            grid-template-rows: 1fr 1fr
            padding: 10px
            height: auto
</style>