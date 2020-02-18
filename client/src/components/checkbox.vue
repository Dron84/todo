<template>
    <div>
        <input type="checkbox" :id="id" style="display: none;" :checked="setCheck" :disabled="disabled">
        <label :for="id" class="check" @click="setCheck = !setCheck">
            <svg width="18px" height="18px" viewBox="0 0 18 18">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
            </svg>
        </label>
        <span class="caption">{{caption}}</span>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        data(){
            return{
                check: false
            }
        },
        props: {
            checked: {type: Boolean, default: false},
            id: {type: String, default: ''},
            disabled: {type: Boolean, default: false},
            caption: {type: String, default: ''}
        },
        computed:{
            setCheck: {
                //возвращаем входное значение
                get(){return this.checked},
                // пробрасываем значение для сохранения
                set(val){this.$emit('value',val)}
            }
        }
    }
</script>

<style lang="sass">
div
    display: inline
    position: relative
    .check
        cursor: pointer
        position: relative
        margin: auto
        width: 18px
        height: 18px
        -webkit-tap-highlight-color: transparent
        transform: translate3d(0, 0, 0)
        &::before
            content: ""
            position: absolute
            top: -15px
            left: -15px
            width: 48px
            height: 48px
            border-radius: 50%
            background: rgba(#223254, .03)
            opacity: 0
            transition: opacity .2s ease
        svg
            position: relative
            z-index: 1
            fill: none
            stroke-linecap: round
            stroke-linejoin: round
            stroke: #C8CCD4
            stroke-width: 1.5
            transform: translate3d(0, 0, 0)
            transition: all .2s ease
            path
                stroke-dasharray: 60
                stroke-dashoffset: 0
            polyline
                stroke-dasharray: 22
                stroke-dashoffset: 66
        &:hover
            &::before
                opacity: 1
            svg
                stroke: #4285F4

    input:checked + .check
        svg
            stroke: #4285F4
            path
                stroke-dashoffset: 60
                transition: all .3s linear
            polyline
                stroke-dashoffset: 42
                transition: all .2s linear
                transition-delay: .15s
    input:disabled + .check:hover, input:checked + .check:hover
        cursor: default
        &::before
            opacity: 0
        svg
            stroke: #C8CCD4
    .caption
        position: relative
        top: -4px
        padding: 4px
</style>