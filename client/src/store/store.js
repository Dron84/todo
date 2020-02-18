import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todolist: null,
        modal: {
            data: {}
        }
    },
    mutations: {
        modalData: (state,newValue)=>{
            //изменение данных модалки
            state.modal.data = newValue
        },
        deleteItem: (state,item)=>{
            //удаляем таск из листа
            state.todolist = state.todolist.filter(row =>row._id === item._id ? false: true)
        },
        addItem: (state,item)=>{
            //дабавляем новый таск в тодо лист
            state.todolist.push(item)
        },
        setTodoList: (state,newValue)=>{
            //вносим изменения в тодо лист
            state.todolist = newValue
        }
    },
    actions:{
        modalData(state,newValue){
            state.commit('modalData',newValue)
        },
        deleteItem(state,item){
            //Удаляем сущществующий таск из БД
            axios.delete(`/todolist/${item._id}`).then(res=>{
                if(res.data.deletedCount === 1){
                    state.commit('deleteItem',item)
                }
            })
        },
        addItem(state,item){
            //добавляем новый таск в БД
            axios.put(`/todolist`,item).then(res=>{
                //добавляем новый таск в приложении
                state.commit('addItem',res.data)
            })

        },
        getTodo(state){
            // получаем список с сервера
            axios.get(`/todolist`).then(res=>{
                const arr = Array.prototype.slice.call(res.data)
                //вносим изменения через мутацию из полученных данных
                state.commit('setTodoList',arr)
            })
        }
    },
    getters: {
        getTodoList: state=>{
            //геттер для получение to do списка из хранилища
            return state.todolist
        },
        getModalData: state=>{
            //геттер для получение данных модалки из хранилища
            return state.modal.data
        }
    }
})
