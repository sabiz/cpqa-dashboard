<script lang="ts">
    import {onMount} from 'svelte';
    import {dom, library} from '@fortawesome/fontawesome-svg-core';
    import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
    library.add(faSyncAlt);

    onMount(async () => {
        dom.i2svg();
    });

    function onClick() {
		location.reload();
	}
    </script>
    
    <style lang="scss">
        div {
            display: inline;
        }
    </style>
    
    <div on:click={onClick}>
        <i class="fas fa-sync-alt"></i>
    </div>
    