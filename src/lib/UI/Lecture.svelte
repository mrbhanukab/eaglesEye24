<script>
	const props = $props();
</script>

<article class="flex-grow">
	<a class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-slate-50"
		 href="https://www.youtube.com/watch?v={props.youtube}">
		<img
			alt={props.title}
			class="h-56 w-full rounded-md object-cover"
			src={props.img}
		/>

		<div class="mt-2">
			<dl>
				<div>
					<dt class="sr-only">Lecture</dt>
					<dd class="font-bold text-lg">{props.title}</dd>
				</div>
				<div>
					<dt class="sr-only">by</dt>
					<dd class="text-sm text-gray-500">by {props.by}</dd>
				</div>
				<div>
					<dt class="sr-only">Date</dt>
					<dd class="text-xs bg-black py-1 px-2 rounded-lg text-white inline-block mt-2">
						{new Date(props.start).getFullYear()}.{String(new Date(props.start).getMonth() + 1).padStart(2, '0')}
						.{String(new Date(props.start).getDate()).padStart(2, '0')}
					</dd>
				</div>
			</dl>
		</div>
	</a>
</article>