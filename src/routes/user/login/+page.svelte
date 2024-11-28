<script>
 import './login.css';
 import MainLayout from '$lib/UI/mainLayout.svelte';
 import ButterflyInput from '$lib/UI/butterflyInput.svelte';
 import TheBigButton from '$lib/UI/theBigButton.svelte';
 import { onMount } from 'svelte';
 import { goto } from '$app/navigation';
 import { user } from '$lib/AppWrite/user.js';
 import Loading from '$lib/UI/loading.svelte';

 let showOTP = false;
 let OTPInputs = [];
 let otp = ['', '', '', '', '', ''];
 let userInputs;
 let session;
 let isCacheComplete = false;
 let verifyImageUrl = '';

 onMount(() => {
  if (showOTP) {
   OTPInputs = Array.from(document.querySelectorAll('.otp input'));
  }
 });

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
  const data = new FormData(event.target);
  userInputs = Object.fromEntries(data.entries());

  if (showOTP) {
     try {
      await user.login(session.userId, otp.join(''));
      await goto('/portal');
     } catch (error) {
       alert(error.message);
     }
  }

  if (!showOTP) {
   session = await user.createOtp(userInputs.Email);
   showOTP = true;
  }
 }

 function handleCacheComplete(event) {
  isCacheComplete = true;
  verifyImageUrl = event.detail.cachedUrls['verify.jpeg'];
 }
</script>

<svelte:head>
 <title>EaglesEye24 | Login</title>
</svelte:head>

{#if !isCacheComplete}
 <Loading on:cacheComplete={handleCacheComplete} />
{:else}
 <MainLayout imgSrc={verifyImageUrl}>
  {#snippet aboveImage()}
    <div class="newUserPageAboveImage">
     <h1>Login to Your Account</h1>
     <h4>Enter your email, and we will send you an OTP</h4>
     <p>Enter your email address to log in. After clicking "Send me the OTP," you'll receive a 6-digit One-Time Password via email. Check your Spam/Junk folder if needed. Ensure the email contains the security phrase at the bottom before entering the OTP</p>
    </div>
  {/snippet}
  {#snippet right()}
   <form class="newUserPageRight" style="justify-content: center !important; gap: 2vh" onsubmit={handleSubmit}>
  <ButterflyInput name={!showOTP ? "Email" : "Enter the OTP You Received"} type="email" disabled={showOTP} />
    {#if showOTP}
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
      The email you received must be from the <b style="font-weight: bolder; text-decoration: underline">EaglesEye24</b> team and contain the phrase <b style="font-weight: bolder; text-decoration: underline; color: red">'{session.phrase}.'</b> Can't find it? Check your Junk/Spam folder—it might have taken a detour!
     </h3>
    {/if}
    <TheBigButton title={!showOTP ? "Send Me the OTP" : "Log Me In"} type="submit" />
   </form>
   {/snippet}
 </MainLayout>
{/if}