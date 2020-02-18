<template>
    <div class="modal_wrapper" :class="{'show': modalShow}">
        <div class="modal_container">
            <div class="modal_header">
                <h2>{{header}}</h2>
                <div class="close" @click="modalShow = !modalShow">&times;</div>
            </div>
            <div class="modal_body">
                <slot></slot>
            </div>
            <div class="modal_footer">
                <button class="btn btn-success" v-if="successShow" @click="onSuccess">{{buttonSuccess}}</button>
                <button class="btn btn-error" v-if="errorShow" @click="onError">{{buttonError}}</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "modal",
        props:{
            modalShow: {type: Boolean, default: false},
            header: {type: String, default: ''},
            buttonSuccess: {type: String, default: 'OK'},
            buttonError: {type: String, default: 'Cancel'},
            successShow: {type: Boolean, default: true},
            errorShow: {type: Boolean, default: true},
        },
        methods: {
            onSuccess(){
                //проброс события выше
                this.$emit('modalSuccess', 'click')
            },
            onError(){
                //проброс события выше
                this.$emit('modalError', 'click')
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/vars"
    .modal_wrapper
        display: none
        position: fixed
        background: rgba(0,0,0,.4)
        top: 0
        left: 0
        width: 100%
        height: 100%
        &.show
            display: block
        .modal_container
            position: relative
            max-width: 1200px
            min-width: 280px
            display: block
            margin: 10% auto
            background-color: #fff
            box-shadow: 0 4px 15px 0 rgba(0,0,0,0.75)
            .modal_header
                height: 50px
                display: grid
                grid-template-columns: 1fr 50px
                justify-content: center
                align-content: center
                background: rgba(255,255,255,1)
                background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
                background: -webkit-gradient(top, bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)))
                background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
                background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
                background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
                background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 )
                text-align: center

            .modal_footer
                height: 50px
                display: flex
                position: relative
                justify-content: center
                align-content: center

</style>