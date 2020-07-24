import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import AssociativeTagRepo from './AssociativeTagRepo';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => AssociativeTagRepo,
    tags_repositories => tags_repositories.tag_id,
  )
  @JoinColumn({ name: 'tags_repository' })
  tags_repository: AssociativeTagRepo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
