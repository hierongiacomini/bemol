import Sequelize, { Model } from 'sequelize'
import database from '../Database.js'
import Users from './Users.js'

const ESTADOS = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
]

class UsersAddress extends Model {

    static options = {
        modelName: 'Users_Addresses',
        createdAt: 'adicao',
        updatedAt: 'edicao'
    }

    static fields = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cep: {
            type: Sequelize.STRING(9),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O cep é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O cep é um campo obrigatório.'
                },
                is: {
                    args: /[0-9]{5}-[0-9]{3}/,
                    msg: 'O formato do cep está invalido.'
                }
            }
        },
        numero: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O número é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O número é um campo obrigatório.'
                }
            }
        },
        logradouro: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O logradouro é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O logradouro é um campo obrigatório.'
                },
                len: {
                    args: [1, 100]
                }
            }
        },
        bairro: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O bairro é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O bairro é um campo obrigatório.'
                },
                len: {
                    args: [1, 100]
                }
            }
        },
        cidade: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A cidade é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'A cidade é um campo obrigatório.'
                },
                len: {
                    args: [1, 100]
                }
            }
        },
        estado: {
            type: Sequelize.STRING(2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O estado é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O estado é um campo obrigatório.'
                },
                inList(value){
                    if(!ESTADOS.includes(value)){
                        throw new Error('O estado é inválido.')
                    }
                }
            }
        },
        complemento: {
            type: Sequelize.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'O campo complemento deve possuir no máximo 200 caracteres.'
                }
            }
        },
    }

}

UsersAddress.init(UsersAddress.fields, {
    ...UsersAddress.options,
    sequelize: database.connection
})

UsersAddress.belongsTo(Users, {
    constraints: true,
    foreignKey: 'usuario'
})

export default UsersAddress
