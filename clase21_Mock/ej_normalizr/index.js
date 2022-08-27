import { schema, normalize, denormalize } from "normalizr";
import util from "util";
import fs from "fs";

const empresa = JSON.parse(fs.readFileSync("./datos.json", "utf8"));

const empleadoSchema = new schema.Entity("empleados");
const empresaSchema = new schema.Entity("empresa", {
    gerente : empleadoSchema,
    encargado : empleadoSchema,
    empleados : [empleadoSchema],
})

const normalizedEmpresa = normalize(empresa, empresaSchema);

const denormalizeEmpresa = denormalize(
    normalizedEmpresa.result,
    empresaSchema,
    normalizedEmpresa.entities
);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12,true), {
        length: JSON.stringify(objeto).length
    })
}

print(normalizedEmpresa);
print(denormalizeEmpresa);