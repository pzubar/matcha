import { Model } from '@shared/model'
import { Injectable, Inject } from '@nestjs/common'
import { Database } from '@db'
import { DATABASE_CONNECTION } from '@shared/constants'
import User from './user.object-type'
import { Message } from '../../messages/model'

@Injectable()
class UserModel extends Model<User & { password?: string }> {
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
    const outAsType = this.database.raw("'out' as type")
    const inAsType = this.database.raw("'in' as type")
    const sub = this.database('messages')
      .select(outAsType, 'id', { interlocutorId: 'receiver_id' }, 'message')
      .where('sender_id', userId)
      .unionAll(function f() {
        this.select(
          inAsType,
          'id',
          { interlocutorId: 'receiver_id' },
          'message'
        )
          .from('messages')
          .where('receiver_id', userId)
      })
      .as('sub')
    // .toSQL()
    console.log('SUB', sub.toSQL())
    const test = this.database(this.table)
      .distinctOn('interlocutor_id')
      .from(sub)
      .orderBy('interlocutor_id', 'desc')
    console.log('TEST:::', test.toSQL())
    console.log('ORR:::', await test)
    const result = await this.database.raw(
      `
					SELECT DISTINCT ON (userId) sub.*, users.username, users.id
					FROM (
						     SELECT 'out' AS type, id, receiver_id AS userId, message, created_at
						     FROM messages
						     WHERE sender_id = :userId

						     UNION ALL
						     SELECT 'in' AS type, id, sender_id AS userId, message, created_at
						     FROM messages
						     WHERE receiver_id = :userId
					     ) sub
						     JOIN users on users.id = userId
					ORDER BY userId, sub.created_at DESC
    `,
      { senderId: 'sender_id', receiverId: 'receiver_id', userId }
    )
    const { rows } = result
    console.log('MESSAGES :::', rows)
    return rows
  }
}

export default UserModel
