export interface Schedule {

    // Universally unique identifier (UUID) for the schedule
    id: string,

    // Integer representing the account associated with the schedule
    account_id: number,

    // Integer representing the agent assigned to the schedule
    agent_id: number,

    // DateTime indicating the start time of the schedule
    start_time: Date,

    // DateTime indicating the end time of the schedule
    end_time: Date
}