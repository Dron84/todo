<template>
    <div class="added">
        <input type="text" v-model="task_name" placeholder="Имя задачи" @change="add_history">
        <colorSelectBox :color="task_color" @value="setColor($event)"></colorSelectBox>
        <div class="add">
            <input type="text" v-model="addedName" placeholder="Что сделать" ref="subtask_name" @change="add_history">
            <button class="btn btn-success" @click="addObj">Добавить</button>
        </div>
        <list :list="add_list" @remItem="remItem($event)"></list>
        <div class="footer">
            <button class="btn btn-default" @click="back_history" v-if="historysIndex>0">Вернуть</button>
            <button class="btn btn-success" @click="onSuccess()">Сохранить</button>
            <button class="btn btn-danger" @click="$emit('removeItem')" v-if="checkTask()">Удалить</button>
            <button class="btn btn-error" @click="$emit('onCancel')">Отменить</button>
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
                addedName:'',
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
                if(this.addedName!==''){
                    this.$refs.subtask_name.classList.remove('err')
                    this.add_list.push({
                        name: this.addedName,
                        done: false,
                    })
                    this.addedName = ''
                    this.add_history()
                    this.historysIndex = this.historys.length - 1
                }else{
                    this.$refs.subtask_name.classList.add('err')
                }
            },
            remItem(index){
                this.add_list = this.add_list.filter((item,id)=>id===index ? false: true)
                this.add_history()
            },
            checkTask(){
                if(this.task===undefined){
                    return false
                }else{
                    return true
                }
            },
            loadData(){
                if(this.task!==undefined){
                    this.task_name = this.task.name
                    this.task_color = this.task.color
                    this.add_list = this.task.list
                    this.task_done = this.task.done
                }
            },
            setColor(item){
                this.task_color = item
                this.add_history()
            },
            onSuccess(){
                this.$emit('success', {
                    id: this._uid,
                    name: this.task_name,
                    color: this.task_color,
                    list: this.add_list,
                    done: this.task_done,
                })
                this.task_name = ''
                this.task_color = ''
                this.add_list = []
                this.task_done = false
                this.$emit('close')
                this.add_history()
            },
            add_history(){
                this.historysIndex ++
                this.historys.push({
                    name: this.task_name,
                    color: this.task_color,
                    addedName: this.addedName,
                    list: this.add_list.slice(),
                    done: this.task_done})
            },
            back_history(){
                const index = this.historysIndex - 1
                this.task_name = this.historys[index].name
                this.task_color = this.historys[index].color
                this.addedName = this.historys[index].addedName
                this.add_list = this.historys[index].list.slice()
                this.task_done = this.historys[index].done
                this.historysIndex = index
            },
            next_history(){
                const index = this.historysIndex + 1
                this.task_name = this.historys[index].name
                this.task_color = this.historys[index].color
                this.addedName = this.historys[index].addedName
                this.add_list = this.historys[index].list.slice()
                this.task_done = this.historys[index].done
                this.historysIndex = index
            }
        },
        mounted(){
            this.loadData()
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