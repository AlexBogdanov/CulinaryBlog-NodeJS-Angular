export class RecipeModel {
    constructor(
        public name: string,
        public preparation: string,
        public products: string[],
        public author: string
    ) { }

    public img: string;
    public isAuthor: boolean;
    public shortDescr: string;
};
