<script>
 import ButterflyInput from '$lib/UI/butterflyInput.svelte';
 import MainLayout from '$lib/UI/mainLayout.svelte';
 import TheBigButton from '$lib/UI/theBigButton.svelte';
 import { onMount } from 'svelte';
 import { user } from '$lib/AppWrite/user.js';
 import { goto } from '$app/navigation';

 let { data, imgSrc } = $props();
 let session = $state({});
 let OTPInputs = [];
 let otp = ['', '', '', '', '', ''];
 let otpSent = false;

 onMount(() => {
  if (!otpSent) {
   sendOTP();
   otpSent = true;
  }
 });

 async function sendOTP() {
  try {
   session = await user.createOtp(data.Email);
  } catch (error) {
   alert(`Error sending OTP: ${error.message}`);
  }
 }

 $effect(() => OTPInputs = Array.from(document.querySelectorAll('.otp input')));

 function handleKeyUp(event, index) {
  const { keyCode, target } = event;
  const value = target.value;

  otp[index] = value;

  if (keyCode === 8 || keyCode === 37) {
   if (index > 0 && !value) {
    OTPInputs[index - 1].focus();
   }
  } else if (value && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 105) || keyCode === 39)) {
   if (index < OTPInputs.length - 1) {
    OTPInputs[index + 1].focus();
   }
  }
 }

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
   await user.createUser(data, session, otp.join(''));
   await goto('/portal');
  } catch (error) {
   alert(error.message);
  }
 }
</script>

<MainLayout {imgSrc}>
 {#snippet aboveImage()}
  <div class="newUserPageAboveImage">
   <h1>Verify Your Account</h1>
   <h4>Enter the OTP Sent to Your Email</h4>
   <p>Hi, {data.Name}! You will receive a 6-digit One-Time Passcode (OTP) at your email address: <b>{data.Email}</b>. Please enter the OTP to proceed. If you can't find the email, check your Spam or Junk folder. Ensure the email is from the <b style="font-weight: bolder; text-decoration: underline">EaglesEye24</b> team and contains the security phrase:
    <b style="font-weight: bolder; text-decoration: underline; color: red">'{session.phrase || 'loading'}'</b> at the bottom before entering the OTP.</p>
  </div>
 {/snippet}
 {#snippet right()}
  <form class="newUserPageRight" style="justify-content: center !important; gap: 2vh" onsubmit={handleSubmit}>
   <ButterflyInput name="Enter the OTP You Received" type="email" disabled value={data.Email} />
   <div class="otp">
    {#each Array(6) as _, i}
     <ButterflyInput
      type="number"
      maxlength="1"
      style="width: 3.5vw; height: 3.5vw; font-size: 2vw;"
      onkeyup={(event) => handleKeyUp(event, i)}
     />
    {/each}
   </div>
   <h3 class="aboutOTP">
    The email you received must be from the <b style="font-weight: bolder; text-decoration: underline">EaglesEye24</b> team and contain the phrase <b style="font-weight: bolder; text-decoration: underline; color: red">'{session.phrase || 'loading'}'</b>. Can't find it? Check your Junk/Spam folder—it might have taken a detour!
   </h3>
   <TheBigButton title="Verify & Take Off!" type="submit" />
  </form>
 {/snippet}
</MainLayout>