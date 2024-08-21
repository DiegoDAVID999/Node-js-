import { model, Schema } from "mongoose";

//define eñ esquema de la coleccion 
const EmpleadoSchema =  new Schema({ 
    name:{
        type: String,
        require: [true, 'name is required'],
        unique: true,
        minlength: [4,'Min 4 caracters'],
        maxlength: [10, 'Max 10 caracters']
    },
    documento:{
        type: Number,
        require: [true ,'color is required'],
        minlength:[3,'Min 3 caracthers']

    },
    fecha_ingreso:{
        type: Date,
        require: [true ,'Date is required'],
    },
    fecha_de_retiro:{
        type: Date,
        default: null
    },
    salario:{
        type:Number,
        require: [true, 'salary is required']
    },
    dias_laborados:{
        type:Number,
        require:[true, 'dias laborados is required']
    },
    cesantias:{
        type: Number,
    }
})

// creamos una coleccion y la exporto
export default model('Empleado', EmpleadoSchema, 'empleado' )  