import {body} from 'express-validator'

export const regValidator = [
    body('email', 'Введите почту.').isString().isEmail().withMessage('Неправильный формат почты.'),
    body('password', 'Введите пароль.').isString().isLength({
        min: 7,
        max: 100
    }).withMessage('Минимальная длина пароля 7 символов.'),
    body('firstName').optional().isString(),
    body('lastName').optional().isString(),
    body('patr').optional().isString(),
    body('avatarURL').optional().isURL(),
]