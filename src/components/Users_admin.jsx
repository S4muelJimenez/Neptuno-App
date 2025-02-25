import React, { useEffect } from 'react';
import { MenuLateral } from './MenuLateral';
import '../css/tabla_usuarios.scss';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from './graphql/usuarios/querys';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';


const User_admin = () => {
    const { data, loading, error } = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log("data servidor", data)
    }, [data])

    return (
        <>
        {<Navbar titulo='Usuarios' />}

            <div className='container'>
                <div className="row justify-content-center text-center">

                <div className='table-responsive'> 
                    
                    <table className="table table-sm  tabla_usuarios table-striped table-hover ">
                        <thead>
                            <tr>

                                <th scope="col"></th>
                                {/* <th scope="col">ID</th> */}
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Identificación</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        {<tbody>
                            {data && data.leerUsuarios.map((u) => {
                                return (
                                    <tr key={u._id}>
                                        <td></td>
                                        {/* <td>{u._id}</td> */}
                                        <td>{u.nombres}</td>
                                        <td>{u.apellidos}</td>
                                        <td>{u.identificacion}</td>
                                        <td>{u.correo}</td>
                                        <td>{u.estado}</td>
                                        <td>{u.rol}</td>
                                        <td className='text-center'>
                                            <Link to={`/usuarios/editar/${u._id}`}>
                                                <i className='bx bx-edit-alt'></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>}
                    </table>
                </div>
                </div>
            </div>
            <div>
                {/* <MenuLateral /> */}
            </div>
        </>
    )
}

export default User_admin
