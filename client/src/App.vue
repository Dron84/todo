<template>
    <div id="app">
        <navbar @add="onAdd" :taskShow="addTaskShow"></navbar>
        <todolist :todolist="getTodo()" @Edit="onedit($event)" @Delete="ondelete($event)" v-if="!addTaskShow && !editTaskShow "></todolist>
        <addTask v-if="addTaskShow" @close="addTaskShow = false" @success="addTask($event)"></addTask>
        <editTask v-if="editTaskShow" @editClose="editTaskShow = false" :task="editTask" @removeItem="removeItem"  @onCancel="onCancel"></editTask>
        <modal
            :header="modal.modalHeader"
            :modalShow="modal.modalShow"
            @modalSuccess="modalClick('success')"
            @modalError="modalClick('error')"
            :buttonSuccess="modal.successText"
            :buttonError="modal.errorText"
            :successShow="modal.successShow"
            :errorShow="modal.errorShow"
            >
        </modal>
    </div>
</template>

<script>
    import navbar from '@/components/navbar'
    import todolist from '@/components/todoList'
    import modal from '@/components/modal'
    import addTask from '@/layout/add'
    import editTask from '@/layout/edit'

    export default {
        name: 'App',
        data() {
            return {
                modal: {
                    modalShow: false,
                    modalHeader: '',
                    successText: 'OK',
                    errorText: 'Отменить',
                    successShow: true,
                    errorShow: true,
                    template: '',
                },
                addTaskShow: false,
                editTaskShow: false,
                editTask: {},
            }
        },
        components: {
            navbar,
            todolist,
            modal,
            addTask,
            editTask,
        },
        methods: {
            getTodo() {
                const {data} = this.$store.dispatch('getTodo')
                if(data){
                    return this.$store.getters.getTodoList
                }
            },
            onedit(item) {
                this.editTaskShow = true
                this.addTaskShow = false
                this.editTask=item
            },
            ondelete(item) {
                this.modal= {
                    modalHeader: 'Удалить ToDo',
                    modalShow: true,
                    successText: 'Удалить',
                    errorText: 'Отменить',
                    successShow: true,
                    errorShow: true,
                }
                this.$store.dispatch('modalData',{whatDo: 'delete', data: item})
                // this.$store.commit('modalData', {whatDo: 'delete', data: item})
                // console.log('item delete', item)
            },
            onCancel(){
                this.modal= {
                    modalHeader: 'Отменить изменения ToDo',
                    modalShow: true,
                    successText: 'Отменить',
                    errorText: 'Вернутся',
                    successShow: true,
                    errorShow: true,
                }
                this.$store.commit('modalData', {whatDo: 'cancel', data: this.editTask})
            },
            onAdd(){
                this.addTaskShow = !this.addTaskShow
                this.editTaskShow = false
            },
            addTask(item){
                this.$store.dispatch('addItem', item)
            },
            removeItem(){
                this.ondelete(this.editTask)
            },
            modalClick(type) {
                if (type === 'success') {
                    this.modal.modalShow = false
                    const data = this.$store.getters.getModalData
                    if(data.whatDo ==='delete'){
                        this.$store.dispatch('deleteItem',data.data)
                        this.editTaskShow = false
                    }else if(data.whatDo==='cancel'){
                        this.editTaskShow = false
                    }
                } else {
                    this.modal.modalShow = false
                }
            }
        },
        mounted(){
            this.getTodo()
        }
    }
</script>

<style lang="sass">
    @import "assets/font/flaticon.css"
    @import "assets/vars"
    body
        margin: 0
        padding: 0
        box-sizing: border-box
    input
        border-radius: 5px
        height: 35px
        margin: 10px 0
        padding: 0 10px 0 10px
        border: 1px solid #ccc
        outline: none
        &.err
            border: 1px solid $pink
    .btn
        min-width: 100px
        height: 35px
        margin: 10px 5px
        border: none
        border-radius: 5px
        outline: none
        &:hover
            cursor: pointer
            color: white
            opacity: .7
    .btn-success
        background-color: $green
    .btn-error
        background-color: $pink
    .btn-danger
        background-color: $accent_orange
    .btn-default
        background-color: $default_bg
        &:hover
            color: black
    .close
        justify-self: center
        align-self: center
        font-size: 1.5rem
        padding: 5px 10px
        border-radius: 5px
        &:hover
            background-color: $pink
            color: white
            cursor: pointer
.onHover
    cursor: pointer
</style>
