import { ArticleModel } from './article.model';
import { RecipeModel } from './recipe.model';

export class UserModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public username: string,
        public profilePic: string
    ) { }

    public articles: ArticleModel[];
    public recipes: RecipeModel[];
};
