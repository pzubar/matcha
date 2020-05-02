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

  async getMessages(userId: number, lastId?: number): Promise<Array<Message>> {
    const [outAsType, inAsType] = ['out', 'in'].map(i =>
      this.database.raw(`'${i}' as type`)
    )
    const sub = this.database('messages')
      .select<Message>('*', outAsType, { interlocutorId: 'receiver_id' })
      .where('sender_id', userId)
      .unionAll(
        this.database
          .select('*', inAsType, { interlocutorId: 'sender_id' })
          .from('messages')
          .where('receiver_id', userId)
      )
      .as('sub')

    const result = this.database
      .distinctOn('interlocutor_id')
      .columns('sub.*')
      .from(sub)
      .join(this.table, 'users.id', 'interlocutor_id')
      .orderBy('interlocutor_id', 'desc')

    console.log('RRR', result.toSQL())
    debugger
    return result
  }
}

export default UserModel
