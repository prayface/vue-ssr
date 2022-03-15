<template>
    <div class="ui-dialog ui-dialog-complate" :style="offset" ref="dialog">
        <div class="ui-dialog__title" :style="`top: ${top}px`">
            <div class="ui-container">
                
            </div>
        </div>
        <div class="ui-dialog__close" :style="closeOffset" @click.prevent="closeDlg">X</div>
        <div class="ui-dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, computed, ref } from "vue";
import { props } from "./complate";

export default defineComponent({
    props: props,
    setup(props) {
        const timer = ref<null | NodeJS.Timeout>(null);
        const dialog = ref<null | HTMLElement>(null);
        const offset = computed(() => {
            return `padding: ${props.top}px ${props.right}px ${props.bottom}px ${props.left}px`;
        });
        const closeOffset = computed(() => {
            return `margin-top: ${props.top}px; margin-right: ${props.right}px`;
        });

        const openDlg = () => {
            document.body.style.overflow = "hidden";
            dialog.value && dialog.value.classList.add("ui-dialog__active");
        };

        const closeDlg = () => {
            document.body.style.overflow = "auto";
            if (dialog.value) {
                dialog.value.classList.remove("ui-dialog__active");
                dialog.value.classList.add("ui-dialog__transition");
                timer.value && clearTimeout(timer.value);
                timer.value = setTimeout(() => {
                    dialog.value && dialog.value.classList.remove("ui-dialog__transition");
                    timer.value && clearTimeout(timer.value);
                    timer.value = null;
                });
            }
        };

        onBeforeUnmount(() => {
            document.body.style.overflow = "auto";
            timer.value && clearTimeout(timer.value);
        });

        return {
            dialog,
            offset,
            openDlg,
            closeDlg,
            closeOffset,
        };
    },
});
</script>

<style lang="less" scoped>
@import url('../../dialog.less');
</style>
