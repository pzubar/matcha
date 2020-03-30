import { Resolver, Query, ResolveField, Args, Int } from '@nestjs/graphql'
// import { User } from './models/user.model'

@Resolver('User')
export class AuthorsResolver {
  constructor() // private authorsService: AuthorsService,
  // private postsService: PostsService
  {}

  @Query('authors')
  async getAuthors() {
    return [{ id: 123, firstName: 'Ivan', lastName: 'Petrov' }]
  }

  @Query('author')
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return { id: 123, firstName: 'Ivan', lastName: 'Petrov' }
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author
  //   return this.postsService.findAll({ authorId: id })
  // }
}
