import type { Category } from "../types";
import { getCategories } from "./wpApi";

const categoriesCollection : Category[] = await getCategories();

export const categoriesHandler = {
    allCategories: () => categoriesCollection,
    oneCategory: (categoryId: number) => {
        const category = categoriesCollection.find((category) => category.id == categoryId);
        // if (!category) {
        //     throw new Error(`Category with ID ${categoryId} not found`);
        // }
        return category as Category;
    },
    oneCategoryBySlug: (categorySlug: string) => {
        const category = categoriesCollection.find((category) => category.slug == categorySlug);
        // if (!category) {
        //     throw new Error(`Category with slug ${categorySlug} not found`);
        // }
        return category as Category;
    },
}