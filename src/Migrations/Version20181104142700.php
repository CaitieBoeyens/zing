<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181104142700 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE login_id_seq CASCADE');
        /* $this->addSql('CREATE SEQUENCE tag_id_seq INCREMENT BY 1 MINVALUE 1 START 1'); */
        /* $this->addSql('CREATE TABLE question_tag (question_id INT NOT NULL, tag_id INT NOT NULL, PRIMARY KEY(question_id, tag_id))'); */
        $this->addSql('CREATE INDEX IDX_339D56FB1E27F6BF ON question_tag (question_id)');
        $this->addSql('CREATE INDEX IDX_339D56FBBAD26311 ON question_tag (tag_id)');
        $this->addSql('CREATE TABLE tag (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FB1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE login');
        $this->addSql('DROP INDEX uniq_d95ab4057ba2f5eb');
        $this->addSql('ALTER TABLE user_profile DROP api_token');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494e9d86650f');
        $this->addSql('DROP INDEX idx_b6f7494e9d86650f');
        $this->addSql('ALTER TABLE question DROP tags');
        $this->addSql('ALTER TABLE question RENAME COLUMN user_id_id TO user_id');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6F7494EA76ED395 ON question (user_id)');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT fk_1677722f217bbb47');
        $this->addSql('DROP INDEX idx_1677722f217bbb47');
        $this->addSql('ALTER TABLE avatar ADD file VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE avatar RENAME COLUMN person_id TO user_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722FA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1677722FA76ED395 ON avatar (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question_tag DROP CONSTRAINT FK_339D56FBBAD26311');
        $this->addSql('DROP SEQUENCE tag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE login_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE login (id INT NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE question_tag');
        $this->addSql('DROP TABLE tag');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494EA76ED395');
        $this->addSql('DROP INDEX IDX_B6F7494EA76ED395');
        $this->addSql('ALTER TABLE question ADD tags TEXT NOT NULL');
        $this->addSql('ALTER TABLE question RENAME COLUMN user_id TO user_id_id');
        $this->addSql('COMMENT ON COLUMN question.tags IS \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT fk_b6f7494e9d86650f FOREIGN KEY (user_id_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_b6f7494e9d86650f ON question (user_id_id)');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722FA76ED395');
        $this->addSql('DROP INDEX IDX_1677722FA76ED395');
        $this->addSql('ALTER TABLE avatar DROP file');
        $this->addSql('ALTER TABLE avatar RENAME COLUMN user_id TO person_id');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT fk_1677722f217bbb47 FOREIGN KEY (person_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_1677722f217bbb47 ON avatar (person_id)');
        $this->addSql('ALTER TABLE user_profile ADD api_token VARCHAR(255) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX uniq_d95ab4057ba2f5eb ON user_profile (api_token)');
    }
}
