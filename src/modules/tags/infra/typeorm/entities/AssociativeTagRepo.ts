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

@Entity('tags_repositories')
class AssociativeTagRepo {
  @PrimaryColumn()
  @ManyToOne(() => GithubRepository)
  @JoinColumn({ name: 'repository_id' })
  repository_id: string;

  @PrimaryColumn()
  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AssociativeTagRepo;
