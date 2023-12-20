import {body} from 'express-validator'

export const postValidator = [
    body('title', 'Введите заголовок статьи.').isString().isLength({min:3}),
    body('text', 'Введите текст статьи.').isString().isLength({min:15}),
    body('tags', 'Введите тэги статьи.').optional().isArray(),
    body('imageUrl', 'Введите тэги статьи.').optional().isString(),
]