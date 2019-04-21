export class ArticleModel {
    constructor(
        public title: string,
        public description: string,
        public author: string,
    ) {  }

    public isAuthor: boolean;
    public img: string;
};
