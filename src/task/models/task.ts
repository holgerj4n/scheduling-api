export interface Task {

    // Universally unique identifier (UUID) for the task
    id: string,

    // UUID referencing the schedule to which the task belongs
    schedule_id: string,

    // DateTime indicating the start time of the task
    start_time: Date,

    // Integer representing the duration of the task
    duration: number,

    // String enumeration with values 'break' and 'work', indicating the type of task
    type: string
}