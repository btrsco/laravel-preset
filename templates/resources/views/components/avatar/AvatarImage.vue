<template>
    <div
        class="relative z-[1] w-full h-full bg-cover bg-center bg-no-repeat rounded-full"
        :style="[background]"
    ></div>
</template>

<script>
export default {
    name:     'avatarImage',
    props:    {
        src:  { type: String, required: true },
        size: { type: [String, Number], default: 32 },
    },
    computed: {
        background () {
            return {
                backgroundImage: 'url(' + this.src + ')',
                backgroundColor: 'var(--avatar-bg)',
            };
        },
    },
};
</script>
