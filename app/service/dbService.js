'use strict'
/**
 * Created by dl on 2017-10-09.
 */

module.exports = app => {
    return class BusslogService extends app.Service {
        async findById (id) {
            return id;
        }

        async findAll (conn) {
            const result = await conn.select('testtab', { limit: 10 });
            return result;
        }

        async find (uid) {
            const user = await app.mysql.get('testtab', {
                id: uid,
            });
            return {
                user,
            };
        }

        async insert (tablename, column) {
            const result = await this.app.mysql.insert(tablename, column); // 在 post 表中，插入 title 为 Hello World 的记录
            return (result.affectedRows === 1);
        }

        async update (tablename, row) {
            const result = await this.app.mysql.update(tablename, row); // 在 post 表中，插入 title 为 Hello World 的记录
            return (result.affectedRows === 1);
        }
    }
}
