<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181030164333 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE question_topic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE question_topic (id INT NOT NULL, tag VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE question_topic_question (question_topic_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(question_topic_id, question_id))');
        $this->addSql('CREATE INDEX IDX_A8E651B17C5D9031 ON question_topic_question (question_topic_id)');
        $this->addSql('CREATE INDEX IDX_A8E651B11E27F6BF ON question_topic_question (question_id)');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT FK_A8E651B17C5D9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT FK_A8E651B11E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494e9d86650f');
        $this->addSql('DROP INDEX idx_b6f7494e9d86650f');
        $this->addSql('ALTER TABLE question DROP tags');
        $this->addSql('ALTER TABLE question RENAME COLUMN user_id_id TO user_id');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6F7494EA76ED395 ON question (user_id)');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT fk_3e7b0bfb4faf8f53');
        $this->addSql('DROP INDEX idx_3e7b0bfb4faf8f53');
        $this->addSql('ALTER TABLE response RENAME COLUMN question_id_id TO question_id');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB1E27F6BF ON response (question_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question_topic_question DROP CONSTRAINT FK_A8E651B17C5D9031');
        $this->addSql('DROP SEQUENCE question_topic_id_seq CASCADE');
        $this->addSql('DROP TABLE question_topic');
        $this->addSql('DROP TABLE question_topic_question');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB1E27F6BF');
        $this->addSql('DROP INDEX IDX_3E7B0BFB1E27F6BF');
        $this->addSql('ALTER TABLE response RENAME COLUMN question_id TO question_id_id');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT fk_3e7b0bfb4faf8f53 FOREIGN KEY (question_id_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_3e7b0bfb4faf8f53 ON response (question_id_id)');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494EA76ED395');
        $this->addSql('DROP INDEX IDX_B6F7494EA76ED395');
        $this->addSql('ALTER TABLE question ADD tags TEXT NOT NULL');
        $this->addSql('ALTER TABLE question RENAME COLUMN user_id TO user_id_id');
        $this->addSql('COMMENT ON COLUMN question.tags IS \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT fk_b6f7494e9d86650f FOREIGN KEY (user_id_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_b6f7494e9d86650f ON question (user_id_id)');
    }
}
