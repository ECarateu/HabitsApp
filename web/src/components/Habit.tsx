interface HabitProps{
    completed:number
}

export function Habit(props:HabitProps) {
  return (
   <div className="bg-fuchsia-600 text-white rounded m-2 flex items-center justify-center">
    {props.completed}
   </div>
    
  ) 
}