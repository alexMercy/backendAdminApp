
const buildPostQuery = (table, item) => {
    if (Object.keys(item).length === 0) return null;

    let sql = `INSERT INTO ${table} (${Object.keys(item) +''}) VALUES (`;

    Object.entries(item).forEach(([key, value]) => {
        const valueToSet = typeof item[key] === 'string' ? `'${value}'` : value;
        sql += `${valueToSet},`;
    });

    sql = sql.slice(0, -1);
    sql += `);`;

    return sql;
}


const buildPatchQuery = (table, id, data) => {
    if (Object.keys(data).length === 0) return null;
    let sql = `UPDATE ${table} SET`;
    Object.entries(data).forEach(([key, value]) => {
        const valueToSet = typeof data[key] === 'string' ? `'${value}'` : value;
        sql += ` ${key}=${valueToSet},`;
    });
    sql = sql.slice(0, -1); // Remove last ","
    sql += ` WHERE id="${id}";`;
    return sql;
}

module.exports = {
    buildPatchQuery,
    buildPostQuery

}