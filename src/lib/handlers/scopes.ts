import type { Scope } from "../types";
import { getScopes } from "./wpApi";

const ScopeCollection = await getScopes();

export const scopesHandler = {
    allScopes: () => ScopeCollection as Scope[],
    oneScope: (scopeId: number) => {
        const scope = ScopeCollection.find((scope:Scope) => scope.id == scopeId);
        // if (!category) {
        //     throw new Error(`Category with ID ${categoryId} not found`);
        // }
        return scope as Scope;
    },
    oneScopeBySlug: (scopeSlug: string) => {
        const scope = ScopeCollection.find((scope:Scope) => scope.slug == scopeSlug);
        // if (!category) {
        //     throw new Error(`Category with slug ${categorySlug} not found`);
        // }
        return scope as Scope;
    },
}