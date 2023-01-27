import { required } from '../../../utility/validators';

export const userRoleInputConfig = {
      userRole: {
            elementName: 'User role',
            elementType: 'radio',
            elementConfig: {
                  type: 'checkbox',
                  name: 'userRole',
                  id: 'userRole',
                  defaultValue: 'client',
                  placeholder: 'Select user roles.',
                  options: [
                        { name: 'client', displayValue: 'Client' },
                        { name: 'employee', displayValue: 'Employee' },
                        { name: 'admin', displayValue: 'Administrator' }
                  ],
                  validators: [{
                        check: required('empty'), message: 'Please define user role.'
                  }],
                  addClassName: []
            }
      }
}