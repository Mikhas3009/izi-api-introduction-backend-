import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class TaskEntity {

    @PrimaryGeneratedColumn()
    taskID!: number

    @Column({
        unique: true,
        nullable: false
    })
    taskTitle!: string

    @Column({
        type: "boolean",
        default: false
    })
    taskIsCompleted!: boolean
}