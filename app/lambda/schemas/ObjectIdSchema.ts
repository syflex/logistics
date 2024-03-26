import { z } from 'zod'

const objectIdValidationRegex = /^[0-9a-f]{24}$/
export const ObjectIdSchema = z.string().regex(objectIdValidationRegex)
