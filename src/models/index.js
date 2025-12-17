import { Produto } from "./Produto.js";
import { Marca } from "./marca.js";
import { Categoria } from "./categoria.js";

Categoria.hasMany(Produto, {
    foreignKey: 'categoria_id',
})
Produto.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
})

Marca.hasMany(Produto, {
    foreignKey: 'marca_id',
})
Produto.belongsTo(Marca, {
    foreignKey: 'marca_id',
})

export { Categoria, Produto, Marca };