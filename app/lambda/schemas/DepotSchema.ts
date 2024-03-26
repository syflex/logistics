import { z } from 'zod'
import { ObjectIdSchema } from './ObjectIdSchema'


export const DepotSchema = z.object({
  id: ObjectIdSchema,
  depotId: z.string(),
  name: z.string(),
  type: z.literal('daily').or(z.literal('weekly')),
  capacity: z.number(),
  createdAt: z.string(),
})
