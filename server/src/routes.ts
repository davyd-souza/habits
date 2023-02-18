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

  // get habits in day
  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    // localhost.com/day?date=2023-01-28T03:00:00.000z
    const { date } = getDayParams.parse(req.query)

    // will set date to start of day with correct timezone (UTC-3)
    const parsedDate = dayjs(date).startOf('day')

    // will return a number equivalent to week day
    const weekDay = parsedDate.get('day')

    // find all possible habits where they are lower then or equal to the date requested and are the same weed day
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    })

    // find habits completed on requested day
    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    })

    // map to only return habit id
    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? []

    return {
      possibleHabits,
      completedHabits,
    }
  })

  // complete and uncomplete a habit
  app.patch('/habits/:id/toggle', async (req) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(req.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      })
    }

    // Searching to see if there's a habit completed on day
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      })
    } else {
      // Complete habit on day
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      })
    }
  })

  app.get('/summary', async () => {
    // return an array with objects containing date, amount and completed habits
    // [ { date: 17/01, amount: 5, completed: 1}. { date: 18/01, amount: 2, completed: 2 } ]

    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_day HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary
  })
}
