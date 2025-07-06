


process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) {
    // Suppress this warning
    return;
  }
  // Print all other warnings
  console.warn(warning);
});