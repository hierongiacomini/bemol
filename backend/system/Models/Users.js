import Sequelize, { Model } from 'sequelize'
import database from '../Database.js'

class Users extends Model {

    static options = {
        modelName: 'Users',
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
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O nome é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O nome é um campo obrigatório.'
                },
                len: {
                    args: [5, 100],
                    msg: 'O nome deve possuir entre 5 e 100 caracteres.'
                },
                is: {
                    args: /[^ ]+ [^ ]+/,
                    msg: 'O campo deve conter nome e sobrenome.'
                }
            }
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: 'O e-mail inserido já está cadastrado.'
            },
            validate: {
                notNull: {
                    msg: 'O e-mail é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O e-mail é um campo obrigatório.'
                },
                isEmail: {
                    msg: 'E-mail deve possuir um formato válido.'
                }
            }
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A senha é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'A senha é um campo obrigatório.'
                },
                len: {
                    args: [10, 35],
                    msg: 'A senha deve possuir entre 10 e 35 caracteres.'
                }
            }
        },
        cpf: {
            type: Sequelize.STRING(14),
            allowNull: false,
            unique: {
                args: true,
                msg: 'O cpf inserido já está cadastrado.'
            },
            validate: {
                notNull: {
                    msg: 'O cpf é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O cpf é um campo obrigatório.'
                },
                is: {
                    args: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/,
                    msg: 'Cpf deve possuir um formato válido.'
                }
            }
        },
        telefone: {
            type: Sequelize.STRING(15),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O telefone é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O telefone é um campo obrigatório.'
                },
                is: {
                    args: /\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}/,
                    msg: 'Telefone deve possuir um formato válido.'
                }
            }
        },
        celular: {
            type: Sequelize.STRING(15),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O celular é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O celular é um campo obrigatório.'
                },
                is: {
                    args: /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/,
                    msg: 'Celular deve possuir um formato válido.'
                }
            }
        },
        contato_por_whatsapp: {
            type: Sequelize.ENUM('Não', 'Sim'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'O contato por whatsapp é um campo obrigatório.'
                },
                notEmpty: {
                    msg: 'O contato por whatsapp é um campo obrigatório.'
                },
                inList(value){
                    if(!['Não', 'Sim'].includes(value)){
                        throw new Error('O contato por whatsapp deve ser Sim ou Não.')
                    }
                }
            }
        }
    }

}

Users.init(Users.fields, {
    ...Users.options,
    sequelize: database.connection
})

export default Users
