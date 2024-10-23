<template>
  <div id="reader"></div>
</template>


<script setup>
import { Html5QrcodeScanner } from 'html5-qrcode';
const props = defineProps({
  onScan: Function,
});
let html5QrCodeScanner = null;

const handleSuccess = (decodedText, decodedResult) => {
  html5QrCodeScanner.clear();
  props.onScan(decodedText);
};
const handleError = (errorMessage) => {
  console.warn(`QR Code scanning error: ${errorMessage}`);
};

// Initialize the QR reader
const initQrReader = () => {
  const config = { fps: 10, qrbox: 250 };
  html5QrCodeScanner = new Html5QrcodeScanner('reader', config);

  html5QrCodeScanner.render(handleSuccess, handleError);
};

// Initialize the QR scanner when the component is mounted
onMounted(() => initQrReader());

// Clean up the QR code scanner instance when the component is destroyed
onBeforeUnmount(() => {
  if (!html5QrCodeScanner) return;
  html5QrCodeScanner.clear();
});
</script>

