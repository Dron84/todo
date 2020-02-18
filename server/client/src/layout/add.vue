<template>
    <div class="added">
        <input type="text" v-model="task_name" placeholder="Имя задачи" @change="add_history" ref="task_name_input">
        <colorSelectBox :color="task_color" @value="setColor($event)"></colorSelectBox>
        <div class="add">
            <input type="text" v-model="added_name" placeholder="Что сделать" ref="subtask_name" @change="add_history">
            <button class="btn btn-success" @click="addObj">Добавить</button>
        </div>
        <list :list="add_list" @remItem="remItem($event)"></list>
        <div class="footer">
            <button class="btn btn-default" @click="back_history" v-if="historysIndex>0">Вернуть</button>
            <button class="btn btn-success" @click="onSuccess()">Сохранить</button>
            <button class="btn btn-danger" @click="$emit('removeItem')" v-if="checkTask()">Удалить</button>
            <button class="btn btn-error" @click="$emit('onCancel')" v-if="checkTask()">Отменить</button>
            <button class="btn btn-default" @click="next_history" v-if="historysIndex<historys.length-1">Повторить</button>
        </div>
    </div>
</template>

<script>
    import list from '@/components/list'
    import colorSelectBox from '@/components/colorSelectBox'

    export default {
        name: "add",
        components:{list,colorSelectBox},
        data(){
            return{
                task_name: '',
                task_color: '',
                added_name:'',
                add_list:[],
                task_done: false,
                historys: [],
                historysIndex: 0,
            }
        },
        props:{
            task: {
                name: {type: String, default: ''},
                color: {type: String, default: ''},
                list: {type: Array, default: []},
                done: {type: Boolean}
            }
        },
        methods:{
            addObj(){
                //проверяем имя заполнено или нет
                if(this.added_name!==''){
                    //удаляем класс если была ошибка
                    this.$refs.subtask_name.classList.remove('err')
                    // добавляем в таск задачу
                    this.add_list.push({
                        name: this.added_name,
                        done: false,
                    })
                    //отчищаем поля названия задачи
                    this.added_name = ''
                    // добавляем историю
                    this.add_history()
                    //возвращаем индекс к последнем изменениям
                    this.historysIndex = this.historys.length - 1
                }else{
                    //добавляем класс так как была ошибка поля пустое
                    this.$refs.subtask_name.classList.add('err')
                }
            },
            remItem(index){
                // удаляем задачу
                this.add_list = this.add_list.filter((item,id)=>id===index ? false: true)
                // добавляем изменения в историю
                this.add_history()
            },
            checkTask(){
                // проверка в добавлении мы или в редактировании
                if(this.task===undefined){
                    return false
                }else{
                    return true
                }
            },
            loadData(){
                if(this.task!==undefined){
                    // загружаем данные если мы в редактировании
                    this.task_name = this.task.name
                    this.task_color = this.task.color
                    this.add_list = this.task.list
                    this.task_done = this.task.done
                }
            },
            setColor(item){
                // меняем цвет таска
                this.task_color = item
                // добавляем это в историю
                this.add_history()
            },
            onSuccess(){
                // сохранение таска
                if(this.task_name !==''){
                    this.$refs.task_name_input.classList.remove('err')
                    this.$emit('success', {
                        id: this._uid,
                        name: this.task_name,
                        color: this.task_color,
                        list: this.add_list,
                        done: this.task_done,
                    })
                    // отчистка полей
                    this.task_name = ''
                    this.task_color = ''
                    this.add_list = []
                    this.task_done = false
                    // закрываем окно
                    this.$emit('close')
                    //добавляем историю
                    this.add_history()
                }else{
                    this.$refs.task_name_input.classList.add('err')
                }

            },
            add_history(){
                this.historysIndex ++
                //добавляем историю в обект истории
                this.historys.push({
                    name: this.task_name,
                    color: this.task_color,
                    added_name: this.added_name,
                    list: this.add_list.slice(),
                    done: this.task_done})
            },
            back_history(){
                // листаем историю назад
                const index = this.historysIndex - 1
                this.task_name = this.historys[index].name
                this.task_color = this.historys[index].color
                this.added_name = this.historys[index].added_name
                this.add_list = this.historys[index].list.slice()
                this.task_done = this.historys[index].done
                this.historysIndex = index
            },
            next_history(){
                // листаем историю вперед
                const index = this.historysIndex + 1
                this.task_name = this.historys[index].name
                this.task_color = this.historys[index].color
                this.added_name = this.historys[index].added_name
                this.add_list = this.historys[index].list.slice()
                this.task_done = this.historys[index].done
                this.historysIndex = index
            }
        },
        mounted(){
            // загружаем данные
            this.loadData()
            // добавляем в историю
            this.add_history()
        }
    }
</script>

<style scoped lang="sass">
    .added
        display: grid
        padding: 20px
        .add
            display: grid
            grid-template-columns: 1fr 150px
    .footer
        display: flex
        justify-content: center
        margin: 10px

</style>