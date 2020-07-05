(async () => {
  await Promise.resolve(
    setImmediate(() => {
      console.log('hello');
    }, 5000)
  );
})();
