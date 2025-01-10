import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Index()
    @Column()
    age: number;
}
