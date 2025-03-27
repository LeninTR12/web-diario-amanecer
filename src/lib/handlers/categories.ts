import { getCategories } from "./wpApi";

const categoriesCollection = await getCategories();

export const categoriesHandler = {
    allCategories: () => categoriesCollection,
    oneCategory: (categorySlug: string) => {
        const category = categoriesCollection.find((category:any) => category.slug === categorySlug);
        if (!category) {
            throw new Error(`Category with slug ${categorySlug} not found`);
        }
        return category;
    },
}