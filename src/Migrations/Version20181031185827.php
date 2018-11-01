<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181031185827 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE response ADD user_name_id INT NOT NULL');
        $this->addSql('ALTER TABLE response DROP user_name');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB291A82DC FOREIGN KEY (user_name_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB291A82DC ON response (user_name_id)');
        $this->addSql('ALTER TABLE question_topic RENAME COLUMN tag TO topic_name');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB291A82DC');
        $this->addSql('DROP INDEX IDX_3E7B0BFB291A82DC');
        $this->addSql('ALTER TABLE response ADD user_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE response DROP user_name_id');
        $this->addSql('ALTER TABLE question_topic RENAME COLUMN topic_name TO tag');
    }
}
