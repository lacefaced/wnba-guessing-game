/* Google Analytics (GA4) for the whole site.
 *
 * Paste your Measurement ID (looks like G-XXXXXXXXXX) between the quotes below.
 * Get it from analytics.google.com -> Admin -> Data streams -> your web stream.
 * While it's blank, this file does nothing.
 */
(function () {
  var MEASUREMENT_ID = 'G-Q1YJWG38CE';

  if (!MEASUREMENT_ID || MEASUREMENT_ID.indexOf('G-') !== 0) return;
  if (location.protocol === 'file:') return; // skip when opened as a local file

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(tag);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);
})();
