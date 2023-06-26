declare global {
    interface Navigator {
        standalone: boolean;
    }
}
export const isInstalled = (): boolean => (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);