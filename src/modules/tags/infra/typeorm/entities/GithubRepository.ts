import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import TagRepository from './TagRepository';

@Entity('github_repositories')
class GithubRepository {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @OneToMany(
    () => TagRepository,
    tags_repositories => tags_repositories.repository_id,
  )
  tags_repository: TagRepository[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GithubRepository;
