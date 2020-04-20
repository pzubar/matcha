import { Model } from '@shared/model'
import { Injectable, Inject } from '@nestjs/common'
import { Database } from '@db'
import { DATABASE_CONNECTION } from '@shared/constants'
import User from './user.object-type'
import { Message } from '../../messages/model'

@Injectable()
class UserModel extends Model<User> {
  constructor(@Inject(DATABASE_CONNECTION) database: Database<User>) {
    super(database, 'users')
  }

  async findByUserNameOrEmail(userNameOrEmail) {
    return this.database(this.table)
      .where({ username: userNameOrEmail })
      .orWhere({ email: userNameOrEmail })
      .first()
  }

  async getMessages(senderId, lastId): Promise<Array<Message>> {
    return this.database<Message>('message')
      .where('id', '>', lastId)
      .andWhere(q => q.where({ senderId }).orWhere({ receiverId: senderId }))
      .limit(10)
  }
}

export default UserModel
