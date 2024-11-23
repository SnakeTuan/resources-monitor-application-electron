// define all types that are shared between the BE and FE
type Statistic = {
    cpuUsage: number,
    ramUsage: number, 
    usedStorage: number,
}

type StaticData = {
    totalStorage: number,
    cpuModel: string,
    totalMemory: number,
}

// create a mapping of the events for type checking the ipc
type EvenPayloadMapping = {
    getStatistic: Statistic,
    getStaticData: StaticData,
}

// typescript: if defined a interface that already exists, it will add the new properties to the existing interface
interface Window {
    electron: {
        subscribeStats: (callback: (stats: Statistic) => void) => void,
        getStats: () => Promise<StaticData>,
    }
}