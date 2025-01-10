import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Index() // This creates an index on the 'age' column to improve query performance for operations involving this column.
    @Column()
    age: number;
}
