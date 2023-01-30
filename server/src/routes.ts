// DEPENDENCY
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import dayjs from 'dayjs'

// LIB
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {
  // create new habit
  app.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    })

    const { title, weekDays } = createHabitBody.parse(req.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weedDay) => {
            return {
              week_day: weedDay,
            }
          }),
        },
      },
    })
  })
}
