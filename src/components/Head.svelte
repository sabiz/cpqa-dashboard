<script lang="ts">

    import AndroidMeta from "./meta/AndroidMeta.svelte";
    import BaseMeta from "./meta/BaseMeta.svelte";
    import IosMeta from "./meta/IosMeta.svelte";

    import BaseLink from "./links/BaseLink.svelte";
    import IosLink from "./links/IosLink.svelte";
import AndroidLink from "./links/AndroidLink.svelte";

</script>


<svelte:head>
	<title>cpqa Dashboard</title>
    <BaseMeta />
    <AndroidMeta />
    <IosMeta />

    <BaseLink />
    <AndroidLink />
    <IosLink />
</svelte:head>
