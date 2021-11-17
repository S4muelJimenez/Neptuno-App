import {Schema, model,} from 'mongoose';
import { Enum_TipoObjetivo } from './enums';
import { ProjectModel } from './projects';

interface Objective{
    descripcion: Schema.Types.String;
    tipo: Enum_TipoObjetivo;
    proyecto:Schema.Types.ObjectId //Especifica que el tipo de campo es un objeto "Proyecto"
}

//La relacion con el proyecto se deja en la parte "Muchos" para tener coherencia con las otras relaciones del proyecto
const objectiveSchema = new Schema<Objective>({
    descripcion:{
         type:Schema.Types.String,
         required:true,
    },
    tipo:{
        type:Schema.Types.String,
        enum: Enum_TipoObjetivo,
        required:true,
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref:ProjectModel, //Es necesario indicar la como referencia al modelo cuando el tipo de campo es un ObjectId
        required:true,
    }
})

const ObjectiveModel = model('Objetivo', objectiveSchema);

export {ObjectiveModel}