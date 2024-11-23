import { useEffect, useState } from 'react';

export function useStatistics(dataPointCount: number): Statistic[] {
    const [value, setValue] = useState <Statistic[]> ([]);

    useEffect(() => {
        const unsub = window.electron.subscribeStats((stats) => 
            setValue( (prev) => {
                const newData = [...prev, stats];
                if(newData.length > dataPointCount) {
                    newData.shift();
                }
                return newData;
            })
        );
        return unsub;
    }, []);

    return value;
}