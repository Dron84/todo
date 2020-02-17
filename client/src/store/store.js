import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        todolist: [],
        modal: {
            data: {}
        }
    },
    mutations: {
        modalData: (state,newValue)=>{
            state.modal.data = newValue
        },
        deleteItem: (state,item)=>{
            state.todolist = state.todolist.filter(row =>row.id === item.id ? false: true)
        },
        addItem: (state,item)=>{
            state.todolist.push(item)
        }
    },
    actions:{
        deleteItem(state,item){
            state.commit('deleteItem',item)
        },
        addItem(state,item){
            axios.post(`${this.$api_url}/todolist`,item).then(res=>{
                if(res.data!==undefined){
                    state.commit('addItem',item)
                }
            })

        },
        getTodo(state){
            axios.get(`${this.$api_url}/todolist`).then(res=>{
                state.todolist = res.data
                console.log('getTodoList data',res.data)
            })
        }
    },
    getters: {
        getTodoList: state=>{
            return state.todolist
        },
        getModalData: state=>{
            return state.modal.data
        }
    }
})
