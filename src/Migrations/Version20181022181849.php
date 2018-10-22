<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181022181849 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494e9d86650f');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f217bbb47');
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_profile_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE user_profile (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D95AB405F85E0677 ON user_profile (username)');
        $this->addSql('DROP TABLE "user"');
        //$this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722F217BBB47');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722F217BBB47 FOREIGN KEY (person_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        //$this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E9D86650F');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E9D86650F FOREIGN KEY (user_id_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722F217BBB47');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E9D86650F');
        $this->addSql('DROP SEQUENCE user_profile_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_8d93d649f85e0677 ON "user" (username)');
        $this->addSql('DROP TABLE user_profile');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494e9d86650f');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT fk_b6f7494e9d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f217bbb47');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT fk_1677722f217bbb47 FOREIGN KEY (person_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
