<script>
	const { userData } = $props();
</script>

<svelte:head>
	<style>
      #image {
          opacity: 1;
          background-image: repeating-radial-gradient(circle at center, transparent 0, #000000 30px), repeating-linear-gradient(#16161655, #161616);
          -webkit-box-shadow: 0px 0px 116px -10px rgba(255, 255, 255, 0.35);
          -moz-box-shadow: 0px 0px 116px -10px rgba(255, 255, 255, 0.35);
          box-shadow: 0px 0px 116px -10px rgba(255, 255, 255, 0.35);
      }

      .book {
          -webkit-box-shadow: 1px 1px 12px #000;
          box-shadow: 1px 1px 12px #000;
          -webkit-transform: preserve-3d;
          -ms-transform: preserve-3d;
          transform: preserve-3d;
          -webkit-perspective: 2000px;
          perspective: 2000px;
          color: #000;
      }

      .cover {
          top: 0;
          position: absolute;
          background-color: lightgray;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          cursor: pointer;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          -webkit-transform-origin: 0;
          -ms-transform-origin: 0;
          transform-origin: 0;
          -webkit-box-shadow: 1px 1px 12px #000;
          box-shadow: 1px 1px 12px #000;
      }

      .book:hover .cover {
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          -webkit-transform: rotatey(-80deg);
          -ms-transform: rotatey(-80deg);
          transform: rotatey(-80deg);
      }

	</style>
</svelte:head>

<section class="min-h-screen w-screen flex flex-col justify-center items-center" id="image">

	<div class="book h-[60vh] rounded-2xl bg-white flex flex-col justify-center items-center text-center p-10 m-5">
		<p class="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">Hello,
			<strong>{userData.aetosMind.team}</strong></p>
		<p class="px-10 pt-5 text-[10px] sm:text-[12px] text-gray-700">
			You are invited to the first round of <strong>Aetos Mind</strong>.<br />
			📅 <b>20<sup>th</sup> of February</b> | ⏰ <b>20:00</b> <br />
			The event will take place here when the time comes. Stay prepared!
		</p>
		<p class="font-serif text-[10px] sm:text-[12px] text-gray-700">Good luck!</p>
		<p class="font-sans text-[10px] text-gray-700 pt-5">Eagles Eye 24 Team</p>
		<img alt="ICAC logo" class="pt-1 w-12 h-auto object-contain filter grayscale"
				 draggable="false" src="/logos/icac.webp" />

		<a
			class="mt-4 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
			href="https://chat.whatsapp.com/IZnHWgxIiho0XwjbYWFiQS">
			<span
				class="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
			Join Whatsapp Group
		</a>

		<div class="cover flex flex-col justify-center items-center text-center">
			<img alt="ICAC logo" class="w-20 h-auto object-contain filter grayscale"
					 draggable="false" src="/logos/icac.webp" />
			<p>Invitation</p>
		</div>
	</div>
</section>