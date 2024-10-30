<template>
  <div class="qr-scanner-container">
    <QRCodeScanner :onScan="validateUrlSafety" />
    <div v-if="safetyStatus">{{ safetyStatus }}</div>
  </div>
</template>

<script setup>
const safetyStatus = ref(null);

const validateUrlSafety = async (url) => {
  try {
    const response = await fetch('/api/validate-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || data);
    }

    safetyStatus.value = data.message;
    if (data.status === 'SAFE') {
      window.location.href = url; // Redirect to the safe URL
    }
    console.log(data);
  } catch (error) {
    console.error(error);
    safetyStatus.value = error.message || 'Error validating URL';
  }
};
</script>


<style>
.qr-scanner-container {
  margin: auto;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid black;
  background: white;
  color: black;
  min-width: 300px;
  text-align: center;
}
</style>
