import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader } from './Loader';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INCRIPCIONES, GET_PROYECTO } from './graphql/proyectos/querys';
import { CREAR_AVANCE, CREAR_OBJETIVO, EDITAR_INSCRIPCION, EDITAR_PROYECTO, EDITAR_PROYECTO_ESTADO, EDITAR_PROYECTO_FASE, ELIMINAR_INSCRIPCION, MODIFICAR_AVANCE } from './graphql/proyectos/mutations';
import { Navbar } from './Navbar';
import useFormData from '../hooks/useFormData';
import { useUser } from '../context/userContext';
import { toast } from 'react-toastify';
import '../css/proyectos.scss'


export const Proyecto = () => {

    const navigate = useNavigate()
    const { _id } = useParams()

    const { userData } = useUser()

    const { data: queryData, error: queryError, loading: queryLoading } = useQuery(GET_PROYECTO, {
        variables: { _id },
    });

    const { data: queryDataI, error: queryErrorI, loading: queryLoadingI } = useQuery(GET_INCRIPCIONES, {
        variables: { proyecto: _id },
    });



    const [editarProyectoEstado, { data: mutationData, error: mutationEror, loading: mutationLoading }] = useMutation(EDITAR_PROYECTO_ESTADO);
    const [editarProyectoFase, { data: mutationDataF, error: mutationErorF, loading: mutationLoadingF }] = useMutation(EDITAR_PROYECTO_FASE);
    const [crearObjetivo, { data: mutationDataO, error: mutationErorO, loading: mutationLoadingO }] = useMutation(CREAR_OBJETIVO);
    const [crearAvance, { data: mutationDataA, error: mutationErorA, loading: mutationLoadingA }] = useMutation(CREAR_AVANCE);
    const [editarInscripcion, { data: mutationDataI, error: mutationErorI, loading: mutationLoadingI }] = useMutation(EDITAR_INSCRIPCION);
    const [eliminarInscripcionP, { data: mutationDataEI, error: mutationErorEI, loading: mutationLoadingEI }] = useMutation(ELIMINAR_INSCRIPCION);
    const [modificarAvanceF, { data: mutationDataMA, error: mutationErorMA, loading: mutationLoadingMA }] = useMutation(MODIFICAR_AVANCE);
    const [editarProyecto, { data: mutationDataEP, error: mutationErorEP, loading: mutationLoadingEP }] = useMutation(EDITAR_PROYECTO);

    const [cuentaEstado, setCuentaEstado] = useState(0)
    const [cuentaFase, setCuentaFase] = useState(0)

    const cambiarEstado = () => {
        //console.log(cuentaEstado);
        if (cuentaEstado == 0) {
            console.log("es 0, no haga nada");
        } else {
            if (queryData.leerProyecto.estado == "ACTIVO") {
                //console.log("inactivar proyecto: " + queryData.leerProyecto._id)
                editarProyectoEstado({
                    variables: { _id: queryData.leerProyecto._id, estado: "INACTIVO" }
                }).then((result)=>{
                    toast("Proyecto Inactivado") 
                }).catch((err)=>{
                    toast.error('' + err)
                })
                //console.log("inactivar proyecto: ", mutationData)
            } else {
               // console.log("Activar proyecto: " + queryData.leerProyecto._id)
                editarProyectoEstado({
                    variables: { _id: queryData.leerProyecto._id, estado: "ACTIVO" }
                }).then((result)=>{
                    toast("Proyecto Activado") 
                }).catch((err)=>{
                    toast.error('' + err)
                })
               // console.log("Activar proyecto: " + mutationData)
            }

        }
    }

    const cambiarFase = () => {

        if (cuentaFase == 0) {
            console.log("es 0, no haga nada");
        } else {
            const nuevaFase = document.getElementById("fase-proy").value
            //console.log(document.getElementById("fase-proy").value)
            editarProyectoFase({
                variables: { _id: queryData.leerProyecto._id, fase: nuevaFase }
            }).then((result)=>{
                toast("Cambio de Fase Exitoso") 
            }).catch((err)=>{
                toast.error('no se pudo realizar el cambio de fase' + err)
            })
            //console.log('mutacion fase', mutationDataF);
        }
    }

    const { form, formData, updateFormData } = useFormData(null);

    const submitForm = (e) => {
        e.preventDefault();
        //console.log('fd', formData);
        
        crearObjetivo({
            variables: {
                proyecto: queryData.leerProyecto._id,
                ...formData
            }

        }).then((result)=>{
            toast("Se agrego el objetivo correctamente") 
        }).catch((err)=>{
            toast.error('' + err)
        })
        document.getElementById("form-obj").reset()
    }



    const submitFormA = (e) => {
        e.preventDefault();
        
        if(!document.getElementById("descripcionAvance").value==""){
            crearAvance({
            variables: {
                proyecto: queryData.leerProyecto._id,
                estudiante: userData._id,
                descripcion: document.getElementById("descripcionAvance").value
                }
            }).then((result)=>{
                toast("Avance Creado con éxito") 
            }).catch((err)=>{
                toast.error('' + err)
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            
            document.getElementById("form-avc").reset()
        }else{
            toast.error("Debe ingresar una descripción valida")
        }
        
    }

    const [idInscripcion, setIdIncripcion]=useState()

    const cambiarEstadoIncripcion= (id) =>{
        /* console.log(idInscripcion); */
        const estadoInscripcion = document.getElementById("estado_insc").value

        editarInscripcion({
            variables: { _id: idInscripcion, estado: estadoInscripcion }
        }) .then((result)=>{
            toast("Estado de inscripción actualizado con éxito") 
        }).catch((err)=>{
            toast.error('' + err)
        })
        //console.log("Cambio de estado correcto: ", mutationDataI)
    }

    const eliminarIncripcion = () => {
        console.log("prueba eliminar Inscripcion: " + idInscripcion);
        console.log("proyecto: "+ _id);

        eliminarInscripcionP({
            variables: { proyecto: _id, id: idInscripcion  }
        }) .then((result)=>{
            toast("Inscripción eliminada con éxito") 
        }).catch((err)=>{
            toast.error('' + err)
        })
        
        setTimeout(() => {
            window.location.reload()
        }, 300);
        
    }

    const [idAvance, setIdAvance]=useState()
    const [descAvance, setDescAvance]=useState()

    useEffect(() => {
       document.getElementById("modAvance").value=descAvance
    }, [descAvance])
    
    const modificarAvance = () => {
        //console.log(idAvance);
        if(!document.getElementById("modAvance").value==""){
            modificarAvanceF({
                variables: { _id: idAvance, descripcion: document.getElementById("modAvance").value }
            }).then((result)=>{
                toast("Avance modificado correctamente") 
            }).catch((err)=>{
                toast.error('' + err)
            })
        }else{
            toast.error("Debes agregar algo en la descripción")
        }
        
    }

    const modificarProyecto = () => {
        
        const nPresupuesto = parseInt( document.getElementById("presupuestoNuevo").value)
        //console.log(nPresupuesto);
        
        editarProyecto({
            variables: {_id: _id, nombre: document.getElementById("nombreProyectoNuevo").value, presupuesto: nPresupuesto}
        }).then((result)=>{
            toast("Proyecto Modificado con éxito") 
        }).catch((err)=>{
            toast.error('' + err)
        })

    }

    useEffect(() => {
        cambiarEstado()
    }, [cuentaEstado])

    useEffect(() => {
        cambiarFase()
    }, [cuentaFase])

    useEffect(() => {
        if (cuentaEstado > 0) {
            console.log("Mutación exitosa");
        }
    }, [mutationData])

    useEffect(() => {
        queryLoading ? <Loader /> : document.getElementById("fase-proy").value = queryData.leerProyecto.fase
    }, [queryData])
    
    useEffect(() => {
        queryLoadingI ? <Loader /> : console.log(queryDataI);
    }, [queryDataI])

    return (
        <>
            {
                queryLoading ?
                    <Loader /> 
                    : 
                    <>
                        <div className="container nproyecto" style={{ marginTop: "100px" }}>

                            <Link to={"/proyectos"} className="btn btn-warning  isI  mb-3" >regresar</Link>

                            <Navbar titulo={queryData.leerProyecto.nombre} />


                            <div className="row">
                                {<div className="col-sm-6 col-12 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title text-center">{queryData.leerProyecto.nombre}</h4>
                                            <h6>Inicio: {queryData.leerProyecto.fechaInicio}</h6>
                                            <p className="card-text">Lider: {queryData.leerProyecto.lider.nombres} {queryData.leerProyecto.lider.apellidos}</p>
                                            <p className="card-text">Objetivos: {queryData.leerProyecto.objetivos.length}</p>
                                            <p className="card-text">Avances: {queryData.leerProyecto.avances.length}</p>
                                            <p className="card-text">Estado: {queryData.leerProyecto.estado} 
                                                <button className='btn btn-warning  isI btn-sm  ms-3' onClick={() => setCuentaEstado(cuentaEstado + 1)}> Cambiar Estado</button>
                                            </p>
                                            <div className="row">
                                                <div className="col-sm-4 col-12">
                                                    <p className="card-text"> Fase: </p>
                                                </div>
                                                <div className="col-sm-4 col-12 mb-2">
                                                    <select style={{ maxWidth: "180px" }} className="form-select" aria-label="select-fase" required="true" name="fase" id='fase-proy'>
                                                        <option> Seleccione </option>
                                                        <option value="INICIADO">Iniciado</option>
                                                        <option value="EN_DESARROLLO">En desarrollo</option>
                                                        <option value="TERMINADO">Terminado</option>
                                                        <option value="POR_DEFINIR">Por Definir</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <button className='btn btn-warning  sI btn-sm ms-3' onClick={() => setCuentaFase(cuentaFase + 1)}>Cambiar fase </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Presupuesto: ${queryData.leerProyecto.presupuesto}</small>
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-warning sI btn-sm ms-3' data-bs-toggle="modal" data-bs-target="#modalModProyecto"> Modificar Proyecto</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div className="col-sm-6 col-12 mb-3">
                                    <div className="card">
                                        <div className="container">
                                            <h4 className="card-title mt-3 text-center">Incripciones</h4>
                                            <div className="table-responsive">
                                                <table className="table table-hover table-striped ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col"></th>
                                                            <th scope="col">Nombres</th>
                                                            <th scope="col">Apellidos</th>
                                                            {/* <th scope="col">Correo</th> */}
                                                            <th scope="col">Estado Inscipción</th>
                                                            <th scope="col">Fecha de solicitud</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {queryDataI && queryDataI.leerInscripciones.map((i) => (
                                                            <tr key={i._id} >
                                                                <td className='text-center'></td>
                                                                <td>{i.estudiante.nombres}</td>
                                                                <td>{i.estudiante.apellidos}</td>
                                                                {/* <td>{i.estudiante.correo}</td> */}
                                                                <td><button 
                                                                        className='border-0' 
                                                                        style={{background: "transparent"}}
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#modalInsc"
                                                                        onClick={()=>setIdIncripcion(i._id)}
                                                                        >
                                                                        <i className='bx bx-edit-alt'></i>
                                                                    </button>  {i.estado} </td>
                                                                <td>{i.fechaIngreso}</td>
                                                                <td><button 
                                                                        className='border-0' 
                                                                        style={{backgroundColor: "transparent"}}
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#modalInscEliminar"
                                                                        onClick={()=>setIdIncripcion(i._id)}
                                                                        >
                                                                        <i className='bx bx-x-circle'></i>
                                                                    </button> 
                                                                </td>
                                                               

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <h4 className="card-title mt-3 text-center">Objetivos</h4>
                                    </div>

                                    {queryData && queryData.leerProyecto.objetivos.map((o) => (
                                        <div className="card mb-2" key={o._id}>
                                            <div className="card-body">
                                                <h6>OBJETIVO {o.tipo} </h6>
                                                <p className="card-text">{o.descripcion}</p>

                                            </div>
                                            {/*  <div className="card-footer d-flex justify-content-end">
                                        <Link to="" className="btn btn-primary">Modificar</Link>
                                    </div> */}
                                        </div>
                                    ))}
                                    <div className="card mb-2" >
                                        <div className="card-body">
                                            <form
                                                onSubmit={submitForm}
                                                onChange={updateFormData}
                                                ref={form}
                                                id='form-obj'>
                                                <div className="mb-3">
                                                    <label htmlFor="tipo" className="form-label  npcolor">Tipo de Objetivo:*</label>
                                                    <select className="form-select" aria-label="select-tipo" required="true" name="tipo" id='tipo-obj'>
                                                        <option> Seleccione </option>
                                                        <option value="GENERAL">General</option>
                                                        <option value="ESPECIFICO">Específico</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="descripcion" className="form-label  npcolor">Descripción:*</label>
                                                    <textarea className="form-control" id="descObjetivo" rows="2" name='descripcion'></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer d-flex justify-content-end">
                                            <button onClick={submitForm} className="btn btn-warning isI"  id='btnObjetivo' type='submit'> Agregar Objetivo</button>
                                        </div>
                                    </div>

                                </div>

                                <div className="col">
                                    <div className="card mb-3">
                                        <h4 className="card-title mt-3 text-center">Avances</h4>
                                    </div>
                                    {queryData && queryData.leerProyecto.avances.map((a) => (
                                        <div className="card mb-2" key={a._id}>
                                            <div className="card-body">
                                                <h6>Avance </h6>
                                                <p className="card-text">{a.descripcion}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-end">
                                        <buton 
                                            className="btn btn-warning isI btn-sm me-3" 
                                            data-bs-toggle="modal" data-bs-target="#modalModAvance" 
                                            onClick={()=>setIdAvance(a._id) & setDescAvance(a.descripcion)} >
                                                Modificar
                                        </buton>
                                        <Link to={`/proyecto/observacion/${a._id}`} className="btn btn-warning isI btn-sm">Agregar Observación</Link>
                                    </div>
                                        </div>
                                    ))}

                                    <div className="card mb-2" >
                                        <div className="card-body">
                                            <form
                                                onSubmit={submitFormA}
                                                id='form-avc'>
                                                <div>
                                                    <label className="form-label npcolor">Avance</label>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="descripcion" className="form-label  npcolor" >Descripción:*</label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" name='descripcion' id='descripcionAvance'></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer d-flex justify-content-end">
                                            <button onClick={submitFormA} className="btn btn-warning isI" id='btnAvance'> Agregar Avance</button>
                                        </div>
                                    </div>


                                </div>


                            </div>

                            <br />

                            <Link to="/proyectos" className="btn btn-warning isI d-flex justify-content-center mb-3" >regresar</Link>

                        </div>
                    </>}

                    {/* Modal estado inscripción */}

                    <div className="modal fade" id="modalInsc" tabindex="-1" aria-labelledby="modalInscLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalInscLabel">Actualizar estado de inscripción</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label  npcolor">Estado de la incripción:*</label>
                                    <select className="form-select" aria-label="select-tipo" required="true" name="tipo" id='estado_insc'>
                                        <option> Seleccione </option>
                                        <option value="ACEPTADA">Aceptada</option>
                                        <option value="RECHAZADA">Rechazada</option>
                                        <option value="PENDIENTE">Pendiente</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={cambiarEstadoIncripcion} type="button" className="btn btn-primary" data-bs-dismiss="modal">Actualizar estado</button>
                            </div>
                            </div>
                        </div>
                    </div>



                    {/* Modal Eliminar inscripción */}

                    <div className="modal fade" id="modalInscEliminar" tabindex="-1" aria-labelledby="modalInscEliminarLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalInscEliminarLabel">Eliminar inscripción</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Esta seguro de eliminar esta inscripción?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={eliminarIncripcion} type="button" className="btn btn-primary" data-bs-dismiss="modal">Eliminar</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal modificar Avance */}

                    <div className="modal fade" id="modalModAvance" tabIndex="-1" aria-labelledby="modalModAvanceLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalModAvanceLabel">Modificar Avance</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label  npcolor" >Descripción:*</label>
                                    <textarea className="form-control"  rows="2" name='descripcion' id='modAvance'></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={modificarAvance} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
                            </div>
                            </div>
                        </div>
                    </div>

                     {/* Modal modificar Proyecto */}

                     <div className="modal fade" id="modalModProyecto" tabIndex="-1" aria-labelledby="modalModProyecto" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalModProyecto">Modificar Proyecto</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                            <div className="container " >

                                
                                <div className="profile-card-2 border border-3 border-warning ">
                                    <div className="profile-content ms-3 me-3">
                                        <div className="container pb-3">
                                            <div className="row">
                                                <div className="profile-name mt-3 text-center border-bottom border-3 border-warning pb-3  npcolorbold">
                                                    Nuevo Proyecto
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <form >
                                            <div className="mb-3">
                                                <label htmlFor="Lider" className="form-label  npcolor">Lider: {userData.nombres} {userData.apellidos}</label> <br />
                                                <label htmlFor="Lider" className="form-label  npcolor">email: {userData.correo}</label>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nombre" className="form-label  npcolor">Nombre:*</label>
                                                <input type="text" className="form-control" name="nombre" id='nombreProyectoNuevo' aria-describedby="nameHelp" defaultValue={queryData && queryData.leerProyecto.nombre}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="presupuesto" className="form-label  npcolor">Presupuesto</label>
                                                <input type="number" className="form-control" name="presupuesto" id='presupuestoNuevo' aria-describedby="nameHelp" required defaultValue={queryData && queryData.leerProyecto.presupuesto}/>
                                                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                            </div>
                                            
                                            {/* <div className="d-grid gap-2 col-6 mx-auto pb-3">
                                                <button onClick={submitFormP} className="btn btn-warning" type="button">Modificar Proyecto</button>
                                            </div> */}
                                        </form>    
                                    </div>
                                </div>
                                </div>     

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={modificarProyecto} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    

        </>
    )
}

