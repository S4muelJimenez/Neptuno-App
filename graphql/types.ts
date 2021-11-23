import { gql } from 'apollo-server-express';

const typeDefs = gql`
    
    enum Enum_RolUsario{# GraphQL recomienda que los enumeradores se escriban en mayusculas. Estos tambien se cambiaron en los enumeradores de mongoose (archivo enums.ts)
        ESTUDIANTE
        LIDER
        ADMINISTRADOR
    }

    enum Enum_EstadoUsuario{
        PENDIENTE
        AUTORIZADO
        NO_AUTORIZADO
    }
    
    type Usuario{ #Se definen los esquemas gql para cada documento nuevamente.
        _id: ID! #El signo de exclamacion (!) indica que el campo es obligatorio.
        nombre:String!
        apellido: String!
        correo: String!
        identificacion:String!        
        estado:Enum_EstadoUsuario
        rol: Enum_RolUsario

    }

    type Query{#Se define una consulta, es decir, un READ
        Usuarios:[Usuario] #La sintaxis es <resolver>:<Dato deseado>. El resolver trae los datos segun como se especifican. En este caso crea un array con datos tipo Usuario (los campos deseados se especifican en Apollo) definido mas arriba
    }

    type Mutation{
        crearUsuario(
            nombre:String!
            apellido: String!
            correo: String!
            identificacion:String!        
            #Los campos estado, rol e _id tienen valores por defecto. No son obligatorios
            #El campo _id no es obligatorio al crear porque lo asigna mongoDB.
        ):Usuario
    }

    type Mutation{
        eliminarUsuario(_id:ID!, correo: String, identificacion:String):Usuario        
    }
`;

export { typeDefs }