<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';

    export let name: string = '---';
    export let value: number = 0;
    export let unit: string = '';

    $: formatValue = Number.isInteger(value)? value: value.toFixed(1);

    const BASE_FONT_SIZE = 14;
    let rootElm: HTMLElement;
    let valueElm: HTMLElement;

    function fitFont() {
        const valueBox = valueElm.getBoundingClientRect();
        if(valueBox.width < rootElm.clientWidth*0.8
            && valueBox.height < rootElm.clientHeight*0.8) {
                let currentFont = parseInt(valueElm.style.fontSize.replace('px', ''));
                currentFont+=1;
                valueElm.style.fontSize = `${currentFont}px`;
                fitFont();
        } else if(valueBox.width > rootElm.clientWidth*0.8
            && valueBox.height > rootElm.clientHeight*0.8) {
                let currentFont = parseInt(valueElm.style.fontSize.replace('px', ''));
                currentFont-=1;
                valueElm.style.fontSize = `${currentFont}px`;
                fitFont();
        }
    }

    onMount(() => {
        valueElm.style.fontSize = `${BASE_FONT_SIZE}px`;
        setTimeout(()=>{
            fitFont();
        }, 100);
    });

    afterUpdate(() => {
        fitFont();
    });

</script>

<style lang="scss">
@import '../style/variable';
$margin-size: 5%;

.root {
    overflow: hidden;
    height: 100%;
    font-size: 2vw;
    position: relative;
    padding-right: 5em;
    text-align: right;
}
.name {
    color: $COLOR_NAME;
    position: absolute;
    top: $margin-size;
    left: $margin-size;
    text-transform: uppercase;
}

.value {
    display: inline;
}

.unit {
    color: $COLOR_UNIT;
    position: absolute;
    bottom: $margin-size;
    right: $margin-size;
    font-size: 2em;
}
</style>

<div class="root" bind:this={rootElm}>
    <div class="name">{name}</div>
    <div class="value" id="value-elm" bind:this={valueElm}>{formatValue}</div>
    <div class="unit">{unit}</div>
</div>
