<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181022181122 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f9d86650f');
        $this->addSql('DROP INDEX idx_1677722f9d86650f');
        $this->addSql('ALTER TABLE avatar RENAME COLUMN user_id_id TO person_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722F217BBB47 FOREIGN KEY (person_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1677722F217BBB47 ON avatar (person_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722F217BBB47');
        $this->addSql('DROP INDEX IDX_1677722F217BBB47');
        $this->addSql('ALTER TABLE avatar RENAME COLUMN person_id TO user_id_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT fk_1677722f9d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_1677722f9d86650f ON avatar (user_id_id)');
    }
}
