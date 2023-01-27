const UserRole = require('../model/userRole')

const initialDbRole = async () => {
      try {
            const count = await UserRole.estimatedDocumentCount();
            if (count === 0) {
                  const client = new UserRole({ name: 'client', roleId: 1 });
                  client.save();
                  const employee = new UserRole({ name: 'employee', roleId: 2 });
                  employee.save()
                  const admin = new UserRole({ name: 'admin', roleId: 3 });
                  admin.save();
            }

      } catch (error) {
            console.log(error)
      }
}

module.exports = {
      initialDbRole
}