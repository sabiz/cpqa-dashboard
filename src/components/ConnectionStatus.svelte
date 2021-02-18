<script lang="ts">
import {onMount} from 'svelte';
import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faHeartBroken);
let className = "";
export { className as class};
export let isConnected = false;


onMount(async () => {
    dom.i2svg();
});

</script>

<style lang="scss">
@import '../style/variable';

.notConnected {
    color: $COLOR_WARNING;
    animation: flash 1s linear infinite;
}

.connected {
    color: #eb6ea5;
}

span {
    display: none;
}
.heart {
    display: inherit;
}

@keyframes flash {
    0%,100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

</style>

<div class="{className}" class:notConnected={!isConnected} class:connected={isConnected}>
        <span class:heart={isConnected}><i class="fas fa-heart"></i></span>
        <span class:heart={!isConnected}><i class="fas fa-heart-broken"></i>Not connected</span>
</div>
