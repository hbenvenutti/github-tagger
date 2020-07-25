import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTagsRepositories1595219923209
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags_repositories',
        columns: [
          {
            name: 'repository_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'tag_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('tags_repositories', [
      new TableForeignKey({
        name: 'RepositoryId',
        columnNames: ['repository_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'github_repositories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'TagId',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tags_repositories', 'TagId');
    await queryRunner.dropForeignKey('tags_repositories', 'RepositoryId');

    await queryRunner.dropTable('tags_repositories');
  }
}
