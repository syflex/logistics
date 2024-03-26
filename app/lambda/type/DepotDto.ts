import { z } from 'zod'
import { DepotSchema } from '../schemas/DepotSchema'

export type IDepotDto = z.infer<typeof DepotSchema>
