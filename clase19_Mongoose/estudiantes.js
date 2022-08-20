import mongoose from 'mongoose';

const estudiantesCollection = 'estudiantes';

const estudiantesSchema = new mongoose.Schema({
    nombre : {type: String, require:true, max: 100},
    apellido : {type: String, require:true, max: 100},
    email : {type: String, require:true, max: 100},
    usuario : {type: String, require:true, max: 100},
    password : {type: String, require:true},
});

export const estudiante = mongoose.model(estudiantesCollection, estudiantesSchema);

