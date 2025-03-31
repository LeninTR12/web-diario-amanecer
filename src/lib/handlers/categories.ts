import type { Category } from "../types";
import { getCategories } from "./wpApi";

const categoriesCollection = await getCategories();

export const categoriesHandler = {
    allCategories: () => categoriesCollection as Category[],
    oneCategory: (categoryId: string) => {
        const category = categoriesCollection.find((category:Category) => category.id === categoryId);
        if (!category) {
            throw new Error(`Category with ID ${categoryId} not found`);
        }
        return category;
    },
    oneCategoryBySlug: (categorySlug: string) => {
        const category = categoriesCollection.find((category:Category) => category.slug === categorySlug);
        if (!category) {
            throw new Error(`Category with slug ${categorySlug} not found`);
        }
        return category;
    },
}