const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const {buildPostQuery, buildPatchQuery} = require("../utils/buildQuery");

async function getMultiple(page = 1, table) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM ${table} LIMIT ${offset},${config.listPerPage}`);
    return helper.emptyOrRows(rows);
}

async function get(id, table) {
    const rows = await db.query(`SELECT * FROM ${table} WHERE id="${id}"`);
    return helper.emptyOrRows(rows);
}

async function create(item, table) {
    await db.query( buildPostQuery(table, item));
    return item;
}

async function update(id, body, table) {
    await db.query(buildPatchQuery(table, id, body));
    return {id,...body};
}

async function remove(id, table) {
    await db.query(`DELETE FROM ${table} WHERE id="${id}"`);
}

module.exports = {
    getMultiple,
    get,
    create,
    update,
    remove,
};