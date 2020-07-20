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
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'tag_id',
            type: 'uuid',
            isPrimary: true,
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
      }),
      new TableForeignKey({
        name: 'TagId',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tags_repositories', 'TagId');
    await queryRunner.dropForeignKey('tags_repositories', 'RepositoryId');

    await queryRunner.dropTable('tags_repositories');
  }
}
