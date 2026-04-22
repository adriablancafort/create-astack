declare module 'degit' {
  interface DegitOptions {
    cache?: boolean
    force?: boolean
  }
  function degit(source: string, options?: DegitOptions): { clone(dir: string): Promise<void> }
  export default degit
}
