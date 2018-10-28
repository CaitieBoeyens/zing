<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181028162349 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE login_id_seq CASCADE');
        $this->addSql('DROP TABLE login');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f217bbb47');
        $this->addSql('DROP INDEX idx_1677722f217bbb47');
        $this->addSql('ALTER TABLE avatar ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE avatar DROP person_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722FA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1677722FA76ED395 ON avatar (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE login_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE login (id INT NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722FA76ED395');
        $this->addSql('DROP INDEX IDX_1677722FA76ED395');
        $this->addSql('ALTER TABLE avatar ADD person_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE avatar DROP user_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT fk_1677722f217bbb47 FOREIGN KEY (person_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_1677722f217bbb47 ON avatar (person_id)');
    }
}
