<script lang="ts">
	import Head from '../components/Head.svelte';

	import { onMount } from 'svelte';
	import ValueItem from '../components/ValueItem.svelte';
	import ConnectionStatus from '../components/ConnectionStatus.svelte';
	import ReloadButton from '../components/ReloadButton.svelte';
	import constants from '../common/constants';
	import type MutMessage from '../mut/mutMessage';
	let socket: WebSocket = null;
	let isConnected = false;
	let valueItems = [
		{},{},{},{}
	];

	function createNewSocket() {

		if(socket !== null) {
			socket.close();
		}

		socket = new WebSocket(`ws://${location.hostname}:${constants.WS_SERVER_PORT}`);
		socket.addEventListener("open", onOpenSocket);
		socket.addEventListener("close", onCloseSocket);
		socket.addEventListener("error", onErrorSocket);
		socket.addEventListener("message", onReceive);
	}

	function onReceive(ev: MessageEvent) {
		const msg = JSON.parse(ev.data) as MutMessage;
		valueItems[msg.id] = msg;
	}

	function onOpenSocket(ev) {
		isConnected = true;
	}

	function onCloseSocket(ev: CloseEvent) {
		setTimeout(() => {
			socket = null;
			createNewSocket();
		}, 1000);
		isConnected = false;
	}

	function onErrorSocket(ev) {
		console.error(ev);
		socket.close();
		setTimeout(() => {
			socket = null;
			createNewSocket();
		}, 1000);
	}

	function handleVisibilityChange() {
		if (document.hidden) {

		} else {
			createNewSocket();
		}
	}

	function handleOnline() {
		createNewSocket();
	}

	function init() {
		window.addEventListener("online", handleOnline);
		document.addEventListener("visibilitychange", handleVisibilityChange, false);
		createNewSocket();
	}

	onMount(init);

</script>

<style lang="scss">
	.container {
		height: 100%;
		display: grid;
		grid-template-rows: 50% 50%;
		grid-template-columns: 50% 50%;
	}
	.container-item {
		width: 100%;
	}

	.status {
		top: 0.5vh;
		right: 1.0vw;
		position: absolute;
		display: flex;
		flex-direction: column;

		div {
 		   align-self: flex-end;
		}
	}


</style>

<svelte:head>
	<Head />
</svelte:head>

<div class="container">
	<div class="container-item">
		<ValueItem {...valueItems[0]}/>
	</div>
	<div class="container-item">
		<ValueItem {...valueItems[1]}/>
	</div>
	<div class="container-item">
		<ValueItem {...valueItems[2]}/>
	</div>
	<div class="container-item">
		<ValueItem {...valueItems[3]}/>
	</div>

	<div  class="status">
		<div><ConnectionStatus isConnected={isConnected}/></div>
		<div><ReloadButton /></div>
	</div>
</div>

