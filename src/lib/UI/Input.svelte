<script>
	const props = $props();
</script>

<div class="w-full">
	<label class="block text-sm font-medium text-gray-500" for={props.id}>
		{props.lable}
	</label>

	<input
		{...props}
		class="mt-1 w-full rounded-xl border-gray-200 bg-white text-xs text-gray-700 shadow-xs"
		id={props.id}
	/>
</div>