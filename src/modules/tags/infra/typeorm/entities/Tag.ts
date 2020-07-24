import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import AssociativeTagRepo from './AssociativeTagRepo';

@Entity()
class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => AssociativeTagRepo,
    tags_repositories => tags_repositories.tag_id,
  )
  tags_repository: AssociativeTagRepo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
