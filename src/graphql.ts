
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Author {
    id: number;
    firstName?: string;
    lastName?: string;
}

export class Post {
    id: number;
    title: string;
    votes?: number;
}

export abstract class IQuery {
    abstract author(id: number): Author | Promise<Author>;

    abstract authors(): Author[] | Promise<Author[]>;
}
