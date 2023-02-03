<template>
    <div
        class="avatar-text"
        :style="[shapeStyle]"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:     'avatarText',
    props:    {
        color: { type: String, required: false },
        size:  { type: [String, Number], default: 32 },
    },
    computed: {
        shapeStyle() {
            return {
                color:    this.color ? this.color : 'currentColor',
                fontSize: Math.round(this.size / 100 * 37) + 'px',
            };
        },
    },
};
</script>

<style
    lang="scss"
    scoped
>
.avatar-text {
    margin: 0;
    padding: 0;
    text-align: center;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 0;
    text-transform: uppercase;
    font-weight: 600;
}
</style>
