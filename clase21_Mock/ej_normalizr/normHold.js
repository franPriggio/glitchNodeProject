import { schema, normalize, denormalize } from "normalizr";
import util from "util";
import fs from "fs";

const holding = JSON.parse(fs.readFileSync("./holding.json", "utf8"));

const empleadoSchema = new schema.Entity("empleado");

const empresaSchema = new schema.Entity("empresa", {
    gerente : empleadoSchema,
    encargado: empleadoSchema, 
    empleados : [empleadoSchema]
})

const holdingSchema = new schema.Entity("holding", {
    empresas : [empresaSchema]
});

const normalizedHolding = normalize(holding, holdingSchema);

const denormalizeHolding = denormalize(
    normalizedHolding.result,
    holdingSchema,
    normalizedHolding.entities
);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12,true), {
        length: JSON.stringify(objeto).length
    })
}

print(normalizedHolding);
print(denormalizeHolding);
print(holding);