export interface Meal {
    category: string,
    product: string,
    description: string,
    calories: number
}

export interface Meals {
    [id: string]: Meal
}