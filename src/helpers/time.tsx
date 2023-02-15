import { differenceInDays } from "date-fns";

export const daysDifferent = (createdAt: string) => {
    const newDay = new Date(createdAt)
    const res = differenceInDays(
        new Date(),
        newDay
    )

    return res
}