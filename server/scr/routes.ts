import { FastifyInstance} from 'fastify'
import {prisma} from "./lib/prisma"
import  {z} from 'zod'
import dayjs from 'dayjs'

export async function appRoutes(app:FastifyInstance){

    app.post ('/habits', async (request) => {
        
        const createHabitBody = z.object({
            title: z.string(),
            weekDays:z.array(z.number().min(0).max(6)
            )
        })

        const {title, weekDays} = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()


        
        await prisma.habit.create({
            data:{
                title,
                created_at: new Date(),
                weekDays:{
                    create: weekDays.map(weekDays => {
                    return{
                        week_day: weekDays,

                    }
                    })

                }

            }   


        }) 

    })

    app.get ('/day',async (request) => {
     const getDayParams = z.object({
        date: z.coerce.date() // o coerce converte o paramentro em data 
     })

     const {date} = getDayParams.parse(request.query)
     const parsedDate =dayjs(date).startOf('day')
     const weekDay = parsedDate.get ('day')

     // todos habitos possiveis
     //todos já completados

     const possibleHabits = await prisma.habit.findMany({
        where: {
            created_at: {
                lte:date,
            },
            weekDays:{
                some:{
                    week_day: weekDay,
                }
            }
        }

     })

     const day = await prisma.day.findUnique({
        where:{
            date: parsedDate.toDate(),
        },
        include:{
            dayHabits:true
        }
     })

     const completedHabits = day?.dayHabits.map(dayHabit=>{
        return dayHabit.habit_id
     })
     return {
        possibleHabits,
        completedHabits,
     }
    })
}

