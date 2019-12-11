import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    public id!: number;

    // TODO validation
    @Column({ unique: true })
    public name!: string;

    // TODO validation + do compression + decompression
    @Column({ length: 10000 })
    public levelJson!: string;

    @Column('int', { default: 0 })
    public likes!: number;

    @Column('int', { default: 0 })
    public downloads!: number;

    @CreateDateColumn()
    public created!: Date;

    @UpdateDateColumn()
    public lastUpdate!: Date;

    @VersionColumn()
    public version!: number;

    // TODO validation
    @Column({ nullable: true })
    public uploadedUser?: string;
}
