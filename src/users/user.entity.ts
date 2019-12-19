import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @IsString()
    @Column({ unique: true })
    public username!: string;

    @IsEmail()
    @Column({ unique: true })
    public email!: string;
}
