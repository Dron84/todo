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
            getTodo(){
                //Получение листа из vuex store
                return this.$store.getters.getTodoList
            },
            onedit(item) {
                //Переход в редкатирование в To Do листе
                this.editTaskShow = true
                this.addTaskShow = false
                this.editTask=item
            },
            ondelete(item) {
                //Удалени в To Do листе для модального окна
                this.modal= {
                    modalHeader: 'Удалить ToDo',
                    modalShow: true,
                    successText: 'Удалить',
                    errorText: 'Отменить',
                    successShow: true,
                    errorShow: true,
                }
                this.$store.dispatch('modalData',{whatDo: 'delete', data: item})
                this.addTaskShow =false
                this.editTaskShow = false
            },
            onCancel(){
                //Отменить изменения в To Do листе для модального окна
                this.modal = {
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
                // Управление окном Добавление элемента
                this.addTaskShow = !this.addTaskShow
                this.editTaskShow = false
            },
            addTask(item){
                this.$store.dispatch('addItem', item) // Добавление элемента
            },
            removeItem(){
                this.ondelete(this.editTask) // удаление элемента
            },
            modalClick(type) {
                //модальный клик по кнопки потверждения
                if (type === 'success') {
                    this.modal.modalShow = false
                    const data = this.$store.getters.getModalData // получение данных из модалки
                    if(data.whatDo ==='delete'){//если происходило удаление элемента
                        this.$store.dispatch('deleteItem',data.data)
                        this.editTaskShow = false
                    }else if(data.whatDo==='cancel'){//если происходило отмена изменений элемента
                        this.editTaskShow = false
                    }
                } else { //модальный клик по кнопки отмены
                    this.modal.modalShow = false
                }
            }
        },
        mounted(){
            this.$store.dispatch('getTodo')
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
