import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AssociativeTagRepo from './AssociativeTagRepo';

@Entity('github_repositories')
class GithubRepository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  remote_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @PrimaryColumn()
  user_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @OneToMany(
    () => AssociativeTagRepo,
    tags_repositories => tags_repositories.repository_id,
  )
  @JoinColumn({ name: 'tags_repository' })
  tags_repository: AssociativeTagRepo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GithubRepository;
