import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces) //alphabedics and spaces allowed
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('tos', required)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} can only contain characters and spaces`,
          email: `The field ${ctx.field} should be a valid email`,
          min_value: `The field ${ctx.field} is too low`,
          max_value: `The field ${ctx.field} is too high`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: `We don't currenty accept users from this location`,
          passwords_mismatch: `The passwords do not match`,
          tos: 'You must accept the Terms of Service.'
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`

        return message
      },
      // these are default no need to change them
      validateOnBlur: true, // should validate on the onBlur event
      validateOnChange: true, // explanatory
      validateOnInput: false, // validation triggers when the input changes. Ok on password but too much on others
      validateOnModelUpdate: true
    })
  }
}
