<template>
    <component
        :is="'icon-' + name"
        class="flex-shrink-0"
        :class="[iconClasses]"
    ></component>
</template>

<script>

import { defineAsyncComponent as dAC } from 'vue';

export default {
    name:       'icon',
    props:      {
        name: { type: String, required: true },
        size: { type: String, default: 'base' },
    },
    components: {
        'icon-arrow-down':               dAC(() => import('@/views/components/icons/iconArrowDown')),
        'icon-arrow-left':               dAC(() => import('@/views/components/icons/iconArrowLeft')),
        'icon-arrow-right':              dAC(() => import('@/views/components/icons/iconArrowRight')),
        'icon-arrow-up':                 dAC(() => import('@/views/components/icons/iconArrowUp')),
        'icon-chevron-down-small':       dAC(() => import('@/views/components/icons/iconChevronDownSmall')),
        'icon-chevron-left-small':       dAC(() => import('@/views/components/icons/iconChevronLeftSmall')),
        'icon-chevron-right-small':      dAC(() => import('@/views/components/icons/iconChevronRightSmall')),
        'icon-chevron-up-small':         dAC(() => import('@/views/components/icons/iconChevronUpSmall')),
    },
    computed:   {
        iconClasses () {
            switch (this.size) {
                case 'sm':
                    return {
                        'w-4 h-4':       true,
                        'stroke-[2.25]': !this.name.includes('small'),
                        'stroke-[1.5]':  this.name.includes('small'),
                    };
                default:
                    return {
                        'w-6 h-6':         true,
                        'stroke-[1.5]':    !this.name.includes('small'),
                        'stroke-[0.9975]': this.name.includes('small'),
                    };
            }
        },
    },
};
</script>

<style scoped>

</style>
