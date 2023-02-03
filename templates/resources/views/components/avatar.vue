<template>
    <div
        class="avatar"
        :style="[avatarStyle]"
    >
        <avatar-image
            v-if="type === 'image'"
            :src="displayValue"
            :size="size"
            :shadow="shadow"
        ></avatar-image>
        <avatar-text
            v-else-if="type === 'character'"
            :size="size"
        >
            {{ name }}
        </avatar-text>
        <avatar-shape
            v-else
            :name="'shape-' + shapeKey"
            :size="size"
        ></avatar-shape>
    </div>
</template>

<script>
import { BACKGROUND_COLORS, SHAPE_COLORS, TEXT_COLORS } from '@/scripts/helpers/definitions/avatarColors';
import { random } from '@/scripts/helpers/random';
import avatarImage from '@/views/components/avatar/avatarImage';
import avatarShape from '@/views/components/avatar/avatarShape';
import avatarText from '@/views/components/avatar/avatarText';

export default {
    name:       'avatar',
    components: {
        avatarImage,
        avatarText,
        avatarShape,
    },
    props:      {
        type:         { type: String, default: 'character' },
        displayValue: { type: String, required: false },
        value:        { type: String, required: true },
        radius:       { type: [String, Number], required: false },
        size:         { type: [String, Number], default: 32 },
        shadow:       { type: Boolean, default: false },
        invert:       { type: Boolean, default: false },
        border:       { type: Boolean, default: false },
        borderSize:   { type: [String, Number], default: 2 },
        borderColor:  { type: String, default: '#fff' },
    },
    data () {
        return {
            inverted: this.invert ? this.invert : random({ value: this.value, min: 0, max: 1 }) === 1,
            name:     String(this.displayValue || this.value).substring(0, 2),
            colorKey: random({ value: this.value, min: 0, max: 19 }),
            shapeKey: random({ value: this.value, min: 1, max: 60 }),
        };
    },
    computed: {
        avatarStyle () {
            let bgColor = this.invert
                ? this.type === 'character'
                    ? '#' + TEXT_COLORS[ this.colorKey ]
                    : '#' + SHAPE_COLORS[ this.colorKey ]
                : '#' + BACKGROUND_COLORS[ this.colorKey ];
            let fgColor = this.invert
                ? '#' + BACKGROUND_COLORS[ this.colorKey ]
                : this.type === 'character'
                    ? '#' + TEXT_COLORS[ this.colorKey ]
                    : '#' + SHAPE_COLORS[ this.colorKey ];
            return {
                '--avatar-bg': bgColor,
                '--avatar-fg': fgColor,
                width:         this.size + 'px',
                height:        this.size + 'px',
                borderRadius:  ( this.radius || this.size ) + 'px',
                border:        this.border ? this.borderSize + 'px solid ' + this.borderColor : 'none',
                boxShadow:     this.shadow
                                   ? '0px 1px 1px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.15)'
                                   : 'none',
            };
        },
    },
};
</script>

<style
    lang="scss"
    scoped
>
.avatar {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    &:hover { z-index: 3 }

    background-color: var(--avatar-bg);
    color: var(--avatar-fg);
}
</style>
