export function disableConsoleMethods() {
  ["log", "error", "warn", "info", "debug"].forEach((method) => {
    console[method] = () => {};
  });
}
