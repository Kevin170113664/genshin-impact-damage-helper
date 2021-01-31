export const round3 = (number) => Math.round((number + Number.EPSILON) * 1000) / 1000
export const round2 = (number) => Math.round((number + Number.EPSILON) * 100) / 100
export const round0 = (number) => Math.round(number + Number.EPSILON)