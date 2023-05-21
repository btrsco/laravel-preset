<template>
    <span
        class="avatar-shape"
        :style="[shapeStyle]"
    >
        <component :is="name"></component>
    </span>
</template>

<script>

import { defineAsyncComponent as dAC } from 'vue';

export default {
    name:       'avatarShape',
    props:      {
        name:  { type: String, default: 'shape-1' },
        color: { type: String, required: false },
        size:  { type: [String, Number], default: 32 },
    },
    components: {
        'shape-1':  dAC(() => import('@/views/components/avatar/shapes/shape01')),
        'shape-2':  dAC(() => import('@/views/components/avatar/shapes/shape02')),
        'shape-3':  dAC(() => import('@/views/components/avatar/shapes/shape03')),
        'shape-4':  dAC(() => import('@/views/components/avatar/shapes/shape04')),
        'shape-5':  dAC(() => import('@/views/components/avatar/shapes/shape05')),
        'shape-6':  dAC(() => import('@/views/components/avatar/shapes/shape06')),
        'shape-7':  dAC(() => import('@/views/components/avatar/shapes/shape07')),
        'shape-8':  dAC(() => import('@/views/components/avatar/shapes/shape08')),
        'shape-9':  dAC(() => import('@/views/components/avatar/shapes/shape09')),
        'shape-10': dAC(() => import('@/views/components/avatar/shapes/shape10')),
        'shape-11': dAC(() => import('@/views/components/avatar/shapes/shape11')),
        'shape-12': dAC(() => import('@/views/components/avatar/shapes/shape12')),
        'shape-13': dAC(() => import('@/views/components/avatar/shapes/shape13')),
        'shape-14': dAC(() => import('@/views/components/avatar/shapes/shape14')),
        'shape-15': dAC(() => import('@/views/components/avatar/shapes/shape15')),
        'shape-16': dAC(() => import('@/views/components/avatar/shapes/shape16')),
        'shape-17': dAC(() => import('@/views/components/avatar/shapes/shape17')),
        'shape-18': dAC(() => import('@/views/components/avatar/shapes/shape18')),
        'shape-19': dAC(() => import('@/views/components/avatar/shapes/shape19')),
        'shape-20': dAC(() => import('@/views/components/avatar/shapes/shape20')),
        'shape-21': dAC(() => import('@/views/components/avatar/shapes/shape21')),
        'shape-22': dAC(() => import('@/views/components/avatar/shapes/shape22')),
        'shape-23': dAC(() => import('@/views/components/avatar/shapes/shape23')),
        'shape-24': dAC(() => import('@/views/components/avatar/shapes/shape24')),
        'shape-25': dAC(() => import('@/views/components/avatar/shapes/shape25')),
        'shape-26': dAC(() => import('@/views/components/avatar/shapes/shape26')),
        'shape-27': dAC(() => import('@/views/components/avatar/shapes/shape27')),
        'shape-28': dAC(() => import('@/views/components/avatar/shapes/shape28')),
        'shape-29': dAC(() => import('@/views/components/avatar/shapes/shape29')),
        'shape-30': dAC(() => import('@/views/components/avatar/shapes/shape30')),
        'shape-31': dAC(() => import('@/views/components/avatar/shapes/shape31')),
        'shape-32': dAC(() => import('@/views/components/avatar/shapes/shape32')),
        'shape-33': dAC(() => import('@/views/components/avatar/shapes/shape33')),
        'shape-34': dAC(() => import('@/views/components/avatar/shapes/shape34')),
        'shape-35': dAC(() => import('@/views/components/avatar/shapes/shape35')),
        'shape-36': dAC(() => import('@/views/components/avatar/shapes/shape36')),
        'shape-37': dAC(() => import('@/views/components/avatar/shapes/shape37')),
        'shape-38': dAC(() => import('@/views/components/avatar/shapes/shape38')),
        'shape-39': dAC(() => import('@/views/components/avatar/shapes/shape39')),
        'shape-40': dAC(() => import('@/views/components/avatar/shapes/shape40')),
        'shape-41': dAC(() => import('@/views/components/avatar/shapes/shape41')),
        'shape-42': dAC(() => import('@/views/components/avatar/shapes/shape42')),
        'shape-43': dAC(() => import('@/views/components/avatar/shapes/shape43')),
        'shape-44': dAC(() => import('@/views/components/avatar/shapes/shape44')),
        'shape-45': dAC(() => import('@/views/components/avatar/shapes/shape45')),
        'shape-46': dAC(() => import('@/views/components/avatar/shapes/shape46')),
        'shape-47': dAC(() => import('@/views/components/avatar/shapes/shape47')),
        'shape-48': dAC(() => import('@/views/components/avatar/shapes/shape48')),
        'shape-49': dAC(() => import('@/views/components/avatar/shapes/shape49')),
        'shape-50': dAC(() => import('@/views/components/avatar/shapes/shape50')),
        'shape-51': dAC(() => import('@/views/components/avatar/shapes/shape51')),
        'shape-52': dAC(() => import('@/views/components/avatar/shapes/shape52')),
        'shape-53': dAC(() => import('@/views/components/avatar/shapes/shape53')),
        'shape-54': dAC(() => import('@/views/components/avatar/shapes/shape54')),
        'shape-55': dAC(() => import('@/views/components/avatar/shapes/shape55')),
        'shape-56': dAC(() => import('@/views/components/avatar/shapes/shape56')),
        'shape-57': dAC(() => import('@/views/components/avatar/shapes/shape57')),
        'shape-58': dAC(() => import('@/views/components/avatar/shapes/shape58')),
        'shape-59': dAC(() => import('@/views/components/avatar/shapes/shape59')),
        'shape-60': dAC(() => import('@/views/components/avatar/shapes/shape60')),
    },
    computed:   {
        shapeStyle () {
            return {
                color:    this.color ? this.color : 'currentColor',
                maxWidth: Math.round(this.size / 100 * 50) + 'px',
            };
        },
    },
};
</script>

<style
    lang="scss"
    scoped
>
.avatar-shape {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    width: 100%;

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
