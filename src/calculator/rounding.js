export const round2 = (number) => Math.round((number + Number.EPSILON) * 100) / 100
export const round0 = (number) => Math.round(number + Number.EPSILON)