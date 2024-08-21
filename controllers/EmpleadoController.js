import Empleado from "../models/empleado.js"

//consultar en la base de datos - trae la informacion y la devuelve en una respuesta
export async function getEmpleado(req, res) {
    try {
        const empleado = await Empleado.find()
        res.json(empleado)
    } catch (error) {
        res.status(500).json({error})
        
    }
}
// Función para calcular días laborados
function calcularDiasLaborados(fecha_ingreso, fecha_de_retiro) {
    const inicio = new Date(fecha_ingreso);
    const fin = new Date(fecha_de_retiro);
    const diferenciaEnMilisegundos = fin - inicio;
    const diasLaborados = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diasLaborados > 0 ? diasLaborados : 0;
}

// Función para calcular cesantías
function calcularCesantias(salario, diasLaborados) {
    return (salario * diasLaborados) / 360;
}

//Hacer la insersion:post
export async function postEmpleado(req, res){
    const body = req.body //obtiene la informacion desde postman o del formulario
    try {
        const dias_laborados = calcularDiasLaborados(body.fecha_ingreso, body.fecha_de_retiro);
        const cesantias = calcularCesantias(body.salario, diasLaborados);

        const empleado = new Empleado({
            ...body,
            dias_laborados,
            cesantias
        });
        
        await empleado.save();
        res.status(201).json('Empleado created successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

//actualizar: put
export async function putEmpleado(req, res) {
    const {name, documento, fecha_ingreso, fecha_de_retiro, salario} = req.body //destructuring data from body
    try {
        const dias_laborados = calcularDiasLaborados(fecha_ingreso, fecha_de_retiro);
        const cesantias = calcularCesantias(salario, dias_laborados);
        
        await Empleado.findOneAndUpdate(
            { documento: documento },
            { name, fecha_ingreso, fecha_de_retiro, salario, dias_laborados: dias_laborados, cesantias }
        );
        res.status(200).json('Empleado updated successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteEmpleado(req, res){
    const _id = req. params.id // obtener el id desde postman o desde algun formulario
    try {
        await Empleado.findByIdAndDelete({_id:_id})
        res.json('Empleado delete succesfully')
    } catch (error) {
        res.status(404).json('Empleado don´t found')
    }
}