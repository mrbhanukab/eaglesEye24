<script>
 import ButterflyInput from '$lib/UI/butterflyInput.svelte';
 import MainLayout from '$lib/UI/mainLayout.svelte';
 import TheBigButton from '$lib/UI/theBigButton.svelte';
 import { onMount } from 'svelte';
 import { user } from '$lib/AppWrite/user.js';

 let { email } = $props();
 let userId = $state(null);
 let inputs = [];
 let otp = ['', '', '', '', '', ''];

 async function sendOTP() {
  try {
   const sessionToken = await user.createOtp(email);
   userId = sessionToken.userId;
  } catch (error) {
   console.error('Error sending OTP:', error);
  }
 }

 function handleKeyUp(event, index) {
  const { keyCode, target } = event;
  const value = target.value;

  otp[index] = value;

  if (keyCode === 8 || keyCode === 37) {
   if (index > 0 && !value) {
    inputs[index - 1].focus();
   }
  } else if (value && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 105) || keyCode === 39)) {
   if (index < inputs.length - 1) {
    inputs[index + 1].focus();
   }
  }
 }

 onMount(() => {
  inputs = Array.from(document.querySelectorAll('.otp input'));
  sendOTP();
 });

 async function handleSubmit(event) {
  event.preventDefault();
  const otpValue = otp.join('');

  try {
   const currentSession = await user.getCurrentSession();
   if (currentSession) {
    await user.logout();
   }
   const session = await user.verifyOtp(userId, otpValue);
   alert('Verification successful!');
  } catch (error) {
   console.error('There was an error!', error);
   alert('Error');
  }
 }

</script>

<style>
 .otp {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1vw;
 }
 .aboutOTP {
  width: 75%;
  text-align: center;
  color: white;
  font-family: Comfortaa, sans-serif;
  font-weight: lighter;
  font-size: 1vw;
  line-height: 2.6vh;
 }
 .OTPsection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 }
 @media (max-width: 450px), (max-height: 350px) {
  .otp {
   width: 80%;
  }
  .aboutOTP {
   font-size: 2.5vw;
   line-height: normal;
  }
  .newUserPageRight{
   width: 80% !important;
  }
 }
</style>

<MainLayout imgSrc="/left/verify.jpeg">
 {#snippet aboveImage()}
  <div class="newUserPageAboveImage">
   <h1>Verify Your Account</h1>
   <h4>Enter the OTP Sent to Your Email</h4>
   <p>
    We’ve sent a One-Time Password (OTP) to the email address you provided earlier {email}.
    Check your inbox and enter the 6-digit code to complete the verification process. If you can’t find the email,
    please check your spam or junk folder.
   </p>
  </div>
 {/snippet}
 {#snippet right()}
  <form class="newUserPageRight" onsubmit={handleSubmit}>
   <section class="OTPsection">
    <div class="otp">
     {#each Array(6) as _, i}
      <ButterflyInput
       type="text"
       maxlength="1"
       style="width: 3.5vw; height: 3.5vw; font-size: 2vw;"
       onkeyup={(event) => handleKeyUp(event, i)}
      />
     {/each}
    </div>
    <h3 class="aboutOTP">
     We've sent a One Time Passcode to {email}.
     It should arrive from eaglesEye24 team. Can't find it? Check your junk/spam folder—sometimes messages take a detour!
    </h3>
   </section>
   <TheBigButton title="Verify & Take Off!" type="submit" />
  </form>
 {/snippet}
</MainLayout>