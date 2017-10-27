/**
 * Created by dl on 2017-10-20.
 */
'use strict'
module.exports = app => {
    return class UserService extends app.Service {
        async find (id) {
            const user = await app.mysql.get('user', {
                id
            });
            return user;
        }

        async findByUserName (username) {
            const user = await app.mysql.select('user', {
                where: { username },
            });
            return user;
        }

        async isExistUserName (username) {
            const user = await app.mysql.select('user', {
                where: { username },
                columns: [ 'id', 'username' ]
            });
            return user;
        }

        async update (row) {
            const result = await this.app.mysql.update('user', row);
            return result.affectedRows === 1;
        }
    }
}
