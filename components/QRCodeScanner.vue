<template>
  <div class="scanner-wrapper">
    <div id="reader"></div>
    <div v-if="safetyStatus">{{ safetyStatus }}</div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode';

export default {
  data() {
    return {
      safetyStatus: null,
      html5QrCodeScanner: null,
    };
  },
  async mounted() {
    this.initQrReader();
  },
  methods: {
    initQrReader() {
      const config = { fps: 10, qrbox: 250 }; // Frames per second and scanning box size

      // Initialize the QR scanner instance
      this.html5QrCodeScanner = new Html5QrcodeScanner('reader', config);

      this.html5QrCodeScanner.render(
        (decodedText, decodedResult) => {
          this.html5QrCodeScanner.clear();
          this.validateUrlSafety(decodedText); // Use the decoded QR code content
        },
        (errorMessage) => {
          // Handle scan failure, such as when no QR code is found in the frame
          console.warn(`QR Code scanning error: ${errorMessage}`);
        }
      );
    },
    // Validate the scanned URL with the Google Safe Browsing API
    async validateUrlSafety(url) {
      try {
        const runtimeConfig = useRuntimeConfig();

        const apiKey = runtimeConfig.public.googleSafeBrowsingApiKey;
        const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

        const body = {
          client: {
            clientId: 'your-app',
            clientVersion: '1.0',
          },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }],
          },
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw data?.error ?? data;
        }

        if (data.matches) {
          throw new Error('Unsafe URL detected');
        }
        this.safetyStatus = 'Safe URL';
        window.location.href = url;
      } catch (error) {
        this.safetyStatus = error.message || 'Error validating URL';
      }
    },
  },
  beforeDestroy() {
    // Clean up the QR code scanner instance when component is destroyed
    if (this.html5QrCodeScanner) {
      this.html5QrCodeScanner.clear();
    }
  },
};
</script>

<style scoped>
.scanner-wrapper {
  margin: 20px auto;
  padding: 10px;
  border: 1px solid black;
  background: white;
  color: black;
  min-width: 300px;
  text-align: center;
}
</style>