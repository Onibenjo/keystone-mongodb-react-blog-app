const { Text, Password, Checkbox} = require('@keystonejs/fields')

const userFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        }, 
        email: {
            type: Text,
            isRequired: true,
            isUnique: true,
        },
        password: {
            type: Password,
            isRequired: true,
        },
        isAdmin: {
            type: Checkbox,
            isRequired: true,
            defaultValue: false
        }
    }
}

module.exports = userFields

