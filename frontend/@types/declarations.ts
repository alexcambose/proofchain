declare global {
  interface Window {
    ethereum: { send: (_: string) => void; sendAsync: () => void };
  }
}
export {};
