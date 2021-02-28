declare global {
  interface Window {
    ethereum: { send: (_: string) => void };
  }
}
export {};
