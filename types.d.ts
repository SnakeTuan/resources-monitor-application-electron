// define all types that are shared between the BE and FE
type Statistic = {
    cpuUsage: number,
    ramUsage: number, 
    usedStorage: number,
}

type StaticData = {
    totalStorage: number,
    cpuModel: number,
    totalMemory: number,
}

// typescript: if defined a interface that already exists, it will add the new properties to the existing interface
interface Window {
    electron: {
        subscribeStats: (callback: (stats: Statistic) => void) => void,
        getStats: () => Promise<StaticData>,
    }
}