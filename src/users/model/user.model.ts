import { Model } from '@shared/model'
import { Injectable, Inject } from '@nestjs/common'
import { Database } from '@db'
import { DATABASE_CONNECTION } from '@shared/constants'
import User from './user.object-type'
import { Message } from '../../messages/model'

@Injectable()
class UserModel extends Model<User & {password?: string}> {
  constructor(@Inject(DATABASE_CONNECTION) database: Database<User>) {
    super(database, 'users')
  }

  async findByUserNameOrEmail(userNameOrEmail) {
    return this.database(this.table)
      .where({ username: userNameOrEmail })
      .orWhere({ email: userNameOrEmail })
      .first()
  }

  async getMessages(userId: number, lastId: number): Promise<Array<Message>> {
    const result = await this.database.raw(
      `
					SELECT DISTINCT ON (userId) sub.*, users.username, users.id
					FROM (
						     SELECT 'out' AS type, id, receiver_id AS userId, message, created_at
						     FROM messages
						     WHERE :senderId: = :userId

						     UNION ALL
						     SELECT 'in' AS type, id, sender_id AS userId, message, created_at
						     FROM messages
						     WHERE :receiverId: = :userId
					     ) sub
						     JOIN users on users.id = userId
					ORDER BY userId, sub.created_at DESC
    `,
      { senderId: 'sender_id', receiverId: 'receiver_id', userId }
    )
    const { rows } = result

    return rows
  }
  //
  // async all() {
  //   return (await super.all()).map(({password, ...rest}) => rest)
  // }
}

export default UserModel
