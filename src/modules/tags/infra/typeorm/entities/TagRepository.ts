import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import GithubRepository from './GithubRepository';
import Tag from './Tag';

@Entity()
class TagRepository {
  @PrimaryColumn()
  repository_id: number;

  @PrimaryColumn()
  tag_id: string;

  @ManyToOne(() => GithubRepository)
  @JoinColumn({ name: 'repository_id' })
  repository: GithubRepository;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: GithubRepository;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TagRepository;
