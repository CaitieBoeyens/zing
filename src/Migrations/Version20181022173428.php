<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181022173428 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f217bbb47');
        $this->addSql('DROP SEQUENCE user_info_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON "user" (username)');
        $this->addSql('DROP TABLE user_info');
        $this->addSql('DROP INDEX idx_1677722f217bbb47');
        $this->addSql('ALTER TABLE avatar ADD user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE avatar DROP person_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722F9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1677722F9D86650F ON avatar (user_id_id)');
        $this->addSql('ALTER TABLE question ADD user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E9D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6F7494E9D86650F ON question (user_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722F9D86650F');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E9D86650F');
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_info_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE user_info (id INT NOT NULL, email VARCHAR(255) NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP INDEX IDX_1677722F9D86650F');
        $this->addSql('ALTER TABLE avatar ADD person_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE avatar DROP user_id_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT fk_1677722f217bbb47 FOREIGN KEY (person_id) REFERENCES user_info (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_1677722f217bbb47 ON avatar (person_id)');
        $this->addSql('DROP INDEX IDX_B6F7494E9D86650F');
        $this->addSql('ALTER TABLE question DROP user_id_id');
    }
}
