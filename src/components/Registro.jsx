import React from "react";
import "../estilos/estilos.scss";
import logoNeptunoBordeado from '../images/logo-neptuno-bordeado.png';

export const Registro = () => {
    return (
        <>
            <div className="container" style={{ maxWidth: "700px" }}>
                <div className="contenedor-login abs-center">
                    {/* <div className="profile-content"> */}
                    <div className="container">
                        <div className="row">
                            <div align="center">
                                <img className="img-fluid" src={logoNeptunoBordeado} alt="Logo Neptuno" width="100px" />
                            </div>
                            <p className="logotipo-naranja mb-3 fs-1">NEPTUNO</p>
                            <p className="text-wrap texto-naranja">Registrar Usuario</p>
                        </div>
                    </div>

                    <div className="container pt-1">
                        <div className="row">
                            <div className="col border-3 border-warning">
                                <form>
                                    <div className="mb-3">
                                        {/* <label htmlFor="nombre" className="form-label  npcolor">Nombre:*</label> */}
                                        <input
                                            required
                                            placeholder="Nombre"
                                            type="text"
                                            className="form-control isI"
                                            id="nombre"
                                            aria-describedby="nameHelp"
                                        />
                                        {/* <div id="emailHelp" className="form-text">Todos los campos con (*) son obligatorios</div> */}
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="apellido" className="form-label  npcolor">Apellido</label> */}
                                        <input
                                            required
                                            placeholder="Apellido"
                                            type="lastname"
                                            className="form-control isI"
                                            id="apellido"
                                            aria-describedby="nameHelp"
                                            required
                                        />
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="ident" className="form-label npcolor">Identificación</label> */}
                                        <input
                                            required
                                            placeholder="Identificacion"
                                            type="number"
                                            className="form-control isI"
                                            id="ident"
                                            aria-describedby="nameHelp"
                                            required
                                        />
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>

                                    <div className="mb-3">
                                        {/* <label htmlFor="rol" className="form-label  npcolor">Rol</label> */}
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                        >
                                            <option disabled selected defaultValue>
                                                Rol
                                            </option>
                                            <option value="1">Estudiante</option>
                                            <option value="2">Lider</option>
                                            <option value="3">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="Email" className="form-label  npcolor">Email</label> */}
                                        <input placeholder="Correo" type="email" className="form-control" id="Email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="Password" className="form-label  npcolor">
                                                Password
                                            </label> */}
                                        <input
                                            placeholder="Contraseña"
                                            type="password"
                                            className="form-control"
                                            id="Password"
                                            aria-describedby="passlHelp"
                                        />
                                    </div>
                                    <div className="container pb-3">
                                        <div className="row text-center">
                                            <div className="col">
                                                <button className="botonNaranja btn w-75 isI" type="button">
                                                    Registrar
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button className="btn btn-dark w-75 isI" type="button">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* </div> */}
                </div>
            </div>
        </>
    );
};
