import UserModel from './user.model'
import database from '../../db'

export {default as User} from './user.object-type';
export default new UserModel(database)
