

export function groupByArrayByProperty<T>(arr: T[], property: keyof T, asPromise: boolean = false) {

    return arr.reduce((acc, curr) => {
        const key = curr[property] as string;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
    }, {} as Record<string, T[]>);

}
